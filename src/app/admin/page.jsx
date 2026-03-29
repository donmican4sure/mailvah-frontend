"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Sparkles, 
  Settings, Save, Check, Search, Plus, 
  MoreVertical, ShieldAlert, Activity, DollarSign
} from 'lucide-react';

export default function SuperadminDashboard() {
  const [activeTab, setActiveTab] = useState('cms');
  const [isGenerating, setIsGenerating] = useState(false);
  const [articleData, setArticleData] = useState({ title: '', slug: '', content: '' });
  const [toast, setToast] = useState(null);

  // AI Generation Simulation
  const handleAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setArticleData({
        title: 'Why Catch-All Emails Destroy Sender Reputation in 2026',
        slug: 'catch-all-emails-sender-reputation',
        content: '## The Hidden Danger of Catch-All Domains\n\nMost sales teams assume that if an email does not bounce immediately, it is safe. This is a fatal assumption when dealing with catch-all domains.\n\nGoogle Workspace and Microsoft 365 use catch-all domains as silent spam traps. If you send emails to non-existent users on these domains, they will not return a 550 error. Instead, they will quietly log your domain as a spammer.\n\n### The Mailvah Solution\nTo survive modern spam filters, you must verify the live SMTP handshake *before* sending. Mailvah executes bare-metal pings to determine if a specific inbox exists behind a catch-all firewall.'
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handlePublish = () => {
    setToast('Article published successfully to database!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 flex font-sans selection:bg-blue-500/30">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl flex items-center shadow-2xl z-50 animate-in slide-in-from-bottom-5">
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
          
          <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3 mt-8 px-2">System</div>
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-bold rounded-xl hover:bg-slate-800/50 hover:text-white transition-colors">
            <Settings className="w-4 h-4 mr-3" /> API & Webhooks
          </button>
        </div>
        <div className="p-4 border-t border-slate-800 text-xs font-mono text-slate-500 text-center">
          Superadmin Session Active
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
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-sm">
              CEO
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">

            {/* --- TAB 1: OVERVIEW --- */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="text-sm font-bold text-slate-500 mb-2 flex items-center"><DollarSign className="w-4 h-4 mr-1 text-emerald-400"/> Live MRR</div>
                    <div className="text-3xl font-black text-white">$12,450.00</div>
                    <div className="text-xs text-emerald-400 mt-2">+14% this week</div>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="text-sm font-bold text-slate-500 mb-2 flex items-center"><Users className="w-4 h-4 mr-1 text-blue-400"/> Active Users</div>
                    <div className="text-3xl font-black text-white">1,402</div>
                    <div className="text-xs text-blue-400 mt-2">32 new today</div>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="text-sm font-bold text-slate-500 mb-2 flex items-center"><Activity className="w-4 h-4 mr-1 text-amber-400"/> API Calls Today</div>
                    <div className="text-3xl font-black text-white">1.2M</div>
                    <div className="text-xs text-slate-500 mt-2">Zero downtime</div>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: USER MANAGEMENT --- */}
            {activeTab === 'users' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden animate-in fade-in">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#050810]">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" placeholder="Search user emails..." className="bg-slate-900 border border-slate-700 text-sm rounded-lg pl-9 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 w-64" />
                  </div>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase font-black tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Account</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4">Credits</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {[
                      { email: 'founder@scaleup.io', plan: 'Pro Network', credits: '42,500' },
                      { email: 'david@agency.com', plan: 'Sandbox', credits: '12' },
                      { email: 'sales@techflow.net', plan: 'Enterprise', credits: '850,000' }
                    ].map((u, i) => (
                      <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{u.email}</td>
                        <td className="px-6 py-4"><span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/20">{u.plan}</span></td>
                        <td className="px-6 py-4 font-mono text-slate-400">{u.credits}</td>
                        <td className="px-6 py-4">
                          <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 mr-4">Add Credits</button>
                          <button className="text-xs font-bold text-red-400 hover:text-red-300">Suspend</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* --- TAB 3: BLOG CMS ENGINE --- */}
            {activeTab === 'cms' && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* AI Header Panel */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white flex items-center"><Sparkles className="w-5 h-5 mr-2 text-blue-400" /> Mailvah AI SEO Engine</h2>
                    <p className="text-sm text-blue-200/60 mt-1">Plugged into Gemini API. Generate rank-ready content instantly.</p>
                  </div>
                  <button 
                    onClick={handleAIGenerate}
                    disabled={isGenerating}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-900/50 flex items-center transition-all disabled:opacity-50"
                  >
                    {isGenerating ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Thinking...</> : <><Sparkles className="w-4 h-4 mr-2" /> Auto-Generate Post</>}
                  </button>
                </div>

                {/* Editor Area */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Article Title</label>
                      <input 
                        type="text" 
                        value={articleData.title}
                        onChange={(e) => setArticleData({...articleData, title: e.target.value})}
                        className="w-full bg-[#050810] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-bold" 
                        placeholder="e.g. How to verify Catch-Alls..." 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">URL Slug</label>
                      <div className="flex items-center">
                        <span className="bg-slate-800 border border-r-0 border-slate-700 text-slate-500 px-4 py-3 rounded-l-xl text-sm font-mono">mailvah.com/blog/</span>
                        <input 
                          type="text" 
                          value={articleData.slug}
                          onChange={(e) => setArticleData({...articleData, slug: e.target.value})}
                          className="flex-1 bg-[#050810] border border-slate-700 rounded-r-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-sm" 
                          placeholder="catch-alls-guide" 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Article Content (Markdown)</span>
                      <span className="text-blue-400 font-sans normal-case text-xs cursor-pointer hover:underline">Preview Mode</span>
                    </label>
                    <div className="border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors bg-[#050810]">
                      {/* Fake Toolbar */}
                      <div className="bg-slate-800/50 border-b border-slate-700 px-4 py-2 flex gap-4 text-slate-400">
                        <button className="hover:text-white font-serif font-bold">B</button>
                        <button className="hover:text-white font-serif italic">I</button>
                        <button className="hover:text-white line-through">S</button>
                        <div className="w-px h-4 bg-slate-700 my-auto"></div>
                        <button className="hover:text-white">🔗</button>
                        <button className="hover:text-white">🖼️</button>
                      </div>
                      <textarea 
                        value={articleData.content}
                        onChange={(e) => setArticleData({...articleData, content: e.target.value})}
                        className="w-full h-96 bg-transparent p-4 text-slate-300 focus:outline-none font-mono text-sm leading-relaxed resize-none"
                        placeholder="Write your content here..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-800">
                    <button 
                      onClick={handlePublish}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-8 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center transition-transform hover:scale-105"
                    >
                      <Save className="w-4 h-4 mr-2" /> Publish to Database
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
