"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Users, FileText, 
  Save, Check, ShieldAlert, Activity, 
  DollarSign, Edit3, Trash2, List, Lock, LogOut, Loader2
} from 'lucide-react';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim() : '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() : '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function AdminVault() {
  const [session, setSession] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsCheckingAuth(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isCheckingAuth) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center"><Activity className="w-8 h-8 text-blue-500 animate-spin" /></div>;

  if (!session) return <LoginScreen />;

  return <SuperadminDashboard session={session} />;
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError("SYSTEM OFFLINE: Supabase keys are missing from Vercel.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      
      {/* X-RAY DEBUGGER - THIS WILL PROVE IF VERCEL HAS THE KEYS */}
      <div className="mb-4 p-3 bg-slate-900 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-400 w-full max-w-md break-all">
        DEBUG MODE:<br/>
        URL: {supabaseUrl ? `Loaded: ${supabaseUrl.substring(0, 15)}...` : "EMPTY"}<br/>
        KEY: {supabaseKey ? "Loaded" : "EMPTY"}
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[40px] pointer-events-none"></div>
        <div className="flex justify-center mb-8"><div className="w-16 h-16 bg-[#050810] border border-slate-800 rounded-2xl flex items-center justify-center shadow-lg"><Lock className="w-8 h-8 text-blue-500" /></div></div>
        <h2 className="text-2xl font-black text-white text-center mb-2">Restricted Access</h2>
        <p className="text-slate-500 text-center text-sm font-medium mb-8">Mailvah Control Room.</p>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm font-bold text-center mb-6">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Admin Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-medium" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-medium" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl shadow-lg mt-4 flex justify-center items-center disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Decrypt & Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

// (The SuperadminDashboard component remains exactly the same below here, I omitted it to save space, but make sure you keep it in your file!)
function SuperadminDashboard({ session }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [cmsView, setCmsView] = useState('write'); 
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [toast, setToast] = useState(null);
  const [articleData, setArticleData] = useState({ title: '', slug: '', description: '', content: '', category: 'Deliverability', author: 'Olorunleke Ogundele' });

  const showToast = (message) => { setToast(message); setTimeout(() => setToast(null), 3000); };
  const handleLogout = async () => { await supabase.auth.signOut(); };
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const generatedSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setArticleData({ ...articleData, title: newTitle, slug: generatedSlug });
  };

  const fetchArticles = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const { data, error, count } = await supabase.from('blogs').select('*', { count: 'exact' }).order('created_at', { ascending: false });
      if (error) throw error;
      if (data) { setArticles(data); setTotalArticles(count || data.length); }
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  const handlePublish = async () => {
    if (!articleData.title || !articleData.slug || !articleData.content) { showToast("Missing fields!"); return; }
    setIsSaving(true);
    try {
      const { error } = await supabase.from('blogs').insert([{
        title: articleData.title, slug: articleData.slug, description: articleData.description, content: articleData.content, category: articleData.category, author: articleData.author
      }]);
      if (error) throw error;
      showToast('Article published!');
      setArticleData({ title: '', slug: '', description: '', content: '', category: 'Deliverability', author: 'Olorunleke Ogundele' });
      setCmsView('manage'); fetchArticles(); 
    } catch (error) { showToast(`Error: ${error.message}`); } finally { setIsSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      showToast("Deleted."); fetchArticles(); 
    } catch (error) { showToast("Failed to delete."); }
  };

  useEffect(() => { fetchArticles(); }, []);
  const userInitial = session?.user?.email ? session.user.email.charAt(0).toUpperCase() : 'A';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 flex font-sans selection:bg-blue-500/30 pb-20 md:pb-0">
      {toast && <div className="fixed top-4 right-4 md:bottom-6 md:top-auto bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl flex items-center z-[100] animate-in fade-in"><Check className="w-5 h-5 mr-2" /> {toast}</div>}
      <div className="w-64 bg-[#050810] border-r border-slate-800 flex-col hidden md:flex shrink-0 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800"><ShieldAlert className="w-5 h-5 text-blue-500 mr-2" /><span className="font-black text-white">Mailvah HQ</span></div>
        <div className="p-4 space-y-2 flex-1">
          <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3 mt-2 px-2">Control Room</div>
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}><LayoutDashboard className="w-4 h-4 mr-3" /> Overview</button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'users' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}><Users className="w-4 h-4 mr-3" /> User Database</button>
          <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'cms' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}><FileText className="w-4 h-4 mr-3" /> Blog CMS</button>
        </div>
        <div className="p-4 border-t border-slate-800"><button onClick={handleLogout} className="w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"><LogOut className="w-4 h-4 mr-3" /> Lock Vault</button></div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#050810]/90 backdrop-blur-md border-t border-slate-800 flex justify-around items-center p-3 z-50">
        <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center p-2 ${activeTab === 'overview' ? 'text-blue-500' : 'text-slate-500'}`}><LayoutDashboard className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">HQ</span></button>
        <button onClick={() => setActiveTab('users')} className={`flex flex-col items-center p-2 ${activeTab === 'users' ? 'text-blue-500' : 'text-slate-500'}`}><Users className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">Users</span></button>
        <button onClick={() => setActiveTab('cms')} className={`flex flex-col items-center p-2 ${activeTab === 'cms' ? 'text-blue-500' : 'text-slate-500'}`}><FileText className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">CMS</span></button>
        <button onClick={handleLogout} className="flex flex-col items-center p-2 text-slate-500 hover:text-red-400"><LogOut className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">Exit</span></button>
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-slate-800 bg-[#0B0F19] flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-40">
          <h1 className="text-lg font-bold text-white capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3 md:gap-4"><div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold flex items-center"><Activity className="w-3 h-3 mr-1" /> Auth</div><div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg">{userInitial}</div></div>
        </header>
        <main className="flex-1 p-4 md:p-8"><div className="max-w-5xl mx-auto">
          {activeTab === 'overview' && <div className="space-y-6"><div className="grid grid-cols-2 gap-4"><div className="bg-slate-900 p-5 rounded-2xl border border-slate-800"><div className="text-xs font-bold text-slate-500 mb-2 flex items-center"><FileText className="w-4 h-4 mr-1 text-purple-400"/> Published</div><div className="text-2xl font-black text-white">{totalArticles}</div></div><div className="bg-slate-900 p-5 rounded-2xl border border-slate-800"><div className="text-xs font-bold text-slate-500 mb-2 flex items-center"><DollarSign className="w-4 h-4 mr-1 text-emerald-400"/> MRR</div><div className="text-2xl font-black text-white">$0.00</div></div></div></div>}
          {activeTab === 'cms' && <div className="space-y-6">
            <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 w-full"><button onClick={() => setCmsView('write')} className={`flex-1 py-3 text-xs font-bold rounded-lg ${cmsView === 'write' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Write</button><button onClick={() => { setCmsView('manage'); fetchArticles(); }} className={`flex-1 py-3 text-xs font-bold rounded-lg ${cmsView === 'manage' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>Manage</button></div>
            {cmsView === 'write' && <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-4">
              <input type="text" value={articleData.title} onChange={handleTitleChange} className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="Title" />
              <input type="text" value={articleData.slug} onChange={(e) => setArticleData({...articleData, slug: e.target.value})} className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="slug" />
              <textarea value={articleData.content} onChange={(e) => setArticleData({...articleData, content: e.target.value})} className="w-full h-[300px] bg-[#050810] border border-slate-700 rounded-xl p-4 text-white text-xs" placeholder="Content..."></textarea>
              <button onClick={handlePublish} disabled={isSaving} className="w-full bg-blue-600 text-white font-black py-3 rounded-xl">{isSaving ? 'Publishing...' : 'Publish'}</button>
            </div>}
            {cmsView === 'manage' && <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"><table className="w-full text-left text-xs"><tbody className="divide-y divide-slate-800/50">{articles.map(a => <tr key={a.id}><td className="p-4 text-white">{a.title}</td><td className="p-4 text-right"><button onClick={() => handleDelete(a.id)} className="text-red-400 p-2"><Trash2 className="w-4 h-4" /></button></td></tr>)}</tbody></table></div>}
          </div>}
        </div></main>
      </div>
    </div>
  );
}
