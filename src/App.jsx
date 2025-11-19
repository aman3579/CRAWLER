import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Syllabus from './pages/Syllabus';
import SubjectDetail from './pages/SubjectDetail';

// Placeholder for Home and Practice pages
const Home = () => (
  <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
    <div className="text-center space-y-4 p-8">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        GATE CS Super App
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto">
        Your one-stop destination for all free GATE Computer Science resources.
        Track your syllabus, watch lectures, and practice questions.
      </p>
    </div>
  </div>
);

const Practice = () => (
  <div className="min-h-screen bg-slate-950 text-white p-8 flex items-center justify-center">
    <h1 className="text-2xl text-slate-400">Practice Section Coming Soon</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/subject/:subjectId" element={<SubjectDetail />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
