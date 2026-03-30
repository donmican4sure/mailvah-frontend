"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Users, FileText, 
  Save, Check, ShieldAlert, Activity, 
  DollarSign, Edit3, Trash2, List, Lock, LogOut, Loader2
} from 'lucide-react';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function AdminVault() {
  const [session, setSession] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsCheckingAuth(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsCheckingAuth(false);
    });

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <Activity className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // THE IRON CURTAIN: If no session, show the login screen
  if (!session) {
    return <LoginScreen />;
  }

  // If logged in, show the full dashboard
  return <SuperadminDashboard session={session} />;
}

// ==========================================
// COMPONENT 1: THE LOGIN SCREEN
// ==========================================
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[40px] pointer-events-none"></div>
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#050810] border border-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-white text-center mb-2">Restricted Access</h2>
        <p className="text-slate-500 text-center text-sm font-medium mb-8">Mailvah Control Room. Authorized personnel only.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm font-bold text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050810] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-medium" 
              placeholder="ceo@mailvah.com" 
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#050810] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-medium" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-900/20 mt-4 transition-transform hover:scale-[1.02] flex justify-center items-center disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Decrypt & Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT 2: THE SECURE DASHBOARD
// ==========================================
function SuperadminDashboard({ session }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [cmsView, setCmsView] = useState('write'); 
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [toast, setToast] = useState(null);
  const [articleData, setArticleData] = useState({ 
    title: '', slug: '', description: '', content: '', category: 'Deliverability', author: 'Olorunleke Ogundele' 
  });

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const generatedSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setArticleData({ ...articleData, title: newTitle, slug: generatedSlug });
  };

  const fetchArticles = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const { data, error, count } = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) {
        setArticles(data);
        setTotalArticles(count || data.length);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!articleData.title || !articleData.slug || !articleData.content) {
      showToast("Missing required fields!"); return;
    }
    setIsSaving(true);
    try {
      const { error } = await supabase.from('blogs').insert([{
            title: articleData.title, slug: articleData.slug, description: articleData.description,
            content: articleData.content, category: articleData.category, author: articleData.author
      }]);
      if (error) throw error;
      showToast('Article published!');
      setArticleData({ title: '', slug: '', description: '', content: '', category: 'Deliverability', author: 'Olorunleke Ogundele' });
      setCmsView('manage'); 
      fetchArticles(); 
    } catch (error) {
      showToast(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article forever?")) return;
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      showToast("Article deleted.");
      fetchArticles(); 
    } catch (error) {
      showToast("Failed to delete.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Extract the first letter of the logged-in email for the avatar
  const userInitial = session?.user?.email ? session.user.email.charAt(0).toUpperCase() : 'A';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 flex font-sans selection:bg-blue-500/30 pb-20 md:pb-0">
      
      {toast && (
        <div className="fixed top-4 right-4 md:bottom-6 md:top-auto bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl flex items-center shadow-2xl z-[100] animate-in fade-in">
          <Check className="w-5 h-5 mr-2" /> {toast}
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="w-64 bg-[#050810] border-r border-slate-800 flex-col hidden md:flex shrink-0 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <ShieldAlert className="w-5 h-5 text-blue-500 mr-2" />
          <span className="font-black text-white tracking-tight">Mailvah HQ</span>
        </div>
        <div className="p-4 space-y-2 flex-1">
          <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3 mt-2 px-2">Control Room</div>
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}>
            <LayoutDashboard className="w-4 h-4 mr-3" /> Overview
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'users' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}>
            <Users className="w-4 h-4 mr-3" /> User Database
          </button>
          <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'cms' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}>
            <FileText className="w-4 h-4 mr-3" /> Blog CMS
          </button>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center px-3 py-3 text-sm font-bold rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4 mr-3" /> Lock Vault
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#050810]/90 backdrop-blur-md border-t border-slate-800 flex justify-around items-center p-3 z-50">
        <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center p-2 ${activeTab === 'overview' ? 'text-blue-500' : 'text-slate-500'}`}>
          <LayoutDashboard className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">HQ</span>
        </button>
        <button onClick={() => setActiveTab('users')} className={`flex flex-col items-center p-2 ${activeTab === 'users' ? 'text-blue-500' : 'text-slate-500'}`}>
          <Users className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Users</span>
        </button>
        <button onClick={() => setActiveTab('cms')} className={`flex flex-col items-center p-2 ${activeTab === 'cms' ? 'text-blue-500' : 'text-slate-500'}`}>
          <FileText className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">CMS</span>
        </button>
        <button onClick={handleLogout} className="flex flex-col items-center p-2 text-slate-500 hover:text-red-400">
          <LogOut className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Exit</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-slate-800 bg-[#0B0F19] flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-40">
          <h1 className="text-lg font-bold text-white capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="px-2 py-1 md:px-3 md:py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] md:text-xs font-bold flex items-center">
              <Activity className="w-3 h-3 mr-1" /> Authenticated
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs md:text-sm shadow-lg shadow-blue-500/20">
              {userInitial}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">

            {/* --- TAB 1: OVERVIEW --- */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800 shadow-lg">
                    <div className="text-xs md:text-sm font-bold text-slate-500 mb-2 flex items-center"><FileText className="w-4 h-4 mr-1 text-purple-400"/> Published Articles</div>
                    <div className="text-2xl md:text-3xl font-black text-white">{totalArticles}</div>
                  </div>
                  <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800 shadow-lg">
                    <div className="text-xs md:text-sm font-bold text-slate-500 mb-2 flex items-center"><Users className="w-4 h-4 mr-1 text-blue-400"/> Registered Users</div>
                    <div className="text-2xl md:text-3xl font-black text-white">0</div>
                  </div>
                  <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800 shadow-lg col-span-2 md:col-span-1">
                    <div className="text-xs md:text-sm font-bold text-slate-500 mb-2 flex items-center"><DollarSign className="w-4 h-4 mr-1 text-emerald-400"/> Live MRR</div>
                    <div className="text-2xl md:text-3xl font-black text-white">$0.00</div>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: USER MANAGEMENT --- */}
            {activeTab === 'users' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center animate-in fade-in shadow-xl mt-4">
                <Users className="w-16 h-16 text-blue-500/50 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-white mb-2">User Database Engine</h2>
                <p className="text-slate-400 font-medium max-w-md mx-auto mb-6">This is where you will manage client accounts, add verification credits, and handle subscriptions.</p>
                <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-sm font-bold">
                  Phase 4 Implementation
                </div>
              </div>
            )}

            {/* --- TAB 3: FUNCTIONAL CMS ENGINE --- */}
            {activeTab === 'cms' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 w-full md:w-max overflow-x-auto scrollbar-hide">
                  <button onClick={() => setCmsView('write')} className={`flex-1 md:flex-none flex items-center justify-center px-4 md:px-6 py-3 text-xs md:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${cmsView === 'write' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
                    <Edit3 className="w-4 h-4 mr-2" /> Write Article
                  </button>
                  <button onClick={() => { setCmsView('manage'); fetchArticles(); }} className={`flex-1 md:flex-none flex items-center justify-center px-4 md:px-6 py-3 text-xs md:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${cmsView === 'manage' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
                    <List className="w-4 h-4 mr-2" /> Manage DB
                  </button>
                </div>

                {cmsView === 'write' && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 md:p-6 space-y-4 md:space-y-6 shadow-xl animate-in fade-in">
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-1 md:mb-2">Article Title</label>
                      <input type="text" value={articleData.title} onChange={handleTitleChange} className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-bold text-sm md:text-base" placeholder="Enter article title..." />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-1 md:mb-2">URL Slug</label>
                      <div className="flex items-center">
                        <span className="bg-slate-800 border border-r-0 border-slate-700 text-slate-500 px-3 py-3 rounded-l-xl text-xs font-mono hidden md:block">/blog/</span>
                        <input type="text" value={articleData.slug} onChange={(e) => setArticleData({...articleData, slug: e.target.value})} className="flex-1 bg-[#050810] border border-slate-700 rounded-xl md:rounded-l-none px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-xs md:text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-1 md:mb-2">Article Content (Markdown)</label>
                      <div className="border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors bg-[#050810]">
                        <textarea value={articleData.content} onChange={(e) => setArticleData({...articleData, content: e.target.value})} className="w-full h-[300px] md:h-[400px] bg-transparent p-4 text-slate-300 focus:outline-none font-mono text-xs md:text-sm leading-relaxed resize-none" placeholder="Write your content here..."></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-800">
                      <button onClick={handlePublish} disabled={isSaving} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black py-3 md:py-4 px-8 rounded-xl shadow-lg shadow-blue-900/20 flex justify-center items-center transition-transform hover:scale-105 disabled:opacity-50">
                        <Save className="w-5 h-5 mr-2" /> {isSaving ? 'Publishing...' : 'Publish to Supabase'}
                      </button>
                    </div>
                  </div>
                )}

                {cmsView === 'manage' && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl animate-in fade-in">
                    <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center bg-[#050810]">
                      <h2 className="text-sm md:text-lg font-bold text-white">Live Database Records</h2>
                      <button onClick={fetchArticles} className="text-xs md:text-sm text-blue-400 hover:text-blue-300 font-bold flex items-center bg-blue-500/10 px-3 py-1.5 rounded-lg">
                        <Activity className={`w-3 h-3 md:w-4 md:h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                      </button>
                    </div>
                    
                    {isLoading ? (
                      <div className="p-12 text-center text-slate-500 text-sm">Loading from Supabase...</div>
                    ) : articles.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                        <FileText className="w-12 h-12 mb-4 opacity-50 text-blue-500" />
                        <p className="font-bold">No articles found.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs md:text-sm">
                          <thead className="bg-slate-950/50 text-slate-500 text-[10px] md:text-xs uppercase font-black tracking-wider">
                            <tr>
                              <th className="px-4 md:px-6 py-3 md:py-4">Title</th>
                              <th className="px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">Date</th>
                              <th className="px-4 md:px-6 py-3 md:py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/50">
                            {articles.map((article) => (
                              <tr key={article.id} className="hover:bg-slate-800/20 transition-colors">
                                <td className="px-4 md:px-6 py-3 md:py-4 font-medium text-white max-w-[150px] md:max-w-xs truncate">{article.title}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 text-slate-400 hidden sm:table-cell">
                                  {new Date(article.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                                  <button onClick={() => handleDelete(article.id)} className="text-red-400 hover:text-red-300 bg-red-400/10 p-2 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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
