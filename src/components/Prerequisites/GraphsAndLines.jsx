import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Move, Info, Lightbulb, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Area, ComposedChart } from 'recharts';

const GraphsAndLines = ({ onComplete }) => {
  const [slope, setSlope] = useState(1);
  const [yIntercept, setYIntercept] = useState(0);
  const [point1, setPoint1] = useState({ x: 1, y: 2 });
  const [point2, setPoint2] = useState({ x: 4, y: 8 });
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedExample, setSelectedExample] = useState('positive');
  const [showParallel, setShowParallel] = useState(false);
  const [showPerpendicular, setShowPerpendicular] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState('explore');

  const generateLineData = () => {
    const data = [];
    for (let x = -5; x <= 5; x += 0.5) {
      data.push({
        x: x,
        y: slope * x + yIntercept
      });
    }
    return data;
  };

  const calculateSlopeFromPoints = () => {
    return ((point2.y - point1.y) / (point2.x - point1.x)).toFixed(2);
  };

  const getSlopeType = (m) => {
    if (m > 0) return { type: 'Positive', icon: TrendingUp, color: 'text-green-600', bengali: 'ধনাত্মক' };
    if (m < 0) return { type: 'Negative', icon: TrendingDown, color: 'text-red-600', bengali: 'ঋণাত্মক' };
    return { type: 'Zero', icon: Minus, color: 'text-blue-600', bengali: 'শূন্য' };
  };

  const slopeExamples = {
    positive: {
      name: 'Positive Slope',
      slope: 2,
      intercept: 1,
      description: 'Line goes up from left to right',
      bengali: 'বাম থেকে ডানে উপরে যায়',
      realWorld: 'Income vs Experience'
    },
    negative: {
      name: 'Negative Slope', 
      slope: -1.5,
      intercept: 5,
      description: 'Line goes down from left to right',
      bengali: 'বাম থেকে ডানে নিচে যায়',
      realWorld: 'Price vs Demand'
    },
    zero: {
      name: 'Zero Slope',
      slope: 0,
      intercept: 3,
      description: 'Horizontal line',
      bengali: 'অনুভূমিক রেখা',
      realWorld: 'Constant temperature'
    }
  };

  const loadExample = (key) => {
    setSelectedExample(key);
    setSlope(slopeExamples[key].slope);
    setYIntercept(slopeExamples[key].intercept);
  };

  const currentSlopeType = getSlopeType(slope);
  const SlopeIcon = currentSlopeType.icon;

  const quizQuestions = [
    {
      question: "দুটি point (2, 4) এবং (4, 8) এর মধ্যে slope কত?",
      options: ['1', '2', '3', '4'],
      correct: 1
    },
    {
      question: "Y-intercept কি?",
      options: [
        'X-axis এ যেখানে line কাটে',
        'Y-axis এ যেখানে line কাটে', 
        'Line এর slope',
        'Origin point'
      ],
      correct: 1
    },
    {
      question: "Negative slope মানে কি?",
      options: [
        'Line উপরে যায়',
        'Line নিচে যায়',
        'Line horizontal',
        'Line vertical'
      ],
      correct: 1
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
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Graphs & Lines (গ্রাফ ও রেখা)</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Interactive Line Graph</h4>
          
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart 
                data={generateLineData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" domain={[-5, 5]} />
                <YAxis domain={[-10, 10]} />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke={currentSlopeType.color.replace('text-', '#').replace('600', '500')}
                  strokeWidth={3}
                  dot={false}
                />
                <ReferenceDot x={0} y={yIntercept} r={6} fill="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="text-center mt-4">
              <p className="text-lg bg-gray-50 p-2 rounded inline-block" style={{ fontFamily: 'Georgia, serif' }}>
                y = {slope}x + {yIntercept}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slope (m) = {slope}
                <span className={`ml-2 ${currentSlopeType.color}`}>
                  <SlopeIcon className="inline w-4 h-4" />
                  {currentSlopeType.type} ({currentSlopeType.bengali})
                </span>
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={slope}
                onChange={(e) => setSlope(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Y-Intercept (b) = {yIntercept}
                <span className="ml-2 text-red-600">
                  (Y-axis এ {yIntercept} point এ কাটে)
                </span>
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={yIntercept}
                onChange={(e) => setYIntercept(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Slope Examples</h4>
            <div className="space-y-3">
              {Object.entries(slopeExamples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => loadExample(key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedExample === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">{example.name}</h5>
                    {getSlopeType(example.slope).icon === TrendingUp && <TrendingUp className="w-5 h-5 text-green-600" />}
                    {getSlopeType(example.slope).icon === TrendingDown && <TrendingDown className="w-5 h-5 text-red-600" />}
                    {getSlopeType(example.slope).icon === Minus && <Minus className="w-5 h-5 text-blue-600" />}
                  </div>
                  <p className="text-sm text-gray-600">{example.description}</p>
                  <p className="text-sm text-gray-500">{example.bengali}</p>
                  <p className="text-xs text-blue-600 mt-1">Example: {example.realWorld}</p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Rise Over Run</h4>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <div className="text-center text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                <span>Slope = </span>
                <div className="inline-block align-middle mx-2">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>Rise</div>
                    <div className="border-t border-gray-700 px-2"></div>
                    <div>Run</div>
                  </div>
                </div>
                <span> = </span>
                <div className="inline-block align-middle mx-2">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>(y<sub>2</sub> − y<sub>1</sub>)</div>
                    <div className="border-t border-gray-700 px-2"></div>
                    <div>(x<sub>2</sub> − x<sub>1</sub>)</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                উল্লম্ব পরিবর্তন ÷ অনুভূমিক পরিবর্তন
              </p>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <svg width="200" height="150" viewBox="0 0 200 150">
                  <line x1="50" y1="100" x2="150" y2="50" stroke="#3b82f6" strokeWidth="3" />
                  <line x1="50" y1="100" x2="150" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="150" y1="100" x2="150" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                  <circle cx="50" cy="100" r="4" fill="#3b82f6" />
                  <circle cx="150" cy="50" r="4" fill="#3b82f6" />
                  <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#10b981">Run</text>
                  <text x="160" y="75" textAnchor="middle" fontSize="14" fill="#ef4444">Rise</text>
                </svg>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>• <span className="text-green-600">Run</span>: Horizontal change (অনুভূমিক দূরত্ব)</p>
              <p>• <span className="text-red-600">Rise</span>: Vertical change (উল্লম্ব দূরত্ব)</p>
              <p>• Positive slope: Rise ↑, Negative slope: Rise ↓</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Calculate Slope from Two Points</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-3">Point 1</h5>
            <div className="flex gap-4">
              <div>
                <label className="text-sm text-gray-600">x<sub>1</sub></label>
                <input
                  type="number"
                  value={point1.x}
                  onChange={(e) => setPoint1({...point1, x: parseFloat(e.target.value) || 0})}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">y<sub>1</sub></label>
                <input
                  type="number"
                  value={point1.y}
                  onChange={(e) => setPoint1({...point1, y: parseFloat(e.target.value) || 0})}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-3">Point 2</h5>
            <div className="flex gap-4">
              <div>
                <label className="text-sm text-gray-600">x<sub>2</sub></label>
                <input
                  type="number"
                  value={point2.x}
                  onChange={(e) => setPoint2({...point2, x: parseFloat(e.target.value) || 0})}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">y<sub>2</sub></label>
                <input
                  type="number"
                  value={point2.y}
                  onChange={(e) => setPoint2({...point2, y: parseFloat(e.target.value) || 0})}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="text-center mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            <span>Slope = </span>
            <div className="inline-block align-middle">
              <div className="text-center" style={{ lineHeight: '1' }}>
                <div>({point2.y} − {point1.y})</div>
                <div className="border-t border-gray-700 px-2"></div>
                <div>({point2.x} − {point1.x})</div>
              </div>
            </div>
            <span> = </span>
            <div className="inline-block align-middle">
              <div className="text-center" style={{ lineHeight: '1' }}>
                <div>{point2.y - point1.y}</div>
                <div className="border-t border-gray-700 px-2"></div>
                <div>{point2.x - point1.x}</div>
              </div>
            </div>
          </div>
          <p className="text-center text-2xl font-bold text-blue-600" style={{ fontFamily: 'Georgia, serif' }}>
            m = {calculateSlopeFromPoints()}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Fundamental Theory of Lines</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold text-yellow-700 mb-3">What is a Line? (রেখা কি?)</h5>
            <p className="text-sm text-gray-700 mb-3">
              একটি straight line হলো দুটি variable এর মধ্যে linear relationship।
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span>সব points একই direction এ থাকে</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span>Constant rate of change (slope)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span>Extends infinitely in both directions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-3">Why Study Lines?</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Linear Regression:</strong> Lines fit করে prediction করা</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Trends:</strong> Data এর pattern বুঝতে</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Relationships:</strong> Variables এর সম্পর্ক analyze করতে</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Optimization:</strong> Best fit line খুঁজতে</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h5 className="font-semibold text-blue-700 mb-3">Understanding Slope (ঢাল বোঝা)</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded">
              <p className="font-semibold text-blue-600 mb-1">Positive Slope (+)</p>
              <p className="text-sm">Line উপরে উঠে (↗)</p>
              <p className="text-xs text-gray-600">x বাড়লে y বাড়ে</p>
              <div className="mt-2">
                <svg width="100" height="80" viewBox="0 0 100 80" className="mx-auto">
                  <line x1="10" y1="10" x2="10" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="10" y1="70" x2="90" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="20" y1="60" x2="80" y2="20" stroke="#3b82f6" strokeWidth="3"/>
                  <circle cx="20" cy="60" r="3" fill="#3b82f6"/>
                  <circle cx="80" cy="20" r="3" fill="#3b82f6"/>
                  <text x="45" y="78" fontSize="10" fill="#6b7280">x</text>
                  <text x="2" y="40" fontSize="10" fill="#6b7280">y</text>
                </svg>
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="font-semibold text-red-600 mb-1">Negative Slope (-)</p>
              <p className="text-sm">Line নিচে নামে (↘)</p>
              <p className="text-xs text-gray-600">x বাড়লে y কমে</p>
              <div className="mt-2">
                <svg width="100" height="80" viewBox="0 0 100 80" className="mx-auto">
                  <line x1="10" y1="10" x2="10" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="10" y1="70" x2="90" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="20" y1="20" x2="80" y2="60" stroke="#ef4444" strokeWidth="3"/>
                  <circle cx="20" cy="20" r="3" fill="#ef4444"/>
                  <circle cx="80" cy="60" r="3" fill="#ef4444"/>
                  <text x="45" y="78" fontSize="10" fill="#6b7280">x</text>
                  <text x="2" y="40" fontSize="10" fill="#6b7280">y</text>
                </svg>
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="font-semibold text-gray-600 mb-1">Zero Slope (0)</p>
              <p className="text-sm">Horizontal line (→)</p>
              <p className="text-xs text-gray-600">y constant থাকে</p>
              <div className="mt-2">
                <svg width="100" height="80" viewBox="0 0 100 80" className="mx-auto">
                  <line x1="10" y1="10" x2="10" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="10" y1="70" x2="90" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="20" y1="40" x2="80" y2="40" stroke="#6b7280" strokeWidth="3"/>
                  <circle cx="20" cy="40" r="3" fill="#6b7280"/>
                  <circle cx="80" cy="40" r="3" fill="#6b7280"/>
                  <text x="45" y="78" fontSize="10" fill="#6b7280">x</text>
                  <text x="2" y="40" fontSize="10" fill="#6b7280">y</text>
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-3 bg-white p-3 rounded">
            <p className="text-sm font-mono text-center">
              Slope = Rise/Run = (y₂ - y₁)/(x₂ - x₁) = Δy/Δx
            </p>
            <p className="text-xs text-gray-600 text-center mt-1">
              Vertical change ÷ Horizontal change
            </p>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h5 className="font-semibold text-purple-700 mb-3">Y-Intercept (Y-অক্ষ ছেদক)</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Y-intercept (b) হলো যেখানে line Y-axis কে ছেদ করে
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• যখন x = 0, তখন y = b</li>
                <li>• Starting point হিসেবে কাজ করে</li>
                <li>• Line এর vertical position নির্ধারণ করে</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="font-semibold text-purple-600 mb-2">Example:</p>
              <p className="text-sm">y = 2x + 3</p>
              <p className="text-sm text-gray-600">• Slope (m) = 2</p>
              <p className="text-sm text-gray-600">• Y-intercept (b) = 3</p>
              <p className="text-sm text-gray-600">• Point (0, 3) এ Y-axis cross করে</p>
              <div className="mt-2">
                <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto">
                  <line x1="20" y1="10" x2="20" y2="90" stroke="#374151" strokeWidth="2"/>
                  <line x1="10" y1="80" x2="110" y2="80" stroke="#374151" strokeWidth="2"/>
                  <line x1="10" y1="85" x2="100" y2="15" stroke="#8b5cf6" strokeWidth="3"/>
                  <circle cx="20" cy="50" r="4" fill="#ef4444"/>
                  <text x="25" y="53" fontSize="10" fill="#ef4444">(0, 3)</text>
                  <text x="100" y="95" fontSize="10" fill="#6b7280">x</text>
                  <text x="5" y="15" fontSize="10" fill="#6b7280">y</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Detailed Theory: Line Equation Forms</h4>
        
        <div className="space-y-6">
          {/* Slope-Intercept Form */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h5 className="font-semibold text-indigo-700 mb-3">1. Slope-Intercept Form</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-xl mb-2 text-center bg-white p-2 rounded">y = mx + b</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>m</strong> = slope (ঢাল)</li>
                  <li><strong>b</strong> = y-intercept (y-অক্ষ ছেদক)</li>
                  <li><strong>When to use:</strong> যখন slope এবং y-intercept জানা থাকে</li>
                  <li><strong>Advantage:</strong> সহজেই graph করা যায়</li>
                </ul>
                <div className="mt-3 bg-white p-3 rounded">
                  <p className="text-sm font-semibold mb-1">Example: y = 2x + 3</p>
                  <p className="text-xs text-gray-600">• Start at (0, 3)</p>
                  <p className="text-xs text-gray-600">• Rise 2, Run 1 for each point</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded">
                <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto">
                  {/* Grid */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <g key={`grid1-${i}`}>
                      <line x1={20 + i * 25} y1="20" x2={20 + i * 25} y2="150" stroke="#f3f4f6" strokeWidth="1"/>
                      <line x1="20" y1={20 + i * 20} x2="170" y2={20 + i * 20} stroke="#f3f4f6" strokeWidth="1"/>
                    </g>
                  ))}
                  {/* Axes */}
                  <line x1="95" y1="20" x2="95" y2="150" stroke="#374151" strokeWidth="2"/>
                  <line x1="20" y1="90" x2="170" y2="90" stroke="#374151" strokeWidth="2"/>
                  {/* Line y = 2x + 3 */}
                  <line x1="45" y1="140" x2="145" y2="40" stroke="#6366f1" strokeWidth="3"/>
                  {/* Y-intercept point */}
                  <circle cx="95" cy="70" r="5" fill="#ef4444"/>
                  <text x="100" y="70" fontSize="10" fill="#ef4444">b = 3</text>
                  {/* Slope visualization */}
                  <line x1="95" y1="70" x2="120" y2="70" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3"/>
                  <line x1="120" y1="70" x2="120" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3"/>
                  <text x="105" y="83" fontSize="9" fill="#10b981">1</text>
                  <text x="125" y="50" fontSize="9" fill="#10b981">2</text>
                  <text x="80" y="165" fontSize="12" fill="#6366f1">y = 2x + 3</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Point-Slope Form */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-3">2. Point-Slope Form</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-xl mb-2 text-center bg-white p-2 rounded">y - y₁ = m(x - x₁)</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>m</strong> = slope (ঢাল)</li>
                  <li><strong>(x₁, y₁)</strong> = known point (জানা বিন্দু)</li>
                  <li><strong>When to use:</strong> একটি point এবং slope জানা থাকলে</li>
                  <li><strong>Advantage:</strong> Any point দিয়ে equation লেখা যায়</li>
                </ul>
                <div className="mt-3 bg-white p-3 rounded">
                  <p className="text-sm font-semibold mb-1">Example: Point (2, 5), Slope = 3</p>
                  <p className="text-xs text-gray-600">y - 5 = 3(x - 2)</p>
                  <p className="text-xs text-gray-600">Simplifies to: y = 3x - 1</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded">
                <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto">
                  {/* Grid */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <g key={`grid2-${i}`}>
                      <line x1={20 + i * 25} y1="20" x2={20 + i * 25} y2="150" stroke="#f3f4f6" strokeWidth="1"/>
                      <line x1="20" y1={20 + i * 20} x2="170" y2={20 + i * 20} stroke="#f3f4f6" strokeWidth="1"/>
                    </g>
                  ))}
                  {/* Axes */}
                  <line x1="45" y1="20" x2="45" y2="150" stroke="#374151" strokeWidth="2"/>
                  <line x1="20" y1="110" x2="170" y2="110" stroke="#374151" strokeWidth="2"/>
                  {/* Line through (2,5) with slope 3 */}
                  <line x1="20" y1="135" x2="145" y2="10" stroke="#10b981" strokeWidth="3"/>
                  {/* Given point */}
                  <circle cx="95" cy="50" r="5" fill="#ef4444"/>
                  <text x="100" y="50" fontSize="10" fill="#ef4444">(2, 5)</text>
                  {/* Slope from point */}
                  <line x1="95" y1="50" x2="120" y2="50" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,3"/>
                  <line x1="120" y1="50" x2="120" y2="20" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,3"/>
                  <text x="105" y="63" fontSize="9" fill="#6366f1">1</text>
                  <text x="125" y="35" fontSize="9" fill="#6366f1">3</text>
                  <text x="40" y="165" fontSize="11" fill="#10b981">y - 5 = 3(x - 2)</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Standard Form */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h5 className="font-semibold text-orange-700 mb-3">3. Standard Form</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-xl mb-2 text-center bg-white p-2 rounded">Ax + By = C</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>A, B, C</strong> = integers (পূর্ণসংখ্যা)</li>
                  <li><strong>A</strong> should be positive</li>
                  <li><strong>When to use:</strong> Integer coefficients প্রয়োজন হলে</li>
                  <li><strong>Advantage:</strong> X এবং Y-intercepts সহজেই বের করা যায়</li>
                </ul>
                <div className="mt-3 bg-white p-3 rounded">
                  <p className="text-sm font-semibold mb-1">Example: 2x + 3y = 12</p>
                  <p className="text-xs text-gray-600">• X-intercept: (6, 0) when y = 0</p>
                  <p className="text-xs text-gray-600">• Y-intercept: (0, 4) when x = 0</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded">
                <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto">
                  {/* Grid */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <g key={`grid3-${i}`}>
                      <line x1={20 + i * 25} y1="20" x2={20 + i * 25} y2="150" stroke="#f3f4f6" strokeWidth="1"/>
                      <line x1="20" y1={20 + i * 20} x2="170" y2={20 + i * 20} stroke="#f3f4f6" strokeWidth="1"/>
                    </g>
                  ))}
                  {/* Axes */}
                  <line x1="45" y1="20" x2="45" y2="150" stroke="#374151" strokeWidth="2"/>
                  <line x1="20" y1="110" x2="170" y2="110" stroke="#374151" strokeWidth="2"/>
                  {/* Line 2x + 3y = 12 */}
                  <line x1="170" y1="110" x2="45" y2="30" stroke="#f97316" strokeWidth="3"/>
                  {/* X-intercept */}
                  <circle cx="170" cy="110" r="5" fill="#ef4444"/>
                  <text x="150" y="125" fontSize="10" fill="#ef4444">(6, 0)</text>
                  {/* Y-intercept */}
                  <circle cx="45" cy="30" r="5" fill="#ef4444"/>
                  <text x="50" y="30" fontSize="10" fill="#ef4444">(0, 4)</text>
                  <text x="60" y="165" fontSize="11" fill="#f97316">2x + 3y = 12</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conversion Guide */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h5 className="font-semibold text-gray-700 mb-3">Converting Between Forms</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white p-3 rounded">
              <p className="font-semibold text-blue-600 mb-1">Slope-Intercept → Standard</p>
              <p className="font-mono text-xs mb-1">y = 2x + 3</p>
              <p className="text-gray-600">↓ Rearrange</p>
              <p className="font-mono text-xs">2x - y = -3</p>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="font-semibold text-green-600 mb-1">Point-Slope → Slope-Intercept</p>
              <p className="font-mono text-xs mb-1">y - 5 = 3(x - 2)</p>
              <p className="text-gray-600">↓ Expand</p>
              <p className="font-mono text-xs">y = 3x - 1</p>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="font-semibold text-orange-600 mb-1">Standard → Slope-Intercept</p>
              <p className="font-mono text-xs mb-1">2x + 3y = 12</p>
              <p className="text-gray-600">↓ Solve for y</p>
              <p className="font-mono text-xs">y = -⅔x + 4</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Special Lines & Advanced Concepts</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h5 className="font-semibold text-orange-700 mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Special Lines
            </h5>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="bg-white p-3 rounded">
                <p className="font-semibold">Horizontal Line</p>
                <p className="font-mono">y = c (slope = 0)</p>
                <p className="text-xs">যেমন: y = 3</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold">Vertical Line</p>
                <p className="font-mono">x = c (slope = undefined)</p>
                <p className="text-xs">যেমন: x = 2</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold">Line through Origin</p>
                <p className="font-mono">y = mx (b = 0)</p>
                <p className="text-xs">Origin (0,0) দিয়ে যায়</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-700 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Parallel & Perpendicular Lines
            </h5>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-purple-700">Parallel Lines (সমান্তরাল)</p>
                <p>• Same slope (একই ঢাল)</p>
                <p>• Never intersect (কখনো মিলিত হয় না)</p>
                <p className="font-mono text-xs mt-1">m₁ = m₂</p>
                <div className="mt-2">
                  <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto">
                    <line x1="10" y1="10" x2="10" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                    <line x1="10" y1="90" x2="110" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                    <line x1="20" y1="70" x2="90" y2="30" stroke="#8b5cf6" strokeWidth="3"/>
                    <line x1="30" y1="80" x2="100" y2="40" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="5,5"/>
                    <text x="92" y="35" fontSize="10" fill="#8b5cf6">m = 2</text>
                    <text x="102" y="45" fontSize="10" fill="#8b5cf6">m = 2</text>
                  </svg>
                </div>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-purple-700">Perpendicular Lines (লম্ব)</p>
                <p>• Negative reciprocal slopes</p>
                <p>• 90° angle এ intersect করে</p>
                <p className="font-mono text-xs mt-1">m₁ × m₂ = -1</p>
                <div className="mt-2">
                  <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto">
                    <line x1="10" y1="10" x2="10" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                    <line x1="10" y1="90" x2="110" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                    <line x1="20" y1="70" x2="90" y2="20" stroke="#8b5cf6" strokeWidth="3"/>
                    <line x1="20" y1="20" x2="90" y2="70" stroke="#f97316" strokeWidth="3"/>
                    <rect x="50" y="40" width="10" height="10" fill="none" stroke="#6b7280" strokeWidth="1"/>
                    <text x="92" y="25" fontSize="10" fill="#8b5cf6">m = 2</text>
                    <text x="92" y="75" fontSize="10" fill="#f97316">m = -1/2</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg">
            <h5 className="font-semibold text-teal-700 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Finding Line Equation
            </h5>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold">যা জানা দরকার:</p>
              <ul className="space-y-1 ml-4">
                <li>• 2 points → slope calculate করে equation</li>
                <li>• 1 point + slope → direct equation</li>
                <li>• Y-intercept + slope → y = mx + b</li>
              </ul>
              <div className="bg-white p-3 rounded mt-2">
                <p className="font-semibold text-teal-700">Example:</p>
                <p className="text-xs">Points (2,5) and (4,9) দেওয়া আছে</p>
                <p className="text-xs">Slope = (9-5)/(4-2) = 4/2 = 2</p>
                <p className="text-xs">Using point (2,5): y - 5 = 2(x - 2)</p>
                <p className="text-xs">Final: y = 2x + 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Interactive Line Relationships</h4>
        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setShowParallel(!showParallel)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showParallel ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Show Parallel Line
          </button>
          <button
            onClick={() => setShowPerpendicular(!showPerpendicular)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showPerpendicular ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Show Perpendicular Line
          </button>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={generateLineData().map(d => ({
              ...d,
              parallel: showParallel ? d.y + 3 : null,
              perpendicular: showPerpendicular ? (-1/slope * d.x + 2) : null
            }))}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" domain={[-5, 5]} />
            <YAxis domain={[-10, 10]} />
            <Tooltip formatter={(value) => value?.toFixed(2)} />
            
            <Line 
              name="Original Line"
              type="monotone" 
              dataKey="y" 
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
            
            {showParallel && (
              <Line
                name="Parallel Line"
                type="monotone"
                dataKey="parallel"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
            
            {showPerpendicular && (
              <Line
                name="Perpendicular Line"
                type="monotone"
                dataKey="perpendicular"
                stroke="#14b8a6"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded">
            <p className="font-semibold text-blue-700">Original Line</p>
            <p>y = {slope}x + {yIntercept}</p>
            <p>Slope: {slope}</p>
          </div>
          {showParallel && (
            <div className="bg-purple-50 p-3 rounded">
              <p className="font-semibold text-purple-700">Parallel Line</p>
              <p>y = {slope}x + {yIntercept + 3}</p>
              <p>Same slope: {slope}</p>
            </div>
          )}
          {showPerpendicular && (
            <div className="bg-teal-50 p-3 rounded">
              <p className="font-semibold text-teal-700">Perpendicular Line</p>
              <p>y = {(-1/slope).toFixed(2)}x + 2</p>
              <p>Slope: {(-1/slope).toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Linear vs Non-Linear</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">Linear Relationships</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Constant rate of change</li>
              <li>• Straight line graph</li>
              <li>• Can be written as y = mx + b</li>
              <li>• Example: Distance vs Time (constant speed)</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-700 mb-2">Non-Linear Relationships</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Variable rate of change</li>
              <li>• Curved line graph</li>
              <li>• Cannot be written as y = mx + b</li>
              <li>• Example: Area vs Radius (circular)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">Complete Guide to Slope (ঢাল)</h4>
        
        {/* What is Slope */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-blue-800 mb-4">What is Slope? (ঢাল কি?)</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 mb-3">
                Slope হলো একটি line এর steepness বা inclination এর পরিমাপ। এটি বলে দেয় line কতটা steep বা flat।
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h6 className="font-semibold text-gray-700 mb-2">Mathematical Definition:</h6>
                <p className="font-mono text-lg text-center mb-2">m = Δy/Δx = (y₂ - y₁)/(x₂ - x₁)</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• m = slope (ঢাল)</li>
                  <li>• Δy = vertical change (উল্লম্ব পরিবর্তন)</li>
                  <li>• Δx = horizontal change (অনুভূমিক পরিবর্তন)</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-3 text-center">Slope Interpretation</h6>
              <svg width="250" height="200" viewBox="0 0 250 200" className="mx-auto">
                {/* Background grid */}
                {[0,1,2,3,4,5,6,7,8].map(i => (
                  <g key={`interpret-grid-${i}`}>
                    <line x1={25 + i * 25} y1="20" x2={25 + i * 25} y2="180" stroke="#e5e7eb" strokeWidth="1"/>
                    <line x1="25" y1={20 + i * 20} x2="225" y2={20 + i * 20} stroke="#e5e7eb" strokeWidth="1"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="125" y1="20" x2="125" y2="180" stroke="#374151" strokeWidth="2"/>
                <line x1="25" y1="100" x2="225" y2="100" stroke="#374151" strokeWidth="2"/>
                {/* Multiple lines with different slopes */}
                <line x1="75" y1="150" x2="175" y2="50" stroke="#3b82f6" strokeWidth="3"/>
                <line x1="75" y1="125" x2="175" y2="75" stroke="#10b981" strokeWidth="3"/>
                <line x1="75" y1="100" x2="175" y2="100" stroke="#6b7280" strokeWidth="3"/>
                <line x1="75" y1="75" x2="175" y2="125" stroke="#ef4444" strokeWidth="3"/>
                {/* Labels */}
                <text x="180" y="55" fontSize="11" fill="#3b82f6">m = 2</text>
                <text x="180" y="80" fontSize="11" fill="#10b981">m = 1</text>
                <text x="180" y="105" fontSize="11" fill="#6b7280">m = 0</text>
                <text x="180" y="130" fontSize="11" fill="#ef4444">m = -1</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Types of Slopes */}
        <div className="mb-6">
          <h5 className="text-xl font-semibold text-gray-700 mb-4">Types of Slopes (ঢালের প্রকার)</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h6 className="font-semibold text-blue-700 mb-2">Positive Slope</h6>
              <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto mb-2">
                <line x1="10" y1="10" x2="10" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="10" y1="90" x2="110" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="20" y1="80" x2="100" y2="20" stroke="#3b82f6" strokeWidth="3"/>
                <path d="M 95 25 L 100 20 L 95 15" stroke="#3b82f6" strokeWidth="2" fill="none"/>
              </svg>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Line goes up (↗)</li>
                <li>• m &gt; 0</li>
                <li>• x বাড়লে y বাড়ে</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h6 className="font-semibold text-red-700 mb-2">Negative Slope</h6>
              <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto mb-2">
                <line x1="10" y1="10" x2="10" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="10" y1="90" x2="110" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="20" y1="20" x2="100" y2="80" stroke="#ef4444" strokeWidth="3"/>
                <path d="M 95 75 L 100 80 L 95 85" stroke="#ef4444" strokeWidth="2" fill="none"/>
              </svg>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Line goes down (↘)</li>
                <li>• m &lt; 0</li>
                <li>• x বাড়লে y কমে</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h6 className="font-semibold text-gray-700 mb-2">Zero Slope</h6>
              <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto mb-2">
                <line x1="10" y1="10" x2="10" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="10" y1="90" x2="110" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="20" y1="50" x2="100" y2="50" stroke="#6b7280" strokeWidth="3"/>
                <path d="M 95 50 L 100 50 L 95 45" stroke="#6b7280" strokeWidth="2" fill="none"/>
              </svg>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Horizontal line (→)</li>
                <li>• m = 0</li>
                <li>• y constant থাকে</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h6 className="font-semibold text-purple-700 mb-2">Undefined Slope</h6>
              <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto mb-2">
                <line x1="10" y1="10" x2="10" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="10" y1="90" x2="110" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
                <line x1="60" y1="20" x2="60" y2="80" stroke="#8b5cf6" strokeWidth="3"/>
                <path d="M 60 25 L 60 20 L 55 25" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
              </svg>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Vertical line (↑)</li>
                <li>• m = undefined</li>
                <li>• x constant থাকে</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slope Formula Visualization */}
        <div className="bg-yellow-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-yellow-800 mb-4">Slope Formula Breakdown</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h6 className="font-semibold text-gray-700 mb-2">The Formula:</h6>
                <div className="text-center">
                  <p className="font-mono text-2xl mb-2">m = (y₂ - y₁)/(x₂ - x₁)</p>
                  <p className="text-sm text-gray-600">or</p>
                  <p className="font-mono text-2xl mt-2">m = Rise/Run</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h6 className="font-semibold text-gray-700 mb-2">Remember:</h6>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Always subtract in the same order: (y₂ - y₁) and (x₂ - x₁)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Rise = Vertical change (উপর-নিচ)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Run = Horizontal change (বাম-ডান)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <svg width="280" height="220" viewBox="0 0 280 220" className="mx-auto">
                {/* Grid */}
                {[0,1,2,3,4,5,6,7,8,9].map(i => (
                  <g key={`formula-grid-${i}`}>
                    <line x1={20 + i * 26} y1="20" x2={20 + i * 26} y2="180" stroke="#f3f4f6" strokeWidth="1"/>
                    <line x1="20" y1={20 + i * 18} x2="254" y2={20 + i * 18} stroke="#f3f4f6" strokeWidth="1"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="20" y1="180" x2="254" y2="180" stroke="#374151" strokeWidth="2"/>
                <line x1="20" y1="20" x2="20" y2="180" stroke="#374151" strokeWidth="2"/>
                
                {/* Points and line */}
                <line x1="72" y1="144" x2="202" y2="56" stroke="#3b82f6" strokeWidth="3"/>
                <circle cx="72" cy="144" r="5" fill="#ef4444"/>
                <circle cx="202" cy="56" r="5" fill="#ef4444"/>
                
                {/* Rise and Run */}
                <line x1="72" y1="144" x2="202" y2="144" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3"/>
                <line x1="202" y1="144" x2="202" y2="56" stroke="#f97316" strokeWidth="2" strokeDasharray="5,3"/>
                
                {/* Annotations */}
                <text x="76" y="140" fontSize="12" fill="#374151">(x₁, y₁)</text>
                <text x="206" y="60" fontSize="12" fill="#374151">(x₂, y₂)</text>
                <text x="130" y="160" fontSize="14" fill="#10b981" fontWeight="bold">Run = x₂ - x₁</text>
                <text x="210" y="100" fontSize="14" fill="#f97316" fontWeight="bold">Rise</text>
                <text x="210" y="115" fontSize="14" fill="#f97316">= y₂ - y₁</text>
                
                {/* Formula at bottom */}
                <text x="70" y="205" fontSize="16" fill="#374151" fontWeight="bold">
                  Slope = Rise ÷ Run
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Real World Applications */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-green-800 mb-4">Real-World Applications of Slope</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-semibold text-green-700 mb-2">🏔️ Hill/Ramp Grade</h6>
              <p className="text-sm text-gray-600 mb-2">
                Road এর steepness measure করতে
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <p>10% grade = 0.1 slope</p>
                <p>মানে 100m যেতে 10m উপরে উঠে</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-semibold text-green-700 mb-2">📈 Rate of Change</h6>
              <p className="text-sm text-gray-600 mb-2">
                Business growth, speed, etc.
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <p>Sales growth rate</p>
                <p>Temperature change per hour</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-semibold text-green-700 mb-2">🏗️ Construction</h6>
              <p className="text-sm text-gray-600 mb-2">
                Roof pitch, staircase angle
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <p>Roof: Rise 4, Run 12</p>
                <p>Slope = 4/12 = 1/3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slope Relationships and Patterns */}
        <div className="bg-indigo-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-indigo-800 mb-4">Slope Relationships & Patterns</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-semibold text-indigo-700 mb-3">Parallel Lines (সমান্তরাল রেখা)</h6>
              <div className="text-center mb-3">
                <p className="font-mono text-lg bg-indigo-50 p-2 rounded inline-block">m₁ = m₂</p>
              </div>
              <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
                <line x1="20" y1="30" x2="180" y2="60" stroke="#6366f1" strokeWidth="3"/>
                <line x1="20" y1="90" x2="180" y2="120" stroke="#6366f1" strokeWidth="3"/>
                <text x="185" y="65" fontSize="11" fill="#6366f1">m = 0.2</text>
                <text x="185" y="125" fontSize="11" fill="#6366f1">m = 0.2</text>
              </svg>
              <p className="text-xs text-gray-600 text-center mt-2">
                Same slope = Never meet
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-semibold text-purple-700 mb-3">Perpendicular Lines (লম্ব রেখা)</h6>
              <div className="text-center mb-3">
                <p className="font-mono text-lg bg-purple-50 p-2 rounded inline-block">m₁ × m₂ = -1</p>
              </div>
              <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
                <line x1="40" y1="110" x2="160" y2="40" stroke="#8b5cf6" strokeWidth="3"/>
                <line x1="40" y1="40" x2="160" y2="110" stroke="#f97316" strokeWidth="3"/>
                <rect x="95" y="70" width="10" height="10" fill="none" stroke="#374151" strokeWidth="1"/>
                <text x="165" y="45" fontSize="11" fill="#8b5cf6">m = 2</text>
                <text x="165" y="115" fontSize="11" fill="#f97316">m = -½</text>
              </svg>
              <p className="text-xs text-gray-600 text-center mt-2">
                Negative reciprocals = 90° angle
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded-lg">
            <h6 className="font-semibold text-gray-700 mb-2">Quick Reference Table</h6>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">If slope is...</th>
                  <th className="text-left py-2">Parallel slope</th>
                  <th className="text-left py-2">Perpendicular slope</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">m = 2</td>
                  <td className="py-2">m = 2</td>
                  <td className="py-2">m = -½</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">m = ¾</td>
                  <td className="py-2">m = ¾</td>
                  <td className="py-2">m = -4/3</td>
                </tr>
                <tr>
                  <td className="py-2">m = -3</td>
                  <td className="py-2">m = -3</td>
                  <td className="py-2">m = ⅓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-red-50 p-6 rounded-lg">
          <h5 className="text-xl font-semibold text-red-800 mb-4">Common Mistakes to Avoid</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h6 className="font-semibold text-red-700 mb-2">❌ Wrong Order</h6>
              <p className="text-sm text-gray-600 mb-2">
                Subtracting in different orders
              </p>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs line-through text-red-600">m = (y₁ - y₂)/(x₂ - x₁)</p>
                <p className="text-xs text-green-600">✓ m = (y₂ - y₁)/(x₂ - x₁)</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h6 className="font-semibold text-red-700 mb-2">❌ Rise/Run Confusion</h6>
              <p className="text-sm text-gray-600 mb-2">
                Mixing up rise and run
              </p>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs line-through text-red-600">m = Run/Rise</p>
                <p className="text-xs text-green-600">✓ m = Rise/Run</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Visual Guide: Rise and Run</h4>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h5 className="font-semibold text-gray-700 mb-4 text-center">How to Calculate Slope</h5>
          <div className="flex justify-center">
            <svg width="300" height="200" viewBox="0 0 300 200" className="bg-white rounded-lg shadow-sm">
              {/* Grid */}
              {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                <g key={`grid-${i}`}>
                  <line x1={30 + i * 24} y1="20" x2={30 + i * 24} y2="170" stroke="#f3f4f6" strokeWidth="1"/>
                  <line x1="30" y1={20 + i * 15} x2="270" y2={20 + i * 15} stroke="#f3f4f6" strokeWidth="1"/>
                </g>
              ))}
              
              {/* Axes */}
              <line x1="30" y1="170" x2="270" y2="170" stroke="#374151" strokeWidth="2"/>
              <line x1="30" y1="20" x2="30" y2="170" stroke="#374151" strokeWidth="2"/>
              
              {/* Line */}
              <line x1="78" y1="125" x2="222" y2="65" stroke="#3b82f6" strokeWidth="3"/>
              
              {/* Points */}
              <circle cx="78" cy="125" r="5" fill="#3b82f6"/>
              <circle cx="222" cy="65" r="5" fill="#3b82f6"/>
              
              {/* Rise and Run illustration */}
              <line x1="78" y1="125" x2="222" y2="125" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3"/>
              <line x1="222" y1="125" x2="222" y2="65" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3"/>
              
              {/* Labels */}
              <text x="85" y="120" fontSize="12" fill="#374151">(x₁, y₁)</text>
              <text x="225" y="70" fontSize="12" fill="#374151">(x₂, y₂)</text>
              
              <text x="145" y="140" fontSize="14" fill="#10b981" fontWeight="bold">Run = x₂ - x₁</text>
              <text x="230" y="95" fontSize="14" fill="#ef4444" fontWeight="bold">Rise</text>
              <text x="230" y="110" fontSize="14" fill="#ef4444">= y₂ - y₁</text>
              
              {/* Formula */}
              <text x="75" y="190" fontSize="16" fill="#374151" fontWeight="bold">
                Slope = Rise ÷ Run
              </text>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          How to Draw a Line: y = mx + b
        </h4>
        
        {/* Step by Step Guide */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-indigo-800 mb-4">
            Step-by-Step Guide to Drawing Lines
          </h5>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                <h6 className="text-lg font-semibold text-gray-700">Start with the Y-Intercept (b)</h6>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Y-intercept হলো যেখানে line Y-axis কে ছেদ করে (x = 0 হলে)
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-mono text-sm">Example: y = 2x + 3</p>
                    <p className="text-sm mt-1">• b = 3</p>
                    <p className="text-sm">• Start point: (0, 3)</p>
                  </div>
                </div>
                <svg width="200" height="150" viewBox="0 0 200 150" className="bg-gray-50 rounded">
                  {/* Grid */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <g key={`step1-grid-${i}`}>
                      <line x1={20 + i * 25} y1="20" x2={20 + i * 25} y2="130" stroke="#e5e7eb" strokeWidth="1"/>
                      <line x1="20" y1={20 + i * 20} x2="170" y2={20 + i * 20} stroke="#e5e7eb" strokeWidth="1"/>
                    </g>
                  ))}
                  {/* Axes */}
                  <line x1="95" y1="20" x2="95" y2="130" stroke="#374151" strokeWidth="2"/>
                  <line x1="20" y1="80" x2="170" y2="80" stroke="#374151" strokeWidth="2"/>
                  {/* Y-intercept point */}
                  <circle cx="95" cy="60" r="6" fill="#ef4444"/>
                  <text x="100" y="60" fontSize="12" fill="#ef4444" fontWeight="bold">(0, 3)</text>
                  {/* Axes labels */}
                  <text x="160" y="95" fontSize="10" fill="#6b7280">x</text>
                  <text x="80" y="30" fontSize="10" fill="#6b7280">y</text>
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                <h6 className="text-lg font-semibold text-gray-700">Use the Slope (m) to Find Next Point</h6>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Slope = Rise/Run বলে দেয় কিভাবে পরবর্তী point খুঁজতে হবে
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-mono text-sm">m = 2 = 2/1</p>
                    <p className="text-sm mt-1">• Rise = 2 (উপরে)</p>
                    <p className="text-sm">• Run = 1 (ডানে)</p>
                    <p className="text-sm mt-2">From (0,3) → (1,5)</p>
                  </div>
                </div>
                <svg width="200" height="150" viewBox="0 0 200 150" className="bg-gray-50 rounded">
                  {/* Grid */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <g key={`step2-grid-${i}`}>
                      <line x1={20 + i * 25} y1="20" x2={20 + i * 25} y2="130" stroke="#e5e7eb" strokeWidth="1"/>
                      <line x1="20" y1={20 + i * 20} x2="170" y2={20 + i * 20} stroke="#e5e7eb" strokeWidth="1"/>
                    </g>
                  ))}
                  {/* Axes */}
                  <line x1="95" y1="20" x2="95" y2="130" stroke="#374151" strokeWidth="2"/>
                  <line x1="20" y1="80" x2="170" y2="80" stroke="#374151" strokeWidth="2"/>
                  {/* Points */}
                  <circle cx="95" cy="60" r="5" fill="#ef4444"/>
                  <circle cx="120" cy="20" r="5" fill="#3b82f6"/>
                  {/* Rise and Run */}
                  <line x1="95" y1="60" x2="120" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3"/>
                  <line x1="120" y1="60" x2="120" y2="20" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3"/>
                  {/* Labels */}
                  <text x="100" y="58" fontSize="12" fill="#ef4444">(0,3)</text>
                  <text x="125" y="25" fontSize="12" fill="#3b82f6">(1,5)</text>
                  <text x="105" y="73" fontSize="10" fill="#10b981">Run=1</text>
                  <text x="125" y="40" fontSize="10" fill="#f97316">Rise=2</text>
                </svg>
              </div>
              
              {/* Detailed Explanation */}
              <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
                <h6 className="font-semibold text-indigo-700 mb-3">How to Find the Next Point - Detailed Method</h6>
                
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-sm mb-2">Method 1: Using Rise/Run</p>
                    <div className="text-sm space-y-1">
                      <p>Starting point: (0, 3)</p>
                      <p>Slope m = 2 = 2/1 (Rise/Run)</p>
                      <p className="mt-2"><strong>Steps:</strong></p>
                      <ol className="ml-4 space-y-1">
                        <li>1. From x=0, move right by Run (1 unit) → x = 0 + 1 = 1</li>
                        <li>2. From y=3, move up by Rise (2 units) → y = 3 + 2 = 5</li>
                        <li>3. New point: (1, 5) ✓</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-sm mb-2">Method 2: Using the Equation</p>
                    <div className="text-sm space-y-1">
                      <p>Equation: y = 2x + 3</p>
                      <p>To find next point, choose any x value:</p>
                      <p className="mt-2"><strong>Example: x = 1</strong></p>
                      <p className="ml-4">y = 2(1) + 3 = 2 + 3 = 5</p>
                      <p className="ml-4">Point: (1, 5) ✓</p>
                      <p className="mt-2"><strong>Example: x = 2</strong></p>
                      <p className="ml-4">y = 2(2) + 3 = 4 + 3 = 7</p>
                      <p className="ml-4">Point: (2, 7) ✓</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-sm mb-2">For Different Slopes:</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="font-mono font-bold">m = 3/2</p>
                        <p>Rise 3, Run 2</p>
                        <p>Right 2, Up 3</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="font-mono font-bold">m = -1/3</p>
                        <p>Rise -1, Run 3</p>
                        <p>Right 3, Down 1</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="font-mono font-bold">m = 4</p>
                        <p>Rise 4, Run 1</p>
                        <p>Right 1, Up 4</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="font-mono font-bold">m = -2</p>
                        <p>Rise -2, Run 1</p>
                        <p>Right 1, Down 2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                <h6 className="text-lg font-semibold text-gray-700">Connect the Points</h6>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    দুটি point দিয়ে একটি straight line আঁকুন এবং extend করুন
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm">✓ Line extends infinitely</p>
                    <p className="text-sm">✓ All points satisfy y = 2x + 3</p>
                    <p className="text-sm mt-2">Check: x = 2</p>
                    <p className="text-sm">y = 2(2) + 3 = 7 ✓</p>
                  </div>
                </div>
                <svg width="200" height="150" viewBox="0 0 200 150" className="bg-gray-50 rounded">
                  {/* Grid */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <g key={`step3-grid-${i}`}>
                      <line x1={20 + i * 25} y1="20" x2={20 + i * 25} y2="130" stroke="#e5e7eb" strokeWidth="1"/>
                      <line x1="20" y1={20 + i * 20} x2="170" y2={20 + i * 20} stroke="#e5e7eb" strokeWidth="1"/>
                    </g>
                  ))}
                  {/* Axes */}
                  <line x1="95" y1="20" x2="95" y2="130" stroke="#374151" strokeWidth="2"/>
                  <line x1="20" y1="80" x2="170" y2="80" stroke="#374151" strokeWidth="2"/>
                  {/* Line */}
                  <line x1="45" y1="120" x2="170" y2="-5" stroke="#6366f1" strokeWidth="3"/>
                  {/* Points */}
                  <circle cx="95" cy="60" r="4" fill="#ef4444"/>
                  <circle cx="120" cy="20" r="4" fill="#3b82f6"/>
                  <circle cx="145" cy="-20" r="4" fill="#3b82f6" opacity="0"/>
                  {/* Labels */}
                  <text x="75" y="135" fontSize="12" fill="#6366f1" fontWeight="bold">y = 2x + 3</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Next Point Examples */}
        <div className="bg-teal-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-teal-800 mb-4">
            Finding Multiple Points: Complete Example
          </h5>
          
          <div className="bg-white p-4 rounded-lg mb-4">
            <h6 className="font-semibold text-gray-700 mb-3">Example: y = 3x - 1</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-3 text-sm">
                  <div className="bg-teal-50 p-3 rounded">
                    <p><strong>Given:</strong> y = 3x - 1</p>
                    <p>Slope (m) = 3 = 3/1</p>
                    <p>Y-intercept (b) = -1</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-semibold text-teal-700 mb-2">Step-by-step points:</p>
                    <div className="space-y-1">
                      <p><strong>Start:</strong> (0, -1) [y-intercept]</p>
                      <p><strong>Point 1:</strong> Right 1, Up 3 → (1, 2)</p>
                      <p><strong>Point 2:</strong> Right 1, Up 3 → (2, 5)</p>
                      <p><strong>Point 3:</strong> Right 1, Up 3 → (3, 8)</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-700 mb-2">Verification:</p>
                    <div className="space-y-1 text-xs">
                      <p>x=1: y = 3(1) - 1 = 2 ✓</p>
                      <p>x=2: y = 3(2) - 1 = 5 ✓</p>
                      <p>x=3: y = 3(3) - 1 = 8 ✓</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <svg width="250" height="200" viewBox="0 0 250 200" className="bg-gray-50 rounded">
                {/* Grid */}
                {[0,1,2,3,4,5,6,7,8].map(i => (
                  <g key={`multi-grid-${i}`}>
                    <line x1={30 + i * 25} y1="20" x2={30 + i * 25} y2="180" stroke="#e5e7eb" strokeWidth="1"/>
                    <line x1="30" y1={20 + i * 20} x2="230" y2={20 + i * 20} stroke="#e5e7eb" strokeWidth="1"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="30" y1="20" x2="30" y2="180" stroke="#374151" strokeWidth="2"/>
                <line x1="30" y1="120" x2="230" y2="120" stroke="#374151" strokeWidth="2"/>
                
                {/* Line y = 3x - 1 */}
                <line x1="30" y1="140" x2="180" y2="20" stroke="#0d9488" strokeWidth="3"/>
                
                {/* Points */}
                <circle cx="30" cy="140" r="5" fill="#ef4444"/>
                <circle cx="55" cy="80" r="5" fill="#3b82f6"/>
                <circle cx="80" cy="20" r="5" fill="#3b82f6"/>
                <circle cx="105" cy="-40" r="5" fill="#3b82f6" opacity="0"/>
                
                {/* Rise and Run indicators */}
                <line x1="30" y1="140" x2="55" y2="140" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3"/>
                <line x1="55" y1="140" x2="55" y2="80" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3"/>
                
                <line x1="55" y1="80" x2="80" y2="80" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3"/>
                <line x1="80" y1="80" x2="80" y2="20" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3"/>
                
                {/* Labels */}
                <text x="35" y="145" fontSize="11" fill="#ef4444">(0,-1)</text>
                <text x="60" y="85" fontSize="11" fill="#3b82f6">(1,2)</text>
                <text x="85" y="25" fontSize="11" fill="#3b82f6">(2,5)</text>
                
                <text x="40" y="155" fontSize="9" fill="#10b981">+1</text>
                <text x="60" y="110" fontSize="9" fill="#f97316">+3</text>
                <text x="65" y="95" fontSize="9" fill="#10b981">+1</text>
                <text x="85" y="50" fontSize="9" fill="#f97316">+3</text>
                
                <text x="120" y="195" fontSize="12" fill="#0d9488" fontWeight="bold">y = 3x - 1</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Different Slope Examples */}
        <div className="bg-yellow-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-yellow-800 mb-4">
            Examples with Different Slopes & Intercepts
          </h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example 1: Positive slope, positive intercept */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-mono font-bold text-center mb-2">y = x + 2</h6>
              <svg width="180" height="140" viewBox="0 0 180 140" className="mx-auto">
                {/* Grid */}
                {[0,1,2,3,4,5].map(i => (
                  <g key={`ex1-grid-${i}`}>
                    <line x1={20 + i * 28} y1="20" x2={20 + i * 28} y2="120" stroke="#f3f4f6" strokeWidth="1"/>
                    <line x1="20" y1={20 + i * 20} x2="160" y2={20 + i * 20} stroke="#f3f4f6" strokeWidth="1"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="90" y1="20" x2="90" y2="120" stroke="#374151" strokeWidth="2"/>
                <line x1="20" y1="70" x2="160" y2="70" stroke="#374151" strokeWidth="2"/>
                {/* Line y = x + 2 */}
                <line x1="40" y1="100" x2="140" y2="0" stroke="#3b82f6" strokeWidth="3"/>
                {/* Key points */}
                <circle cx="90" cy="50" r="3" fill="#ef4444"/>
                <circle cx="118" cy="22" r="3" fill="#10b981"/>
                <text x="72" y="48" fontSize="9" fill="#ef4444">(0,2)</text>
                <text x="122" y="25" fontSize="9" fill="#10b981">(1,3)</text>
              </svg>
              <div className="mt-2 text-xs space-y-1">
                <p>• m = 1 (45° angle)</p>
                <p>• b = 2 (starts at y=2)</p>
                <p>• Rise = Run</p>
              </div>
            </div>

            {/* Example 2: Negative slope */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-mono font-bold text-center mb-2">y = -2x + 4</h6>
              <svg width="180" height="140" viewBox="0 0 180 140" className="mx-auto">
                {/* Grid */}
                {[0,1,2,3,4,5].map(i => (
                  <g key={`ex2-grid-${i}`}>
                    <line x1={20 + i * 28} y1="20" x2={20 + i * 28} y2="120" stroke="#f3f4f6" strokeWidth="1"/>
                    <line x1="20" y1={20 + i * 20} x2="160" y2={20 + i * 20} stroke="#f3f4f6" strokeWidth="1"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="90" y1="20" x2="90" y2="120" stroke="#374151" strokeWidth="2"/>
                <line x1="20" y1="70" x2="160" y2="70" stroke="#374151" strokeWidth="2"/>
                {/* Line y = -2x + 4 */}
                <line x1="35" y1="0" x2="145" y2="110" stroke="#ef4444" strokeWidth="3"/>
                {/* Key points */}
                <circle cx="90" cy="30" r="3" fill="#ef4444"/>
                <circle cx="118" cy="86" r="3" fill="#f97316"/>
                <text x="72" y="28" fontSize="9" fill="#ef4444">(0,4)</text>
                <text x="122" y="90" fontSize="9" fill="#f97316">(1,2)</text>
              </svg>
              <div className="mt-2 text-xs space-y-1">
                <p>• m = -2 (steep down)</p>
                <p>• b = 4 (starts at y=4)</p>
                <p>• Falls 2 for each 1 right</p>
              </div>
            </div>

            {/* Example 3: Fractional slope */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h6 className="font-mono font-bold text-center mb-2">y = ½x - 1</h6>
              <svg width="180" height="140" viewBox="0 0 180 140" className="mx-auto">
                {/* Grid */}
                {[0,1,2,3,4,5].map(i => (
                  <g key={`ex3-grid-${i}`}>
                    <line x1={20 + i * 28} y1="20" x2={20 + i * 28} y2="120" stroke="#f3f4f6" strokeWidth="1"/>
                    <line x1="20" y1={20 + i * 20} x2="160" y2={20 + i * 20} stroke="#f3f4f6" strokeWidth="1"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="90" y1="20" x2="90" y2="120" stroke="#374151" strokeWidth="2"/>
                <line x1="20" y1="70" x2="160" y2="70" stroke="#374151" strokeWidth="2"/>
                {/* Line y = 0.5x - 1 */}
                <line x1="50" y1="100" x2="160" y2="45" stroke="#10b981" strokeWidth="3"/>
                {/* Key points */}
                <circle cx="90" cy="90" r="3" fill="#ef4444"/>
                <circle cx="146" cy="62" r="3" fill="#10b981"/>
                <text x="65" y="95" fontSize="9" fill="#ef4444">(0,-1)</text>
                <text x="120" y="58" fontSize="9" fill="#10b981">(2,0)</text>
              </svg>
              <div className="mt-2 text-xs space-y-1">
                <p>• m = ½ (gentle slope)</p>
                <p>• b = -1 (below x-axis)</p>
                <p>• Rise 1 for Run 2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-green-800 mb-4">
            Common Patterns to Remember
          </h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h6 className="font-semibold text-green-700 mb-2">Positive vs Negative Slopes</h6>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>y = 3x + 2</span>
                  <span className="text-blue-600">↗ Goes up</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>y = -3x + 2</span>
                  <span className="text-red-600">↘ Goes down</span>
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  Negative sign flips the direction
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h6 className="font-semibold text-green-700 mb-2">Slope Size Effects</h6>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>y = 5x</span>
                  <span className="text-purple-600">Very steep</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>y = 0.2x</span>
                  <span className="text-blue-600">Very gentle</span>
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  Larger |m| = Steeper line
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h6 className="font-semibold text-green-700 mb-2">Y-Intercept Effects</h6>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>y = 2x + 5</span>
                  <span className="text-green-600">Starts high</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>y = 2x - 3</span>
                  <span className="text-orange-600">Starts low</span>
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  b shifts line up/down
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h6 className="font-semibold text-green-700 mb-2">Special Cases</h6>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>y = x</span>
                  <span className="text-indigo-600">45° line</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>y = 5</span>
                  <span className="text-gray-600">Horizontal</span>
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  y = mx + 0 passes through origin
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Tips */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h5 className="text-xl font-semibold text-purple-800 mb-4">
            Practice Tips for Drawing Lines
          </h5>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center mb-2">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">1️⃣</span>
                </div>
              </div>
              <h6 className="font-semibold text-center mb-2">Always Start at b</h6>
              <p className="text-xs text-gray-600 text-center">
                Mark the y-intercept first at point (0, b)
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center mb-2">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">2️⃣</span>
                </div>
              </div>
              <h6 className="font-semibold text-center mb-2">Use Rise/Run</h6>
              <p className="text-xs text-gray-600 text-center">
                From y-intercept, go up/down (rise) then right (run)
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center mb-2">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">3️⃣</span>
                </div>
              </div>
              <h6 className="font-semibold text-center mb-2">Check Your Work</h6>
              <p className="text-xs text-gray-600 text-center">
                Pick any x, calculate y, verify point is on line
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">How to Use Interactive Features</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-700 mb-2">🎯 Line Visualizer</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">1.</span>
                <span>Slope slider adjust করে দেখুন line কিভাবে rotate করে</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">2.</span>
                <span>Y-intercept change করে line উপর-নিচ করুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">3.</span>
                <span>Positive/negative slope এর difference observe করুন</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">📐 Slope Calculator</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">1.</span>
                <span>দুটি points input করুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">2.</span>
                <span>Automatic slope calculation দেখুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">3.</span>
                <span>Formula breakdown understand করুন</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-700 mb-2">🔄 Parallel & Perpendicular</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Toggle করে parallel line দেখুন (same slope)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Perpendicular line observe করুন (negative reciprocal)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Real-time relationship changes track করুন</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h5 className="font-semibold text-orange-700 mb-2">💡 Learning Tips</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span>প্রথমে theory পড়ুন, তারপর interact করুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span>Different values try করে pattern খুঁজুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span>Quiz নিয়ে understanding test করুন</span>
              </li>
            </ul>
          </div>
        </div>
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
                <p className="text-green-600">Perfect! You're ready for Linear Regression!</p>
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

export default GraphsAndLines;