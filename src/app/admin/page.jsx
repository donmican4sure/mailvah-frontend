"use client";

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  LayoutDashboard, Users, FileText, Settings, 
  Save, Check, Search, ShieldAlert, Activity, DollarSign, Edit3
} from 'lucide-react';

export default function SuperadminDashboard() {
  const [activeTab, setActiveTab] = useState('cms');
  const [isSaving, setIsSaving] = useState(false);
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

  // Save the article to Supabase
  const handlePublish = async () => {
    if (!articleData.title || !articleData.slug || !articleData.content) {
      showToast("Missing required fields (Title, Slug, or Content)!");
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([
          {
            title: articleData.title,
            slug: articleData.slug,
            description: articleData.description,
            content: articleData.content,
            category: articleData.category,
            author: articleData.author
          }
        ]);

      if (error) throw error;
      
      showToast('Article published to Database!');
      // Clear form after publish
      setArticleData({ title: '', slug: '', description: '', content: '', category: 'Deliverability', author: 'Olorunleke Ogundele' });
    } catch (error) {
      console.error(error);
      showToast(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

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
              <Activity className="w-3 h-3 mr-1" /> Server Ping: 12ms
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-sm">CEO</div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">

            {/* --- TAB 3: BLOG CMS ENGINE --- */}
            {activeTab === 'cms' && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Clean Header Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white flex items-center"><Edit3 className="w-5 h-5 mr-2 text-blue-500" /> Content Manager</h2>
                    <p className="text-sm text-slate-400 mt-1">Write and publish articles directly to your Supabase database.</p>
                  </div>
                </div>

                {/* Editor Area */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Article Title</label>
                      <input 
                        type="text" 
                        value={articleData.title}
                        onChange={handleTitleChange}
                        className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-bold" 
                        placeholder="e.g. Why Catch-All Emails Destroy Sender Reputation" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">URL Slug</label>
                      <div className="flex items-center">
                        <span className="bg-slate-800 border border-r-0 border-slate-700 text-slate-500 px-4 py-3 rounded-l-xl text-sm font-mono hidden md:block">mailvah.com/blog/</span>
                        <input 
                          type="text" 
                          value={articleData.slug}
                          onChange={(e) => setArticleData({...articleData, slug: e.target.value})}
                          className="flex-1 bg-[#050810] border border-slate-700 rounded-xl md:rounded-l-none md:rounded-r-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-sm" 
                          placeholder="catch-alls-guide" 
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
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Article Content (Markdown)</span>
                    </label>
                    <div className="border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors bg-[#050810]">
                      <textarea 
                        value={articleData.content}
                        onChange={(e) => setArticleData({...articleData, content: e.target.value})}
                        className="w-full h-[500px] bg-transparent p-4 text-slate-300 focus:outline-none font-mono text-sm leading-relaxed resize-none"
                        placeholder="Write your content here using Markdown formatting (## for headers, ** for bold, etc)..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-800">
                    <button 
                      onClick={handlePublish}
                      disabled={isSaving}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-8 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center transition-transform hover:scale-105 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Publishing...' : 'Publish to Database'}
                    </button>
                  </div>

                </div>
              </div>
            )}
            
            {/* Fallbacks for other tabs */}
            {activeTab !== 'cms' && (
              <div className="text-center pt-20 text-slate-500 font-bold">
                Navigated to {activeTab}. CMS is currently active.
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
