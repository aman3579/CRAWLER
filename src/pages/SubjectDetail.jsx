import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { syllabusData } from '../data/syllabus';
import { resourcesData } from '../data/resources';
import { ArrowLeft, Youtube, FileText, HelpCircle, ExternalLink, Clock, PlayCircle } from 'lucide-react';

const SubjectDetail = () => {
    const { subjectId } = useParams();
    const [activeTab, setActiveTab] = useState('videos');

    const subject = syllabusData.find(s => s.id === subjectId);
    const resources = resourcesData[subjectId];

    if (!subject) return <div className="text-white p-8">Subject not found</div>;

    const tabs = [
        { id: 'videos', label: 'Video Lectures & Practice', icon: Youtube },
        // { id: 'notes', label: 'Study Notes', icon: FileText },
        // { id: 'pyqs', label: 'Previous Year Questions', icon: HelpCircle },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Link to="/syllabus" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Syllabus
                </Link>

                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {subject.title}
                </h1>
                <p className="text-slate-400 mb-8">Automated crawled resources from YouTube</p>

                <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                                    }`}
                            >
                                <Icon size={18} className="mr-2" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activeTab === 'videos' && resources?.videos.map((video, idx) => (
                        <a
                            key={idx}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col"
                        >
                            <div className="relative aspect-video bg-slate-800 overflow-hidden">
                                {video.thumbnail ? (
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                                        <Youtube size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <PlayCircle size={48} className="text-white drop-shadow-lg" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded text-white flex items-center">
                                    <Clock size={12} className="mr-1" /> {video.duration}
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${video.type === 'PYQ Solving' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {video.type}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-slate-200 line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                                    {video.title}
                                </h3>
                                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                                    <span>{video.channel}</span>
                                    <ExternalLink size={16} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubjectDetail;
