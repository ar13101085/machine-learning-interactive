import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';

const Functions = ({ onComplete }) => {
  const [selectedFunction, setSelectedFunction] = useState('double');
  const [inputValue, setInputValue] = useState(5);
  const [customA, setCustomA] = useState(2);
  const [customB, setCustomB] = useState(3);
  const [showQuiz, setShowQuiz] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [functionComposition, setFunctionComposition] = useState(false);
  const [firstFunction, setFirstFunction] = useState('double');
  const [secondFunction, setSecondFunction] = useState('addFive');
  const [showGraph, setShowGraph] = useState(false);
  
  const functions = {
    double: {
      name: 'Double করা',
      formula: 'f(x) = 2x',
      bengali: 'দ্বিগুণ করা',
      operation: (x) => 2 * x,
      color: '#3b82f6'
    },
    addFive: {
      name: 'Add 5',
      formula: 'f(x) = x + 5',
      bengali: '৫ যোগ করা',
      operation: (x) => x + 5,
      color: '#10b981'
    },
    square: {
      name: 'Square',
      formula: 'f(x) = x²',
      bengali: 'বর্গ করা',
      operation: (x) => x * x,
      color: '#f59e0b'
    },
    half: {
      name: 'Half করা',
      formula: 'f(x) = x/2',
      bengali: 'অর্ধেক করা',
      operation: (x) => x / 2,
      color: '#ef4444'
    },
    custom: {
      name: 'Custom Function',
      formula: `f(x) = ${customA}x + ${customB}`,
      bengali: 'নিজের ফাংশন',
      operation: (x) => customA * x + customB,
      color: '#8b5cf6'
    }
  };

  const currentFunction = functions[selectedFunction];
  const outputValue = currentFunction.operation(inputValue);

  const [tableData, setTableData] = useState([
    { x: 1, y: currentFunction.operation(1) },
    { x: 2, y: currentFunction.operation(2) },
    { x: 3, y: currentFunction.operation(3) },
    { x: 4, y: currentFunction.operation(4) },
    { x: 5, y: currentFunction.operation(5) }
  ]);

  const updateTable = () => {
    setTableData(tableData.map(row => ({
      x: row.x,
      y: currentFunction.operation(row.x)
    })));
  };

  React.useEffect(() => {
    updateTable();
  }, [selectedFunction, customA, customB]);
  
  useEffect(() => {
    if (animating) {
      const interval = setInterval(() => {
        setAnimationStep(prev => {
          if (prev >= 10) {
            setAnimating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [animating]);

  const realWorldExamples = [
    {
      title: 'Temperature Conversion',
      bengali: 'তাপমাত্রা রূপান্তর',
      input: 'Celsius (°C)',
      output: 'Fahrenheit (°F)',
      formula: 'f(C) = 9C/5 + 32',
      example: '20°C → 68°F'
    },
    {
      title: 'Mobile Recharge',
      bengali: 'মোবাইল রিচার্জ',
      input: 'টাকা',
      output: 'মিনিট',
      formula: 'f(x) = 2x',
      example: '50 টাকা → 100 মিনিট'
    },
    {
      title: 'Distance-Time',
      bengali: 'দূরত্ব-সময়',
      input: 'Time (hours)',
      output: 'Distance (km)',
      formula: 'f(t) = 60t',
      example: '2 hours → 120 km'
    }
  ];

  const quizQuestions = [
    {
      question: "যদি f(x) = 3x + 2 হয়, তাহলে f(4) = ?",
      options: ['10', '12', '14', '16'],
      correct: 2
    },
    {
      question: "Function কি করে?",
      options: [
        'Input থেকে Output তৈরি করে',
        'শুধু সংখ্যা যোগ করে',
        'শুধু গুণ করে',
        'কিছুই করে না'
      ],
      correct: 0
    },
    {
      question: "f(x) = x - 3 হলে, কোন input এর জন্য output 7 হবে?",
      options: ['4', '7', '10', '13'],
      correct: 2
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quizQuestions[index].correct ? 1 : 0);
      }, 0);
      setQuizScore(score);
      if (score === quizQuestions.length) {
        onComplete();
      }
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Functions & Relationships (ফাংশন ও সম্পর্ক)</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Function Machine</h4>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="w-20 p-2 text-center text-xl font-bold border-2 border-gray-300 rounded"
              />
              <p className="text-sm text-gray-600 mt-1">Input (x)</p>
            </div>
            
            <ArrowRight className="mx-4 w-8 h-8 text-gray-400" />
            
            <div 
              className="relative p-8 rounded-lg"
              style={{ backgroundColor: currentFunction.color + '20' }}
            >
              <div className="absolute top-2 left-2">
                <RefreshCw className="w-5 h-5" style={{ color: currentFunction.color }} />
              </div>
              <p className="text-lg font-bold" style={{ color: currentFunction.color, fontFamily: 'Georgia, serif' }}>
                {currentFunction.formula}
              </p>
              <p className="text-sm text-gray-600">{currentFunction.bengali}</p>
            </div>
            
            <ArrowRight className="mx-4 w-8 h-8 text-gray-400" />
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-bold text-center">{outputValue}</p>
              <p className="text-sm text-gray-600 mt-1">Output f(x)</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm font-semibold text-gray-700">Select Function:</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(functions).map(([key, func]) => (
                <button
                  key={key}
                  onClick={() => setSelectedFunction(key)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    selectedFunction === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <p className="font-medium">{func.name}</p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>{func.formula}</p>
                </button>
              ))}
            </div>
          </div>
          
          {selectedFunction === 'custom' && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-purple-700 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Customize your function: f(x) = ax + b
              </p>
              <div className="flex gap-4">
                <div>
                  <label className="text-sm text-gray-600">a =</label>
                  <input
                    type="number"
                    value={customA}
                    onChange={(e) => setCustomA(Number(e.target.value))}
                    className="w-16 ml-2 p-1 border rounded"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">b =</label>
                  <input
                    type="number"
                    value={customB}
                    onChange={(e) => setCustomB(Number(e.target.value))}
                    className="w-16 ml-2 p-1 border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Input-Output Table</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Input (x)</th>
                  <th className="px-4 py-2 text-left">Process</th>
                  <th className="px-4 py-2 text-left">Output f(x)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{row.x}</td>
                    <td className="px-4 py-2 text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>{currentFunction.formula}</td>
                    <td className="px-4 py-2 font-semibold">{row.y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Pattern খুঁজুন:</strong> Input থেকে Output কিভাবে তৈরি হচ্ছে? 
              এটাই হলো function এর নিয়ম!
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Real-World Functions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {realWorldExamples.map((example, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800">{example.title}</h5>
              <p className="text-sm text-gray-600 mb-2">{example.bengali}</p>
              <div className="bg-white p-3 rounded mt-2">
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Georgia, serif' }}>Formula: {example.formula}</p>
                <p className="text-sm mt-1">
                  <span className="text-blue-600">{example.input}</span>
                  <ArrowRight className="inline w-4 h-4 mx-1" />
                  <span className="text-green-600">{example.output}</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">{example.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Key Concepts</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold text-yellow-700 mb-2">Domain & Range</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• <strong>Domain:</strong> সব possible input values</li>
              <li>• <strong>Range:</strong> সব possible output values</li>
              <li>• Example: f(x) = 2x এর domain হলো সব real numbers</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">One-to-One Relationship</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• প্রতিটি input এর জন্য একটিমাত্র output</li>
              <li>• Same input = Same output (always)</li>
              <li>• এটাই function এর মূল নিয়ম</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Function Visualization</h4>
        
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => setShowGraph(!showGraph)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showGraph ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {showGraph ? 'Hide' : 'Show'} Graph
          </button>
          <button
            onClick={() => setAnimating(!animating)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              animating ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {animating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {animating ? 'Pause' : 'Animate'}
          </button>
          <button
            onClick={() => setAnimationStep(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        {showGraph && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={Array.from({ length: 11 }, (_, i) => {
                  const x = i - 5;
                  return {
                    x,
                    y: currentFunction.operation(x),
                    animated: animating && i <= animationStep
                  };
                })}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke={currentFunction.color}
                  strokeWidth={3}
                  dot={(props) => {
                    if (props.payload.animated) {
                      return (
                        <Dot
                          {...props}
                          fill={currentFunction.color}
                          r={6}
                          className="animate-pulse"
                        />
                      );
                    }
                    return <Dot {...props} fill={currentFunction.color} r={4} />;
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            {animating && (
              <div className="mt-3 bg-white p-3 rounded">
                <p className="text-sm text-gray-600">
                  Input: {animationStep - 5} → Output: {currentFunction.operation(animationStep - 5)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(animationStep / 10) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Function Composition</h4>
        
        <div className="mb-4">
          <button
            onClick={() => setFunctionComposition(!functionComposition)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              functionComposition ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            {functionComposition ? 'Disable' : 'Enable'} Composition
          </button>
        </div>
        
        {functionComposition && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">First Function</p>
                <select
                  value={firstFunction}
                  onChange={(e) => setFirstFunction(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  {Object.entries(functions).map(([key, func]) => (
                    <option key={key} value={key}>{func.name}</option>
                  ))}
                </select>
              </div>
              
              <ArrowRight className="w-6 h-6 text-gray-400" />
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Second Function</p>
                <select
                  value={secondFunction}
                  onChange={(e) => setSecondFunction(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  {Object.entries(functions).map(([key, func]) => (
                    <option key={key} value={key}>{func.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-center font-semibold text-purple-700 mb-3">
                Composition: g(f(x))
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white p-3 rounded text-center">
                  <p className="text-sm text-gray-600">Input</p>
                  <p className="font-bold">{inputValue}</p>
                </div>
                <ArrowRight className="text-purple-500" />
                <div className="bg-white p-3 rounded text-center">
                  <p className="text-sm text-gray-600">f(x)</p>
                  <p className="font-bold">
                    {functions[firstFunction].operation(inputValue)}
                  </p>
                </div>
                <ArrowRight className="text-purple-500" />
                <div className="bg-white p-3 rounded text-center">
                  <p className="text-sm text-gray-600">g(f(x))</p>
                  <p className="font-bold">
                    {functions[secondFunction].operation(
                      functions[firstFunction].operation(inputValue)
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {!showQuiz ? (
        <div className="flex justify-center">
          <button
            onClick={() => setShowQuiz(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Practice Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Practice Quiz</h4>
          {quizScore === 0 && currentQuestion < quizQuestions.length ? (
            <div>
              <p className="text-lg mb-4">{quizQuestions[currentQuestion].question}</p>
              <div className="space-y-2">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    className="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-blue-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">
                Score: {quizScore}/{quizQuestions.length}
              </p>
              {quizScore === quizQuestions.length ? (
                <p className="text-green-600">Excellent! You understand functions!</p>
              ) : (
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setQuizAnswers([]);
                    setQuizScore(0);
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Functions;