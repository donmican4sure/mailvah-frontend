"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Users, FileText, DollarSign, 
  Trash2, Lock, LogOut, Loader2, Activity, ShieldAlert, CheckCircle 
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim() : '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() : '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function AdminVault() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchSessionAndRole = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
        // Fetch their specific role from the profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        setUserRole(profile?.role || 'staff');
      }
      setIsCheckingAuth(false);
    };

    fetchSessionAndRole();
  }, []);

  if (isCheckingAuth) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center"><Activity className="w-8 h-8 text-blue-500 animate-spin" /></div>;
  if (!session) return <LoginScreen />;
  
  return <SuperadminDashboard session={session} role={userRole} />;
}

// --- SECURE LOGIN GATEWAY ---
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    if (!supabase) { setError("SYSTEM OFFLINE: Keys missing."); setLoading(false); return; }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.reload(); // Refresh to trigger role fetch
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[40px] pointer-events-none"></div>
        <div className="flex justify-center mb-8"><div className="w-16 h-16 bg-[#050810] border border-slate-800 rounded-2xl flex items-center justify-center"><Lock className="w-8 h-8 text-blue-500" /></div></div>
        <h2 className="text-2xl font-black text-white text-center mb-2">Staff Portal</h2>
        <p className="text-slate-500 text-center text-sm font-medium mb-8">Authorized personnel only.</p>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm font-bold text-center mb-6">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" required placeholder="Staff Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl shadow-lg mt-4 flex justify-center items-center">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Decrypt & Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- THE ROLE-BASED DASHBOARD ---
function SuperadminDashboard({ session, role }) {
  // Determine default tab based on role
  const defaultTab = role === 'editor' ? 'cms' : role === 'accountant' ? 'finance' : 'overview';
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // CMS State
  const [cmsView, setCmsView] = useState('write'); 
  const [isSaving, setIsSaving] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articleData, setArticleData] = useState({ title: '', slug: '', content: '' });

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.reload(); };

  // --- LIVE DATABASE CMS FUNCTIONS ---
  const fetchArticles = async () => {
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (!error && data) setArticles(data);
  };

  const handlePublish = async () => {
    if (!articleData.title || !articleData.content) return alert("Title and Content required!");
    setIsSaving(true);
    
    // Auto-generate slug from title
    const slug = articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const { error } = await supabase.from('blogs').insert([{
      title: articleData.title, 
      slug: slug, 
      content: articleData.content, 
      author: session.user.email
    }]);

    setIsSaving(false);
    if (error) { alert(`Error: ${error.message}`); } 
    else { alert("Published Live!"); setArticleData({ title: '', slug: '', content: '' }); setCmsView('manage'); fetchArticles(); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post forever?")) return;
    await supabase.from('blogs').delete().eq('id', id);
    fetchArticles(); 
  };

  useEffect(() => { if (activeTab === 'cms') fetchArticles(); }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 flex font-sans pb-20 md:pb-0">
      
      {/* SIDEBAR (Role-Based Visibility) */}
      <div className="w-64 bg-[#050810] border-r border-slate-800 flex-col hidden md:flex shrink-0 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800"><ShieldAlert className="w-5 h-5 text-blue-500 mr-2" /><span className="font-black text-white">Mailvah HQ</span></div>
        <div className="p-4 space-y-2 flex-1">
          <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3 mt-2 px-2">Access Level: <span className="text-emerald-400">{role}</span></div>
          
          {(role === 'superadmin' || role === 'staff') && (
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl ${activeTab === 'overview' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800'}`}><LayoutDashboard className="w-4 h-4 mr-3" /> Overview</button>
          )}
          
          {(role === 'superadmin' || role === 'editor') && (
            <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl ${activeTab === 'cms' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800'}`}><FileText className="w-4 h-4 mr-3" /> Blog CMS</button>
          )}

          {(role === 'superadmin' || role === 'accountant') && (
            <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl ${activeTab === 'finance' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800'}`}><DollarSign className="w-4 h-4 mr-3" /> Finance</button>
          )}

          {role === 'superadmin' && (
            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl ${activeTab === 'users' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800'}`}><Users className="w-4 h-4 mr-3" /> System Logs</button>
          )}
        </div>
        <div className="p-4 border-t border-slate-800"><button onClick={handleLogout} className="w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl text-slate-500 hover:text-red-400"><LogOut className="w-4 h-4 mr-3" /> Lock Vault</button></div>
      </div>

      {/* MAIN PANEL */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-slate-800 bg-[#0B0F19] flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
          <h1 className="text-lg font-bold text-white capitalize">{activeTab}</h1>
          <div className="text-xs font-mono text-slate-500">{session.user.email}</div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            
            {/* OVERVIEW (Superadmin & Staff) */}
            {activeTab === 'overview' && (
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center"><h2 className="text-2xl font-black text-white mb-2">System Nominal</h2><p className="text-slate-400 font-medium">Welcome to the Mailvah Internal Network.</p></div>
            )}

            {/* FINANCE (Superadmin & Accountant) */}
            {activeTab === 'finance' && (
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800"><h2 className="text-xl font-black text-white mb-4 flex items-center gap-2"><DollarSign className="text-emerald-400"/> Live Revenue Ledger</h2><p className="text-slate-500 text-sm">Stripe API connection pending in Phase 6.</p></div>
            )}

            {/* LIVE BLOG CMS (Superadmin & Editor) */}
            {activeTab === 'cms' && (
              <div className="space-y-6">
                <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 w-full"><button onClick={() => setCmsView('write')} className={`flex-1 py-3 text-xs font-bold rounded-lg ${cmsView === 'write' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Write Article</button><button onClick={() => { setCmsView('manage'); fetchArticles(); }} className={`flex-1 py-3 text-xs font-bold rounded-lg ${cmsView === 'manage' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>Manage Database</button></div>
                
                {cmsView === 'write' && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <input type="text" value={articleData.title} onChange={(e) => setArticleData({...articleData, title: e.target.value})} className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white font-bold" placeholder="Article Title..." />
                    <textarea value={articleData.content} onChange={(e) => setArticleData({...articleData, content: e.target.value})} className="w-full h-96 bg-[#050810] border border-slate-700 rounded-xl p-4 text-white font-medium resize-none" placeholder="Start typing the content (HTML supported)..."></textarea>
                    <button onClick={handlePublish} disabled={isSaving} className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl flex justify-center">{isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Push to Live Site'}</button>
                  </div>
                )}

                {cmsView === 'manage' && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#050810] text-slate-500 font-bold uppercase tracking-widest text-[10px]"><tr><th className="p-4">Article Title</th><th className="p-4">Author</th><th className="p-4 text-right">Action</th></tr></thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {articles.length === 0 ? <tr><td colSpan="3" className="p-8 text-center text-slate-500">No articles in database.</td></tr> : articles.map(a => (
                          <tr key={a.id}>
                            <td className="p-4 text-white font-bold">{a.title}</td>
                            <td className="p-4 text-slate-500">{a.author}</td>
                            <td className="p-4 text-right"><button onClick={() => handleDelete(a.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
