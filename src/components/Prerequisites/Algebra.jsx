import React, { useState, useEffect } from 'react';
import { Scale, Calculator, RefreshCw, Zap, Brain, Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Algebra = ({ onComplete }) => {
  const [variableValue, setVariableValue] = useState(5);
  const [equation, setEquation] = useState({ a: 2, b: 3, c: 13 }); // ax + b = c
  const [userSolution, setUserSolution] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [substitutionX, setSubstitutionX] = useState(3);
  const [customExpression, setCustomExpression] = useState({ a: 3, b: 2 });
  const [showQuiz, setShowQuiz] = useState(false);
  const [balanceAnimation, setBalanceAnimation] = useState(false);
  const [currentBalanceStep, setCurrentBalanceStep] = useState(0);
  const [expressionBuilder, setExpressionBuilder] = useState(false);
  const [terms, setTerms] = useState([]);
  const [inequalityMode, setInequalityMode] = useState(false);
  const [inequalityType, setInequalityType] = useState('<');
  const [systemOfEquations, setSystemOfEquations] = useState(false);
  const [equation1, setEquation1] = useState({ a: 2, b: 3, c: 13 });
  const [equation2, setEquation2] = useState({ a: 1, b: -1, c: 1 });

  const solveEquation = () => {
    // ax + b = c => x = (c - b) / a
    return ((equation.c - equation.b) / equation.a).toFixed(2);
  };

  const evaluateExpression = (x, a, b) => {
    return a * x + b;
  };

  const generateNewEquation = () => {
    setEquation({
      a: Math.floor(Math.random() * 5) + 1,
      b: Math.floor(Math.random() * 10) + 1,
      c: Math.floor(Math.random() * 20) + 10
    });
    setShowSolution(false);
    setUserSolution('');
  };

  const checkUserSolution = () => {
    const correctSolution = parseFloat(solveEquation());
    const userAnswer = parseFloat(userSolution);
    return Math.abs(correctSolution - userAnswer) < 0.01;
  };

  useEffect(() => {
    if (balanceAnimation && currentBalanceStep < 5) {
      const timer = setTimeout(() => {
        setCurrentBalanceStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentBalanceStep >= 5) {
      setBalanceAnimation(false);
    }
  }, [balanceAnimation, currentBalanceStep]);
  
  const balanceSteps = [
    {
      step: 1,
      equation: `${equation.a}x + ${equation.b} = ${equation.c}`,
      description: 'Original equation',
      bengali: 'মূল সমীকরণ'
    },
    {
      step: 2,
      equation: `${equation.a}x = ${equation.c} - ${equation.b}`,
      description: `Subtract ${equation.b} from both sides`,
      bengali: `উভয় পাশ থেকে ${equation.b} বিয়োগ করুন`
    },
    {
      step: 3,
      equation: `${equation.a}x = ${equation.c - equation.b}`,
      description: 'Simplify',
      bengali: 'সরলীকরণ'
    },
    {
      step: 4,
      equation: `x = ${equation.c - equation.b}/${equation.a}`,
      description: `Divide both sides by ${equation.a}`,
      bengali: `উভয় পাশকে ${equation.a} দিয়ে ভাগ করুন`
    },
    {
      step: 5,
      equation: `x = ${solveEquation()}`,
      description: 'Final answer',
      bengali: 'চূড়ান্ত উত্তর'
    }
  ];

  const quizQuestions = [
    {
      question: "3x + 6 = 15 হলে, x এর মান কত?",
      options: ['2', '3', '4', '5'],
      correct: 1
    },
    {
      question: "Variable (চলক) কি?",
      options: [
        'একটি নির্দিষ্ট সংখ্যা',
        'একটি অজানা মান যা পরিবর্তন হতে পারে',
        'শুধুমাত্র x',
        'একটি operation'
      ],
      correct: 1
    },
    {
      question: "2y - 4 = 10 সমীকরণে, y = 7 হলে equation balanced?",
      options: ['হ্যাঁ', 'না', 'জানা সম্ভব নয়', 'প্রশ্ন ভুল'],
      correct: 0
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
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Algebra Fundamentals (বীজগণিত মৌলিক)</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Variable Explorer</h4>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-700 mb-2">
              Variable হলো একটি symbol (সাধারণত x, y, z) যা কোন unknown value represent করে
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variable x = {variableValue}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              value={variableValue}
              onChange={(e) => setVariableValue(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-10</span>
              <span>0</span>
              <span>10</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Expression: 2x + 3</p>
              <p className="text-lg font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                = 2({variableValue}) + 3 = {2 * variableValue + 3}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Expression: x² − 5</p>
              <p className="text-lg font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                = {variableValue}<sup>2</sup> − 5 = {variableValue * variableValue - 5}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Expression: 3x − x</p>
              <p className="text-lg font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                = 3({variableValue}) − {variableValue} = {3 * variableValue - variableValue}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Equation Balancer</h4>
          
          <div className="text-center mb-6">
            <Scale className="w-16 h-16 mx-auto text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">
              Equation এর দুই পাশ সমান রাখতে হবে!
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <p className="text-lg text-center mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              {equation.a}x + {equation.b} = {equation.c}
            </p>
            <p className="text-sm text-gray-600 text-center">
              Solve for x (x এর মান বের করুন)
            </p>
          </div>
          
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              value={userSolution}
              onChange={(e) => setUserSolution(e.target.value)}
              placeholder="Enter your answer"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {showSolution ? 'Hide' : 'Show'} Solution
            </button>
          </div>
          
          {userSolution && (
            <div className={`p-3 rounded-lg mb-4 ${
              checkUserSolution() 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}>
              {checkUserSolution() ? '✓ Correct!' : '✗ Try again!'}
            </div>
          )}
          
          <button
            onClick={generateNewEquation}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            New Equation
          </button>
        </div>
      </div>
      
      {showSolution && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Step-by-Step Solution</h4>
          <div className="space-y-3">
            {balanceSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>{step.equation}</p>
                  <p className="text-sm text-gray-600">
                    {step.description} ({step.bengali})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Substitution Practice</h4>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Expression: {customExpression.a}x + {customExpression.b}
            </p>
            <div className="flex gap-2 items-center">
              <span>a =</span>
              <input
                type="number"
                value={customExpression.a}
                onChange={(e) => setCustomExpression({...customExpression, a: parseInt(e.target.value) || 0})}
                className="w-16 px-2 py-1 border rounded"
              />
              <span>b =</span>
              <input
                type="number"
                value={customExpression.b}
                onChange={(e) => setCustomExpression({...customExpression, b: parseInt(e.target.value) || 0})}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Substitute x = {substitutionX}
            </label>
            <input
              type="range"
              min="-5"
              max="10"
              value={substitutionX}
              onChange={(e) => setSubstitutionX(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Calculation:</p>
            <p className="font-mono">
              {customExpression.a}({substitutionX}) + {customExpression.b}
            </p>
            <p className="font-mono">
              = {customExpression.a * substitutionX} + {customExpression.b}
            </p>
            <p className="font-mono text-lg font-bold">
              = {evaluateExpression(substitutionX, customExpression.a, customExpression.b)}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Key Concepts</h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-semibold text-blue-700">Variables (চলক)</h5>
              <p className="text-sm text-gray-700">
                Unknown values যা letters দিয়ে represent করা হয় (x, y, z)
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-semibold text-green-700">Constants (ধ্রুবক)</h5>
              <p className="text-sm text-gray-700">
                Fixed values যা পরিবর্তন হয় না (2, 5, -3)
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-semibold text-yellow-700">Equation Balance</h5>
              <p className="text-sm text-gray-700">
                উভয় পাশে একই operation করলে equation balanced থাকে
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-semibold text-purple-700">Substitution</h5>
              <p className="text-sm text-gray-700">
                Variable এর জায়গায় নির্দিষ্ট value বসানো
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Advanced Features</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setBalanceAnimation(!balanceAnimation)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              balanceAnimation ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Animate</span>
          </button>
          <button
            onClick={() => setExpressionBuilder(!expressionBuilder)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              expressionBuilder ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Brain className="w-5 h-5" />
            <span className="text-sm">Builder</span>
          </button>
          <button
            onClick={() => setInequalityMode(!inequalityMode)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              inequalityMode ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-sm">Inequality</span>
          </button>
          <button
            onClick={() => setSystemOfEquations(!systemOfEquations)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              systemOfEquations ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-sm">System</span>
          </button>
        </div>
      </div>
      
      {expressionBuilder && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Expression Builder</h4>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">
              Drag and combine terms to build algebraic expressions!
            </p>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['x', '2x', '3x', '+5', '-3', 'x²'].map((term) => (
                <button
                  key={term}
                  onClick={() => setTerms([...terms, term])}
                  className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-center transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-3">
              <p className="text-sm text-gray-600 mb-2">Your Expression:</p>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {terms.map((term, i) => (
                  <span
                    key={i}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-500"
                    onClick={() => setTerms(terms.filter((_, index) => index !== i))}
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setTerms([])}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  // Simplify expression logic here
                  alert('Expression: ' + terms.join(' '));
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Simplify
              </button>
            </div>
          </div>
        </div>
      )}
      
      {inequalityMode && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Inequalities</h4>
          
          <div className="mb-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="font-mono text-lg">{equation.a}x + {equation.b}</span>
              <select
                value={inequalityType}
                onChange={(e) => setInequalityType(e.target.value)}
                className="px-3 py-2 border rounded-lg text-lg"
              >
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="≤">≤</option>
                <option value="≥">≥</option>
              </select>
              <span className="font-mono text-lg">{equation.c}</span>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-orange-700 mb-2">Solution:</p>
              <p className="font-mono">
                x {inequalityType} {((equation.c - equation.b) / equation.a).toFixed(2)}
              </p>
            </div>
            
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={100}>
                <LineChart 
                  data={Array.from({ length: 21 }, (_, i) => ({ x: i - 10 }))}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <XAxis dataKey="x" />
                  <Line
                    type="monotone"
                    dataKey="x"
                    stroke="none"
                    dot={(props) => {
                      const satisfies = inequalityType === '<' 
                        ? props.payload.x < (equation.c - equation.b) / equation.a
                        : inequalityType === '>'
                        ? props.payload.x > (equation.c - equation.b) / equation.a
                        : inequalityType === '≤'
                        ? props.payload.x <= (equation.c - equation.b) / equation.a
                        : props.payload.x >= (equation.c - equation.b) / equation.a;
                      
                      return (
                        <circle
                          cx={props.cx}
                          cy={50}
                          r={4}
                          fill={satisfies ? '#f97316' : '#e5e7eb'}
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-gray-600 mt-1">
                Orange points satisfy the inequality
              </p>
            </div>
          </div>
        </div>
      )}
      
      {systemOfEquations && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">System of Equations</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-mono text-center mb-2">
                {equation1.a}x + {equation1.b}y = {equation1.c}
              </p>
              <p className="font-mono text-center">
                {equation2.a}x + {equation2.b}y = {equation2.c}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-green-700 mb-2">Solution:</p>
              <p className="font-mono text-sm">
                x = {(() => {
                  const det = equation1.a * equation2.b - equation2.a * equation1.b;
                  const x = (equation1.c * equation2.b - equation2.c * equation1.b) / det;
                  return x.toFixed(2);
                })()}
              </p>
              <p className="font-mono text-sm">
                y = {(() => {
                  const det = equation1.a * equation2.b - equation2.a * equation1.b;
                  const y = (equation1.a * equation2.c - equation2.a * equation1.c) / det;
                  return y.toFixed(2);
                })()}
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>পদ্ধতি:</strong> Elimination method ব্যবহার করে একটি variable eliminate করে solve করা হয়।
            </p>
          </div>
        </div>
      )}
      
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
                <p className="text-green-600">Excellent! You've mastered algebra basics!</p>
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

export default Algebra;