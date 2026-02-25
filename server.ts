import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const db = new Database("quickgig.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT, -- 'employer', 'worker', 'admin'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employer_id INTEGER,
    title TEXT,
    description TEXT,
    location TEXT,
    date TEXT,
    duration TEXT,
    payment REAL,
    status TEXT DEFAULT 'open', -- 'open', 'completed'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(employer_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER,
    worker_id INTEGER,
    status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'completed'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(job_id) REFERENCES jobs(id),
    FOREIGN KEY(worker_id) REFERENCES users(id),
    UNIQUE(job_id, worker_id)
  );
`);

// Seed admin if not exists
const admin = db.prepare("SELECT * FROM users WHERE role = 'admin'").get();
if (!admin) {
  db.prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)").run(
    "admin@quickgig.com",
    "admin123",
    "System Admin",
    "admin"
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/signup", (req, res) => {
    const { email, password, name, role } = req.body;
    try {
      const result = db.prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)").run(email, password, name, role);
      res.json({ id: result.lastInsertRowid, email, name, role });
    } catch (e) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Job Routes
  app.get("/api/jobs", (req, res) => {
    const { location, date } = req.query;
    let query = "SELECT jobs.*, users.name as employer_name FROM jobs JOIN users ON jobs.employer_id = users.id WHERE status = 'open'";
    const params: any[] = [];
    if (location) {
      query += " AND location LIKE ?";
      params.push(`%${location}%`);
    }
    if (date) {
      query += " AND date = ?";
      params.push(date);
    }
    const jobs = db.prepare(query).all(...params);
    res.json(jobs);
  });

  app.post("/api/jobs", (req, res) => {
    const { employer_id, title, description, location, date, duration, payment } = req.body;
    const result = db.prepare("INSERT INTO jobs (employer_id, title, description, location, date, duration, payment) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      employer_id, title, description, location, date, duration, payment
    );
    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/jobs/employer/:id", (req, res) => {
    const jobs = db.prepare("SELECT * FROM jobs WHERE employer_id = ?").all(req.params.id);
    res.json(jobs);
  });

  app.patch("/api/jobs/:id/complete", (req, res) => {
    db.prepare("UPDATE jobs SET status = 'completed' WHERE id = ?").run(req.params.id);
    db.prepare("UPDATE applications SET status = 'completed' WHERE job_id = ? AND status = 'accepted'").run(req.params.id);
    res.json({ success: true });
  });

  // Application Routes
  app.post("/api/applications", (req, res) => {
    const { job_id, worker_id } = req.body;
    try {
      db.prepare("INSERT INTO applications (job_id, worker_id) VALUES (?, ?)").run(job_id, worker_id);
      res.json({ success: true });
    } catch (e) {
      res.status(400).json({ error: "Already applied" });
    }
  });

  app.get("/api/applications/worker/:id", (req, res) => {
    const apps = db.prepare(`
      SELECT applications.*, jobs.title, jobs.location, jobs.date, jobs.payment, users.name as employer_name 
      FROM applications 
      JOIN jobs ON applications.job_id = jobs.id 
      JOIN users ON jobs.employer_id = users.id
      WHERE worker_id = ?
    `).all(req.params.id);
    res.json(apps);
  });

  app.get("/api/applications/job/:id", (req, res) => {
    const apps = db.prepare(`
      SELECT applications.*, users.name as worker_name, users.email as worker_email 
      FROM applications 
      JOIN users ON applications.worker_id = users.id 
      WHERE job_id = ?
    `).all(req.params.id);
    res.json(apps);
  });

  app.patch("/api/applications/:id", (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE applications SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  // Admin Routes
  app.get("/api/admin/users", (req, res) => {
    const users = db.prepare("SELECT id, email, name, role, created_at FROM users").all();
    res.json(users);
  });

  app.get("/api/admin/jobs", (req, res) => {
    const jobs = db.prepare("SELECT jobs.*, users.name as employer_name FROM jobs JOIN users ON jobs.employer_id = users.id").all();
    res.json(jobs);
  });

  app.delete("/api/admin/users/:id", (req, res) => {
    db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/admin/jobs/:id", (req, res) => {
    db.prepare("DELETE FROM jobs WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
