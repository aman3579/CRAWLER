import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';

const Quiz = ({ questions, subjectTitle }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [answers, setAnswers] = useState({}); // Store answers for review

    const handleOptionSelect = (index) => {
        if (showResult) return;
        setSelectedOption(index);
    };

    const handleNext = () => {
        const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;

        setAnswers({
            ...answers,
            [currentQuestion]: {
                selected: selectedOption,
                correct: questions[currentQuestion].correctAnswer,
                isCorrect
            }
        });

        if (isCorrect) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setShowResult(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setShowResult(false);
        setScore(0);
        setQuizCompleted(false);
        setAnswers({});
    };

    if (quizCompleted) {
        return (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center backdrop-blur-sm">
                <div className="inline-block p-4 bg-yellow-500/20 rounded-full mb-6">
                    <Trophy size={48} className="text-yellow-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
                <p className="text-slate-400 mb-8">You scored {score} out of {questions.length}</p>

                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden mb-8 max-w-md mx-auto">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                    />
                </div>

                <button
                    onClick={restartQuiz}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                    <RefreshCw size={20} className="mr-2" />
                    Restart Quiz
                </button>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-slate-400">
                    Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-blue-400">
                    Score: {score}
                </span>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm mb-6">
                <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                    {question.question}
                </h3>

                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            disabled={showResult}
                            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between group ${selectedOption === index
                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-100'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                                }`}
                        >
                            <span>{option}</span>
                            {selectedOption === index && (
                                <div className="w-4 h-4 rounded-full bg-blue-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => {
                        if (selectedOption !== null) {
                            handleNext();
                        }
                    }}
                    disabled={selectedOption === null}
                    className={`px-8 py-3 rounded-lg font-medium transition-all ${selectedOption !== null
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div>
        </div>
    );
};

export default Quiz;
