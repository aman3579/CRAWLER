import React, { useState, useEffect } from 'react';
import { syllabusData } from '../data/syllabus';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Syllabus = () => {
    const [completedTopics, setCompletedTopics] = useState(() => {
        const saved = localStorage.getItem('gate-syllabus-progress');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('gate-syllabus-progress', JSON.stringify(completedTopics));
    }, [completedTopics]);

    const toggleTopic = (topicId) => {
        setCompletedTopics(prev =>
            prev.includes(topicId)
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };

    const calculateProgress = (subject) => {
        const total = subject.topics.length;
        const completed = subject.topics.filter(t => completedTopics.includes(t.id)).length;
        return (completed / total) * 100;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Syllabus Tracker
                </h1>

                <div className="space-y-6">
                    {syllabusData.map((subject) => {
                        const progress = calculateProgress(subject);
                        return (
                            <div key={subject.id} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
                                <div className="p-6 border-b border-slate-800">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold text-white">{subject.title}</h2>
                                        <Link
                                            to={`/subject/${subject.id}`}
                                            className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            View Resources <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                    <div className="flex justify-between items-center mb-2 text-sm text-slate-400">
                                        <span>Progress</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="p-4 space-y-2">
                                    {subject.topics.map((topic) => {
                                        const isCompleted = completedTopics.includes(topic.id);
                                        return (
                                            <div
                                                key={topic.id}
                                                onClick={() => toggleTopic(topic.id)}
                                                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 flex items-start gap-4 group ${isCompleted ? 'bg-blue-500/10 border border-blue-500/20' : 'hover:bg-slate-800 border border-transparent'
                                                    }`}
                                            >
                                                <button className={`mt-1 transition-colors ${isCompleted ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                                    {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                                                </button>
                                                <p className={`text-sm leading-relaxed ${isCompleted ? 'text-slate-300' : 'text-slate-400'}`}>
                                                    {topic.name}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Syllabus;
