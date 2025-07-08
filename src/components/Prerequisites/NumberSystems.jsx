import React, { useState } from 'react';
import { Calculator, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

const NumberSystems = ({ onComplete }) => {
  const [selectedNumber, setSelectedNumber] = useState(5);
  const [fractionNumerator, setFractionNumerator] = useState(3);
  const [fractionDenominator, setFractionDenominator] = useState(4);
  const [decimalValue, setDecimalValue] = useState('0.75');
  const [conversionMode, setConversionMode] = useState('fraction-to-decimal');
  const [showQuiz, setShowQuiz] = useState(false);
  const [draggedNumbers, setDraggedNumbers] = useState({
    natural: [],
    integers: [],
    rational: [],
    real: []
  });

  const numberExamples = [
    { value: 5, label: '5' },
    { value: -3, label: '-3' },
    { value: 0, label: '0' },
    { value: 2.5, label: '2.5' },
    { value: -1.75, label: '-1.75' },
    { value: Math.PI, label: 'π' },
    { value: Math.sqrt(2), label: '√2' },
    { value: 0.333, label: '1/3' }
  ];

  const convertFractionToDecimal = (num, den) => {
    return (num / den).toFixed(4);
  };

  const convertDecimalToFraction = (decimal) => {
    const tolerance = 1.0E-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = parseFloat(decimal);
    
    do {
      let a = Math.floor(b);
      let aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);
    
    return { numerator: h1, denominator: k1 };
  };

  const isNaturalNumber = (n) => n > 0 && Number.isInteger(n);
  const isInteger = (n) => Number.isInteger(n);
  const isRational = (n) => !isNaN(n) && isFinite(n);
  const isReal = (n) => !isNaN(n);

  const checkNumberType = (num) => {
    return {
      natural: isNaturalNumber(num),
      integer: isInteger(num),
      rational: isRational(num),
      real: isReal(num)
    };
  };

  const quizQuestions = [
    {
      question: "-5 কোন ধরনের সংখ্যা?",
      options: ['Natural Number', 'Integer', 'Positive Number', 'Fraction'],
      correct: 1
    },
    {
      question: "3/4 কে decimal এ convert করলে কত হবে?",
      options: ['0.25', '0.5', '0.75', '1.33'],
      correct: 2
    },
    {
      question: "কোনটি Natural Number নয়?",
      options: ['1', '2', '0', '10'],
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

  const numberTypes = checkNumberType(selectedNumber);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Number Systems (সংখ্যা পদ্ধতি)</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Interactive Number Explorer</h4>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select a Number: {selectedNumber}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.5"
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-10</span>
              <span>0</span>
              <span>10</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border-2 transition-all ${
              numberTypes.natural ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Natural Number (স্বাভাবিক সংখ্যা)</span>
                {numberTypes.natural ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">1, 2, 3, 4, 5, ...</p>
            </div>
            
            <div className={`p-3 rounded-lg border-2 transition-all ${
              numberTypes.integer ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Integer (পূর্ণ সংখ্যা)</span>
                {numberTypes.integer ? (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">...-2, -1, 0, 1, 2...</p>
            </div>
            
            <div className={`p-3 rounded-lg border-2 transition-all ${
              numberTypes.rational ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Rational Number (মূলদ সংখ্যা)</span>
                {numberTypes.rational ? (
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">Can be written as p/q</p>
            </div>
            
            <div className={`p-3 rounded-lg border-2 transition-all ${
              numberTypes.real ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Real Number (বাস্তব সংখ্যা)</span>
                {numberTypes.real ? (
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">All numbers on the number line</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Fraction ↔ Decimal Converter</h4>
          
          <div className="mb-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setConversionMode('fraction-to-decimal')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  conversionMode === 'fraction-to-decimal'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Fraction → Decimal
              </button>
              <button
                onClick={() => setConversionMode('decimal-to-fraction')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  conversionMode === 'decimal-to-fraction'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Decimal → Fraction
              </button>
            </div>
          </div>
          
          {conversionMode === 'fraction-to-decimal' ? (
            <div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <input
                  type="number"
                  value={fractionNumerator}
                  onChange={(e) => setFractionNumerator(parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-xl"
                />
                <div className="text-2xl">/</div>
                <input
                  type="number"
                  value={fractionDenominator}
                  onChange={(e) => setFractionDenominator(parseInt(e.target.value) || 1)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-xl"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">Decimal Value:</p>
                <p className="text-3xl font-bold text-blue-600">
                  {convertFractionToDecimal(fractionNumerator, fractionDenominator)}
                </p>
              </div>
              
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Calculation:</p>
                <p className="font-mono text-center">
                  {fractionNumerator} ÷ {fractionDenominator} = {convertFractionToDecimal(fractionNumerator, fractionDenominator)}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <input
                  type="number"
                  step="0.01"
                  value={decimalValue}
                  onChange={(e) => setDecimalValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-xl"
                  placeholder="Enter decimal (e.g., 0.75)"
                />
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">Fraction Form:</p>
                <p className="text-3xl font-bold text-purple-600">
                  {(() => {
                    const frac = convertDecimalToFraction(decimalValue);
                    return `${frac.numerator}/${frac.denominator}`;
                  })()}
                </p>
              </div>
              
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Some decimals (like 0.333...) are approximations of fractions (1/3)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Number Line Visualization</h4>
        <div className="bg-gray-50 p-8 rounded-lg">
          <svg viewBox="0 0 800 150" className="w-full">
            {/* Main number line */}
            <line x1="50" y1="75" x2="750" y2="75" stroke="#333" strokeWidth="2" />
            
            {/* Tick marks and labels */}
            {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((num, i) => (
              <g key={num}>
                <line 
                  x1={50 + i * 70} 
                  y1="70" 
                  x2={50 + i * 70} 
                  y2="80" 
                  stroke="#333" 
                  strokeWidth="2" 
                />
                <text 
                  x={50 + i * 70} 
                  y="95" 
                  textAnchor="middle" 
                  fontSize="12"
                  fill="#333"
                >
                  {num}
                </text>
              </g>
            ))}
            
            {/* Selected number indicator */}
            <circle
              cx={50 + ((selectedNumber + 10) / 20) * 700}
              cy="75"
              r="8"
              fill="#3b82f6"
              stroke="#1e40af"
              strokeWidth="2"
            />
            <text
              x={50 + ((selectedNumber + 10) / 20) * 700}
              y="55"
              textAnchor="middle"
              fontSize="14"
              fill="#3b82f6"
              fontWeight="bold"
            >
              {selectedNumber}
            </text>
            
            {/* Number type regions */}
            <text x="400" y="130" textAnchor="middle" fontSize="14" fill="#666">
              All Real Numbers (সব বাস্তব সংখ্যা)
            </text>
          </svg>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Natural (1, 2, 3...)</p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Integers (...-1, 0, 1...)</p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Rational (p/q)</p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Real (all)</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Operations Practice</h4>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-700 mb-2">Addition (যোগ)</h5>
              <p className="text-sm text-gray-600">
                Positive + Positive = Positive<br/>
                Negative + Negative = Negative<br/>
                Mixed: Larger absolute value wins
              </p>
              <div className="mt-2 font-mono text-sm">
                5 + 3 = 8<br/>
                -5 + (-3) = -8<br/>
                5 + (-3) = 2
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 mb-2">Multiplication (গুণ)</h5>
              <p className="text-sm text-gray-600">
                Same signs → Positive<br/>
                Different signs → Negative
              </p>
              <div className="mt-2 font-mono text-sm">
                5 × 3 = 15<br/>
                -5 × (-3) = 15<br/>
                5 × (-3) = -15
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Real-World Examples</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <p className="font-medium">Temperature</p>
                <p className="text-sm text-gray-600">
                  -5°C (negative integer), 20.5°C (decimal)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-medium">Money</p>
                <p className="text-sm text-gray-600">
                  ৳50.75 (decimal), ৳100 (natural number)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-purple-500 mt-1" />
              <div>
                <p className="font-medium">Measurements</p>
                <p className="text-sm text-gray-600">
                  3/4 meter (fraction), 1.5 kg (decimal)
                </p>
              </div>
            </div>
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
                <p className="text-green-600">Perfect! You understand number systems!</p>
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

export default NumberSystems;