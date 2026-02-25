import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  User as UserIcon, 
  LogOut, 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  CheckCircle,
  XCircle,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Job, Application, Role } from './types';

// --- Components ---

const Navbar = ({ user, onLogout, onNavigate, onPostGig }: { user: User | null, onLogout: () => void, onNavigate: (page: string) => void, onPostGig?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-primary leading-none">Quick-Gig</span>
              <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold">Go - Help - Earn</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'employer' && (
                  <button 
                    onClick={onPostGig}
                    className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-accent transition-all shadow-sm flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Post Gig</span>
                  </button>
                )}
                <button onClick={() => onNavigate('dashboard')} className="flex items-center space-x-1 text-slate-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </button>
                {user.role === 'admin' && (
                  <button onClick={() => onNavigate('admin')} className="flex items-center space-x-1 text-slate-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                    <ShieldCheck size={18} />
                    <span>Admin</span>
                  </button>
                )}
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UserIcon size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  <button onClick={onLogout} className="text-slate-400 hover:text-red-500 p-1">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <button onClick={() => onNavigate('login')} className="text-primary hover:bg-primary/5 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Login</button>
                <button onClick={() => onNavigate('signup')} className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Sign Up</button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-primary p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {user ? (
                <>
                  {user.role === 'employer' && (
                    <button 
                      onClick={() => { onPostGig?.(); setIsOpen(false); }} 
                      className="block w-full text-left px-3 py-3 text-base font-bold text-secondary hover:bg-slate-50 rounded-lg flex items-center"
                    >
                      <Plus size={20} className="mr-2" />
                      Post a Gig
                    </button>
                  )}
                  <button onClick={() => { onNavigate('dashboard'); setIsOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Dashboard</button>
                  {user.role === 'admin' && (
                    <button onClick={() => { onNavigate('admin'); setIsOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Admin Panel</button>
                  )}
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <div className="flex items-center px-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <div className="text-base font-medium text-slate-800">{user.name}</div>
                        <div className="text-sm font-medium text-slate-500">{user.email}</div>
                      </div>
                    </div>
                    <button onClick={onLogout} className="mt-2 block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg">Logout</button>
                  </div>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <button onClick={() => { onNavigate('login'); setIsOpen(false); }} className="block w-full text-center px-4 py-3 text-base font-medium text-primary border border-primary rounded-lg">Login</button>
                  <button onClick={() => { onNavigate('signup'); setIsOpen(false); }} className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-primary rounded-lg">Sign Up</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const LandingPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
        Find Short-Term Jobs <span className="text-primary">Instantly</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
        The fastest way to connect local workers and students with businesses needing immediate help. 
        Post a gig, find a gig, get it done today.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={() => onNavigate('signup')} 
          className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Start Earning Now
        </button>
        <button 
          onClick={() => onNavigate('signup')} 
          className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all"
        >
          Hire Temporary Help
        </button>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl w-full">
      {[
        { title: 'Post in Seconds', desc: 'Employers can post a job with details, location, and pay in under a minute.', icon: <Plus className="text-secondary" /> },
        { title: 'Apply with a Tap', desc: 'Workers can browse local jobs and apply with a single click.', icon: <Briefcase className="text-primary" /> },
        { title: 'Same-Day Pay', desc: 'Get paid immediately after completing the job. No waiting for weeks.', icon: <DollarSign className="text-emerald-500" /> }
      ].map((feature, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-slate-500">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const AuthPage = ({ type, onAuthSuccess }: { type: 'login' | 'signup', onAuthSuccess: (user: User) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('worker');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const body = type === 'login' ? { email, password } : { email, password, name, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        onAuthSuccess(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">I want to...</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onClick={() => setRole('worker')}
                    className={`py-3 rounded-xl border font-medium transition-all ${role === 'worker' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'}`}
                  >
                    Find Work
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRole('employer')}
                    className={`py-3 rounded-xl border font-medium transition-all ${role === 'employer' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'}`}
                  >
                    Hire Help
                  </button>
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const WorkerDashboard = ({ user }: { user: User }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'browse' | 'my-jobs'>('browse');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`/api/jobs?location=${locationFilter}&date=${dateFilter}`),
        fetch(`/api/applications/worker/${user.id}`)
      ]);
      setJobs(await jobsRes.json());
      setApplications(await appsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locationFilter, dateFilter]);

  const handleApply = async (jobId: number) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: jobId, worker_id: user.id })
      });
      if (res.ok) {
        alert('Applied successfully!');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (err) {
      alert('Failed to apply');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">Worker Dashboard</h2>
        <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
          <button 
            onClick={() => setView('browse')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'browse' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Browse Gigs
          </button>
          <button 
            onClick={() => setView('my-jobs')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'my-jobs' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            My Applications
          </button>
        </div>
      </div>

      {view === 'browse' ? (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" placeholder="Location..." value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-primary/10 outline-none"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-primary/10 outline-none"
              />
            </div>
            <button onClick={fetchData} className="bg-primary text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary/90 transition-all">
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12 text-slate-400">Loading gigs...</div>
            ) : jobs.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">No gigs found in this area.</div>
            ) : (
              jobs.map(job => (
                <motion.div 
                  key={job.id} layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <DollarSign size={14} />
                      {job.payment}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-slate-500 text-sm">
                      <MapPin size={16} className="mr-2" /> {job.location}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Calendar size={16} className="mr-2" /> {job.date}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock size={16} className="mr-2" /> {job.duration}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleApply(job.id)}
                    disabled={applications.some(a => a.job_id === job.id)}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    {applications.some(a => a.job_id === job.id) ? 'Applied' : 'Apply Now'}
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">You haven't applied to any gigs yet.</div>
          ) : (
            applications.map(app => (
              <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold">{app.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="text-sm text-slate-500 flex items-center"><MapPin size={14} className="mr-1"/> {app.location}</span>
                    <span className="text-sm text-slate-500 flex items-center"><Calendar size={14} className="mr-1"/> {app.date}</span>
                    <span className="text-sm font-semibold text-primary">${app.payment}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                    app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    app.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const EmployerDashboard = ({ user, showPostForm, setShowPostForm }: { user: User, showPostForm: boolean, setShowPostForm: (show: boolean) => void }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [payment, setPayment] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/employer/${user.id}`);
      setJobs(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicants = async (jobId: number) => {
    try {
      const res = await fetch(`/api/applications/job/${jobId}`);
      setApplicants(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          employer_id: user.id, title, description, location, date, duration, payment: parseFloat(payment) 
        })
      });
      if (res.ok) {
        setShowPostForm(false);
        fetchJobs();
        // Reset form
        setTitle(''); setDescription(''); setLocation(''); setDate(''); setDuration(''); setPayment('');
      }
    } catch (err) {
      alert('Failed to post job');
    }
  };

  const handleAppAction = async (appId: number, status: string, jobId: number) => {
    try {
      await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchApplicants(jobId);
    } catch (err) {
      alert('Action failed');
    }
  };

  const handleCompleteJob = async (jobId: number) => {
    try {
      await fetch(`/api/jobs/${jobId}/complete`, { method: 'PATCH' });
      fetchJobs();
      setSelectedJob(null);
    } catch (err) {
      alert('Failed to complete job');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Employer Dashboard</h2>
        <button 
          onClick={() => setShowPostForm(true)}
          className="bg-secondary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-accent transition-all shadow-lg shadow-secondary/20"
        >
          <Plus size={20} />
          <span>Post a Gig</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-700">Your Posted Gigs</h3>
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading your gigs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">You haven't posted any gigs yet.</div>
          ) : (
            jobs.map(job => (
              <div 
                key={job.id} 
                onClick={() => { setSelectedJob(job); fetchApplicants(job.id); }}
                className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer ${selectedJob?.id === job.id ? 'border-primary ring-2 ring-primary/10 shadow-md' : 'border-slate-200 hover:border-primary/50 shadow-sm'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold">{job.title}</h4>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <MapPin size={14} className="mr-1" /> {job.location} • <Calendar size={14} className="mx-1" /> {job.date}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${job.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-700">Applicants</h3>
          {selectedJob ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <h4 className="font-bold text-lg mb-2">{selectedJob.title}</h4>
                {selectedJob.status === 'open' && (
                  <button 
                    onClick={() => handleCompleteJob(selectedJob.id)}
                    className="w-full bg-emerald-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {applicants.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-4">No applicants yet.</p>
                ) : (
                  applicants.map(app => (
                    <div key={app.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-slate-800">{app.worker_name}</p>
                          <p className="text-xs text-slate-500">{app.worker_email}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      {app.status === 'pending' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleAppAction(app.id, 'accepted', selectedJob.id)}
                            className="flex-1 bg-emerald-500 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleAppAction(app.id, 'rejected', selectedJob.id)}
                            className="flex-1 bg-red-500 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-12 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400 text-sm">
              Select a gig to view applicants
            </div>
          )}
        </div>
      </div>

      {/* Post Gig Modal */}
      <AnimatePresence>
        {showPostForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-2xl font-bold">Post a New Gig</h3>
                <button onClick={() => setShowPostForm(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
              </div>
              <form onSubmit={handlePostJob} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title</label>
                    <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/10" placeholder="e.g. Event Assistant" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                    <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/10 h-24" placeholder="Describe the tasks..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                    <input required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/10" placeholder="City or Address" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                    <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
                    <input required value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/10" placeholder="e.g. 4 hours" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Payment ($)</label>
                    <input type="number" required value={payment} onChange={e => setPayment(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/10" placeholder="Amount" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowPostForm(false)} className="flex-1 px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20">Post Gig</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [view, setView] = useState<'users' | 'jobs'>('users');

  const fetchData = async () => {
    const [uRes, jRes] = await Promise.all([
      fetch('/api/admin/users'),
      fetch('/api/admin/jobs')
    ]);
    setUsers(await uRes.json());
    setJobs(await jRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id: number) => {
    if (confirm('Delete this user?')) {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const deleteJob = async (id: number) => {
    if (confirm('Delete this gig?')) {
      await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Admin Control Panel</h2>
      
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setView('users')} className={`px-6 py-2 rounded-xl font-bold ${view === 'users' ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Users ({users.length})</button>
        <button onClick={() => setView('jobs')} className={`px-6 py-2 rounded-xl font-bold ${view === 'jobs' ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Gigs ({jobs.length})</button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {view === 'users' ? (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Name</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Email</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Role</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="px-6 py-4 text-sm font-medium">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : u.role === 'employer' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {u.role !== 'admin' && (
                      <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:text-red-700"><XCircle size={18}/></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Title</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Employer</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map(j => (
                <tr key={j.id}>
                  <td className="px-6 py-4 text-sm font-medium">{j.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{j.employer_name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${j.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {j.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteJob(j.id)} className="text-red-500 hover:text-red-700"><XCircle size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showPostForm, setShowPostForm] = useState(false);

  // Simple persistence
  useEffect(() => {
    const saved = localStorage.getItem('quickgig_user');
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    localStorage.setItem('quickgig_user', JSON.stringify(u));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('quickgig_user');
    setCurrentPage('home');
  };

  const handlePostGigClick = () => {
    if (user?.role === 'employer') {
      setCurrentPage('dashboard');
      setShowPostForm(true);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <LandingPage onNavigate={setCurrentPage} />;
      case 'login': return <AuthPage type="login" onAuthSuccess={handleAuthSuccess} />;
      case 'signup': return <AuthPage type="signup" onAuthSuccess={handleAuthSuccess} />;
      case 'dashboard': 
        if (!user) return <AuthPage type="login" onAuthSuccess={handleAuthSuccess} />;
        return user.role === 'employer' ? <EmployerDashboard user={user} showPostForm={showPostForm} setShowPostForm={setShowPostForm} /> : <WorkerDashboard user={user} />;
      case 'admin':
        if (user?.role !== 'admin') return <LandingPage onNavigate={setCurrentPage} />;
        return <AdminPanel />;
      default: return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} onNavigate={setCurrentPage} onPostGig={handlePostGigClick} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="bg-white border-t border-slate-200 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-display font-bold text-primary">Quick-Gig</span>
            <span className="text-xs text-slate-400">© 2026 Quick-Gig Marketplace. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
