"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  LayoutDashboard, Users, FileText, Settings, 
  Save, Check, Search, ShieldAlert, Activity, 
  DollarSign, Edit3, Trash2, Plus, List
} from 'lucide-react';

export default function SuperadminDashboard() {
  const [activeTab, setActiveTab] = useState('cms');
  const [cmsView, setCmsView] = useState('write'); // 'write' or 'manage'
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [toast, setToast] = useState(null);
  
  const [articleData, setArticleData] = useState({ 
    title: '', slug: '', description: '', content: '', category: 'Deliverability', author: 'Olorunleke Ogundele' 
  });

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Auto-generate URL slug as you type the title
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const generatedSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setArticleData({ ...articleData, title: newTitle, slug: generatedSlug });
  };

  // --- DATABASE OPERATIONS ---

  // Fetch articles from Supabase
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      showToast("Failed to load articles.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save new article to Supabase
  const handlePublish = async () => {
    if (!articleData.title || !articleData.slug || !articleData.content) {
      showToast("Missing required fields (Title, Slug, or Content)!");
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([{
            title: articleData.title,
            slug: articleData.slug,
            description: articleData.description,
            content: articleData.content,
            category: articleData.category,
            author: articleData.author
        }]);

      if (error) throw error;
      
      showToast('Article published to Database!');
      setArticleData({ title: '', slug: '', description: '', content: '', category: 'Deliverability', author: 'Olorunleke Ogundele' });
      setCmsView('manage'); // Switch to manage view to see the new post
      fetchArticles(); // Refresh the list
    } catch (error) {
      console.error(error);
      showToast(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete article from Supabase
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      
      showToast("Article deleted successfully.");
      fetchArticles(); // Refresh the list
    } catch (error) {
      console.error("Error deleting:", error);
      showToast("Failed to delete article.");
    }
  };

  // Load articles when switching to the 'manage' view
  useEffect(() => {
    if (activeTab === 'cms' && cmsView === 'manage') {
      fetchArticles();
    }
  }, [activeTab, cmsView]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 flex font-sans selection:bg-blue-500/30">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl flex items-center shadow-2xl z-[100] animate-in slide-in-from-bottom-5">
          <Check className="w-5 h-5 mr-2" /> {toast}
        </div>
      )}

      {/* SIDEBAR */}
      <div className="w-64 bg-[#050810] border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <ShieldAlert className="w-5 h-5 text-blue-500 mr-2" />
          <span className="font-black text-white tracking-tight">Mailvah HQ</span>
        </div>
        <div className="p-4 space-y-1 flex-1">
          <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3 mt-2 px-2">Control Room</div>
          
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-3 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}>
            <LayoutDashboard className="w-4 h-4 mr-3" /> Overview
          </button>
          
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-3 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'users' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}>
            <Users className="w-4 h-4 mr-3" /> User Management
          </button>
          
          <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center px-3 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'cms' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 hover:text-white'}`}>
            <FileText className="w-4 h-4 mr-3" /> Blog Engine (CMS)
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-[#0B0F19] flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold flex items-center">
              <Activity className="w-3 h-3 mr-1" /> DB Linked
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-sm">CEO</div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">

            {/* --- TAB 1: OVERVIEW (Mocked for layout) --- */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="text-sm font-bold text-slate-500 mb-2 flex items-center"><DollarSign className="w-4 h-4 mr-1 text-emerald-400"/> Live MRR</div>
                    <div className="text-3xl font-black text-white">$12,450.00</div>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="text-sm font-bold text-slate-500 mb-2 flex items-center"><Users className="w-4 h-4 mr-1 text-blue-400"/> Active Users</div>
                    <div className="text-3xl font-black text-white">1,402</div>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="text-sm font-bold text-slate-500 mb-2 flex items-center"><Activity className="w-4 h-4 mr-1 text-amber-400"/> API Calls Today</div>
                    <div className="text-3xl font-black text-white">1.2M</div>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: USER MANAGEMENT (Mocked for layout) --- */}
            {activeTab === 'users' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center animate-in fade-in">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">User Database</h2>
                <p className="text-slate-500">Connect this to Supabase Auth in the next phase to manage real users.</p>
              </div>
            )}

            {/* --- TAB 3: FUNCTIONAL CMS ENGINE --- */}
            {activeTab === 'cms' && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* CMS Sub-Navigation */}
                <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 w-max">
                  <button onClick={() => setCmsView('write')} className={`flex items-center px-6 py-2.5 text-sm font-bold rounded-lg transition-colors ${cmsView === 'write' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                    <Edit3 className="w-4 h-4 mr-2" /> Write Article
                  </button>
                  <button onClick={() => setCmsView('manage')} className={`flex items-center px-6 py-2.5 text-sm font-bold rounded-lg transition-colors ${cmsView === 'manage' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
                    <List className="w-4 h-4 mr-2" /> Manage Published
                  </button>
                </div>

                {/* VIEW A: WRITE ARTICLE */}
                {cmsView === 'write' && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Article Title</label>
                        <input 
                          type="text" 
                          value={articleData.title}
                          onChange={handleTitleChange}
                          className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-bold" 
                          placeholder="Enter article title..." 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">URL Slug (Auto-Generated)</label>
                        <div className="flex items-center">
                          <span className="bg-slate-800 border border-r-0 border-slate-700 text-slate-500 px-4 py-3 rounded-l-xl text-sm font-mono hidden md:block">/blog/</span>
                          <input 
                            type="text" 
                            value={articleData.slug}
                            onChange={(e) => setArticleData({...articleData, slug: e.target.value})}
                            className="flex-1 bg-[#050810] border border-slate-700 rounded-xl md:rounded-l-none md:rounded-r-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-sm" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Category</label>
                        <input 
                          type="text" 
                          value={articleData.category}
                          onChange={(e) => setArticleData({...articleData, category: e.target.value})}
                          className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-bold" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">SEO Description</label>
                      <textarea 
                        value={articleData.description}
                        onChange={(e) => setArticleData({...articleData, description: e.target.value})}
                        className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-medium h-20 resize-none"
                        placeholder="A short summary for Google search results..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Article Content (Markdown)</label>
                      <div className="border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors bg-[#050810]">
                        <textarea 
                          value={articleData.content}
                          onChange={(e) => setArticleData({...articleData, content: e.target.value})}
                          className="w-full h-[400px] bg-transparent p-4 text-slate-300 focus:outline-none font-mono text-sm leading-relaxed resize-none"
                          placeholder="Write your content here..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-800">
                      <button 
                        onClick={handlePublish}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-8 rounded-xl shadow-lg shadow-blue-900/20 flex items-center transition-transform hover:scale-105 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Publishing...' : 'Publish to Supabase'}
                      </button>
                    </div>
                  </div>
                )}

                {/* VIEW B: MANAGE PUBLISHED ARTICLES */}
                {cmsView === 'manage' && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl animate-in fade-in">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#050810]">
                      <h2 className="text-lg font-bold text-white">Live Database Records</h2>
                      <button onClick={fetchArticles} className="text-sm text-blue-400 hover:text-blue-300 font-bold flex items-center">
                        <Activity className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                      </button>
                    </div>
                    
                    {isLoading ? (
                      <div className="p-12 text-center text-slate-500">Loading articles from Supabase...</div>
                    ) : articles.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                        <FileText className="w-12 h-12 mb-4 opacity-50" />
                        <p>No articles found in the database.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase font-black tracking-wider">
                          <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-slate-800/20 transition-colors">
                              <td className="px-6 py-4 font-medium text-white max-w-xs truncate">{article.title}</td>
                              <td className="px-6 py-4">
                                <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-bold border border-slate-700">
                                  {article.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-400">
                                {new Date(article.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => handleDelete(article.id)}
                                  className="text-red-400 hover:text-red-300 bg-red-400/10 p-2 rounded-lg transition-colors"
                                  title="Delete Article"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
