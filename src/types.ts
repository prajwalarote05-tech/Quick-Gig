export type Role = 'employer' | 'worker' | 'admin';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  password?: string;
}

export interface Job {
  id: number;
  employer_id: number;
  employer_name?: string;
  title: string;
  description: string;
  location: string;
  date: string;
  duration: string;
  payment: number;
  status: 'open' | 'completed';
  created_at: string;
}

export interface Application {
  id: number;
  job_id: number;
  worker_id: number;
  worker_name?: string;
  worker_email?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  // For worker view
  title?: string;
  location?: string;
  date?: string;
  payment?: number;
  employer_name?: string;
}
