import React, { useState, useEffect } from 'react';
import { Info, Target, Compass, Grid3x3, MousePointer } from 'lucide-react';

const CoordinateGeometry = ({ onComplete }) => {
  const [clickedPoint, setClickedPoint] = useState(null);
  const [plotPoints, setPlotPoints] = useState([
    { x: 3, y: 4, label: 'A' },
    { x: -2, y: 3, label: 'B' },
    { x: -4, y: -2, label: 'C' },
    { x: 2, y: -3, label: 'D' }
  ]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [mode, setMode] = useState('explore'); // explore, distance, midpoint, triangle
  const [trianglePoints, setTrianglePoints] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [coordinateGuessMode, setCoordinateGuessMode] = useState(false);
  const [targetPoint, setTargetPoint] = useState({ x: 3, y: 4 });
  const [guessedPoint, setGuessedPoint] = useState(null);

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / 20).toFixed(1);
    const y = -((e.clientY - rect.top - rect.height / 2) / 20).toFixed(1);
    const point = { x: parseFloat(x), y: parseFloat(y) };
    
    if (coordinateGuessMode) {
      setGuessedPoint(point);
      return;
    }
    
    setClickedPoint(point);
    
    if (mode === 'distance' || mode === 'midpoint') {
      if (selectedPoints.length < 2) {
        setSelectedPoints([...selectedPoints, point]);
      } else {
        setSelectedPoints([point]);
      }
    } else if (mode === 'triangle') {
      if (trianglePoints.length < 3) {
        setTrianglePoints([...trianglePoints, point]);
      } else {
        setTrianglePoints([point]);
      }
    }
  };

  const calculateDistance = () => {
    if (selectedPoints.length === 2) {
      const [p1, p2] = selectedPoints;
      const distance = Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
      ).toFixed(2);
      return distance;
    }
    return null;
  };

  const getQuadrant = (x, y) => {
    if (x > 0 && y > 0) return 'I';
    if (x < 0 && y > 0) return 'II';
    if (x < 0 && y < 0) return 'III';
    if (x > 0 && y < 0) return 'IV';
    if (x === 0 && y === 0) return 'Origin';
    if (x === 0) return 'Y-axis';
    if (y === 0) return 'X-axis';
  };

  const quizQuestions = [
    {
      question: "Point (3, 5) কোন quadrant এ আছে?",
      options: ['I', 'II', 'III', 'IV'],
      correct: 0
    },
    {
      question: "Point (-2, -4) এর coordinates কি?",
      options: ['x = 2, y = 4', 'x = -2, y = 4', 'x = -2, y = -4', 'x = 2, y = -4'],
      correct: 2
    },
    {
      question: "Origin point এর coordinates কি?",
      options: ['(1, 1)', '(0, 0)', '(0, 1)', '(1, 0)'],
      correct: 1
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
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
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Coordinate Geometry (স্থানাঙ্ক জ্যামিতি)</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Interactive Coordinate Plane</h4>
          <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <svg 
              width="100%" 
              height="100%" 
              viewBox="-200 -200 400 400"
              onClick={handleCanvasClick}
              className="cursor-crosshair"
            >
              {/* Grid lines */}
              {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map(i => (
                <g key={`grid-${i}`}>
                  <line
                    x1={i * 20}
                    y1="-200"
                    x2={i * 20}
                    y2="200"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="-200"
                    y1={i * 20}
                    x2="200"
                    y2={i * 20}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                </g>
              ))}
              
              {/* X and Y axes */}
              <line x1="-200" y1="0" x2="200" y2="0" stroke="#374151" strokeWidth="2" />
              <line x1="0" y1="-200" x2="0" y2="200" stroke="#374151" strokeWidth="2" />
              
              {/* Axis labels */}
              <text x="190" y="-10" fontSize="14" fill="#374151">X</text>
              <text x="10" y="-190" fontSize="14" fill="#374151">Y</text>
              
              {/* Axis numbers */}
              {[-8, -6, -4, -2, 2, 4, 6, 8].map(i => (
                <g key={`labels-${i}`}>
                  <text x={i * 20 - 5} y="15" fontSize="12" fill="#6b7280">{i}</text>
                  <text x="-20" y={-i * 20 + 5} fontSize="12" fill="#6b7280">{i}</text>
                </g>
              ))}
              
              {/* Quadrant labels */}
              <text x="100" y="-100" fontSize="16" fill="#9ca3af" fontWeight="bold">I</text>
              <text x="-100" y="-100" fontSize="16" fill="#9ca3af" fontWeight="bold">II</text>
              <text x="-100" y="100" fontSize="16" fill="#9ca3af" fontWeight="bold">III</text>
              <text x="100" y="100" fontSize="16" fill="#9ca3af" fontWeight="bold">IV</text>
              
              {/* Plot points */}
              {plotPoints.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x * 20}
                    cy={-point.y * 20}
                    r="6"
                    fill={selectedPoints.includes(point) ? "#3b82f6" : "#ef4444"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedPoints.includes(point)) {
                        setSelectedPoints(selectedPoints.filter(p => p !== point));
                      } else if (selectedPoints.length < 2) {
                        setSelectedPoints([...selectedPoints, point]);
                      }
                    }}
                  />
                  <text
                    x={point.x * 20 + 10}
                    y={-point.y * 20 - 10}
                    fontSize="14"
                    fill="#374151"
                    fontWeight="bold"
                  >
                    {point.label}({point.x}, {point.y})
                  </text>
                </g>
              ))}
              
              {/* Clicked point */}
              {clickedPoint && (
                <g>
                  <circle
                    cx={clickedPoint.x * 20}
                    cy={-clickedPoint.y * 20}
                    r="6"
                    fill="#10b981"
                  />
                  <text
                    x={clickedPoint.x * 20 + 10}
                    y={-clickedPoint.y * 20 - 10}
                    fontSize="14"
                    fill="#374151"
                    fontWeight="bold"
                  >
                    ({clickedPoint.x}, {clickedPoint.y})
                  </text>
                </g>
              )}
              
              {/* Distance line */}
              {mode === 'distance' && selectedPoints.length === 2 && (
                <line
                  x1={selectedPoints[0].x * 20}
                  y1={-selectedPoints[0].y * 20}
                  x2={selectedPoints[1].x * 20}
                  y2={-selectedPoints[1].y * 20}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}
              
              {/* Midpoint */}
              {mode === 'midpoint' && selectedPoints.length === 2 && (
                <>
                  <line
                    x1={selectedPoints[0].x * 20}
                    y1={-selectedPoints[0].y * 20}
                    x2={selectedPoints[1].x * 20}
                    y2={-selectedPoints[1].y * 20}
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <circle
                    cx={(selectedPoints[0].x + selectedPoints[1].x) * 10}
                    cy={-(selectedPoints[0].y + selectedPoints[1].y) * 10}
                    r="8"
                    fill="#8b5cf6"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </>
              )}
              
              {/* Triangle */}
              {mode === 'triangle' && trianglePoints.length >= 2 && (
                <>
                  {trianglePoints.map((point, i) => {
                    const nextPoint = trianglePoints[(i + 1) % trianglePoints.length];
                    return (
                      <line
                        key={`side-${i}`}
                        x1={point.x * 20}
                        y1={-point.y * 20}
                        x2={nextPoint.x * 20}
                        y2={-nextPoint.y * 20}
                        stroke="#f97316"
                        strokeWidth="2"
                      />
                    );
                  })}
                  {trianglePoints.map((point, i) => (
                    <circle
                      key={`vertex-${i}`}
                      cx={point.x * 20}
                      cy={-point.y * 20}
                      r="6"
                      fill="#f97316"
                    />
                  ))}
                </>
              )}
              
              {/* Target point for guessing game */}
              {coordinateGuessMode && (
                <circle
                  cx={targetPoint.x * 20}
                  cy={-targetPoint.y * 20}
                  r="10"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              )}
            </svg>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">
              <Info className="inline w-4 h-4 mr-1" />
              Click anywhere to plot a point
            </p>
            {clickedPoint && (
              <p className="text-sm bg-green-50 p-2 rounded">
                Clicked point: ({clickedPoint.x}, {clickedPoint.y}) - 
                Quadrant: {getQuadrant(clickedPoint.x, clickedPoint.y)}
              </p>
            )}
            {selectedPoints.length === 2 && (
              <p className="text-sm bg-blue-50 p-2 rounded">
                Distance between selected points: {calculateDistance()} units
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Key Concepts</h4>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-700 mb-2">Axes (অক্ষ)</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• X-axis: অনুভূমিক রেখা (Horizontal line)</li>
                  <li>• Y-axis: উল্লম্ব রেখা (Vertical line)</li>
                  <li>• Origin (0,0): মূলবিন্দু যেখানে axes মিলিত হয়</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-700 mb-2">Coordinates (স্থানাঙ্ক)</h5>
                <p className="text-sm text-gray-700 mb-2">
                  প্রতিটি point এর position দুটি সংখ্যা দিয়ে প্রকাশ করা হয়:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• First number (x): বাম-ডান position</li>
                  <li>• Second number (y): উপর-নিচ position</li>
                  <li>• Format: (x, y) - যেমন (3, 4)</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h5 className="font-semibold text-yellow-700 mb-2">Quadrants (চতুর্ভাগ)</h5>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>• Quadrant I: (+x, +y)</div>
                  <div>• Quadrant II: (-x, +y)</div>
                  <div>• Quadrant III: (-x, -y)</div>
                  <div>• Quadrant IV: (+x, -y)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Distance Formula</h4>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-center font-mono text-lg mb-2">
                d = √[(x₂ - x₁)² + (y₂ - y₁)²]
              </p>
              <p className="text-sm text-gray-600 text-center">
                দুটি point এর মধ্যে দূরত্ব
              </p>
            </div>
            <p className="text-sm text-gray-700">
              উপরের plane এ দুটি point select করুন distance দেখার জন্য!
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Interactive Modes</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setMode('explore')}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-2 ${
              mode === 'explore' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MousePointer className="w-5 h-5" />
            <span className="text-sm">Explore</span>
          </button>
          <button
            onClick={() => {
              setMode('distance');
              setSelectedPoints([]);
            }}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-2 ${
              mode === 'distance' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-sm">Distance</span>
          </button>
          <button
            onClick={() => {
              setMode('midpoint');
              setSelectedPoints([]);
            }}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-2 ${
              mode === 'midpoint' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-sm">Midpoint</span>
          </button>
          <button
            onClick={() => {
              setMode('triangle');
              setTrianglePoints([]);
            }}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-2 ${
              mode === 'triangle' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
            <span className="text-sm">Triangle</span>
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-700">
            {mode === 'explore' && '🔍 Click anywhere to see coordinates'}
            {mode === 'distance' && '📏 Select 2 points to calculate distance'}
            {mode === 'midpoint' && '🎯 Select 2 points to find midpoint'}
            {mode === 'triangle' && '📐 Select 3 points to create a triangle and see its properties'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Formulas & Calculations</h4>
          
          {mode === 'distance' && selectedPoints.length === 2 && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-blue-700 mb-2">Distance Formula</h5>
              <p className="font-mono text-sm mb-2">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
              <div className="bg-white p-3 rounded">
                <p className="text-sm">Point 1: ({selectedPoints[0].x}, {selectedPoints[0].y})</p>
                <p className="text-sm">Point 2: ({selectedPoints[1].x}, {selectedPoints[1].y})</p>
                <p className="text-sm mt-2">
                  d = √[({selectedPoints[1].x} - {selectedPoints[0].x})² + ({selectedPoints[1].y} - {selectedPoints[0].y})²]
                </p>
                <p className="text-sm">
                  d = √[{Math.pow(selectedPoints[1].x - selectedPoints[0].x, 2)} + {Math.pow(selectedPoints[1].y - selectedPoints[0].y, 2)}]
                </p>
                <p className="text-sm font-bold text-blue-600 mt-2">
                  d = {calculateDistance()} units
                </p>
              </div>
            </div>
          )}
          
          {mode === 'midpoint' && selectedPoints.length === 2 && (
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-purple-700 mb-2">Midpoint Formula</h5>
              <p className="font-mono text-sm mb-2">M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</p>
              <div className="bg-white p-3 rounded">
                <p className="text-sm">Point 1: ({selectedPoints[0].x}, {selectedPoints[0].y})</p>
                <p className="text-sm">Point 2: ({selectedPoints[1].x}, {selectedPoints[1].y})</p>
                <p className="text-sm mt-2">
                  M = (({selectedPoints[0].x} + {selectedPoints[1].x})/2, ({selectedPoints[0].y} + {selectedPoints[1].y})/2)
                </p>
                <p className="text-sm font-bold text-purple-600 mt-2">
                  M = ({((selectedPoints[0].x + selectedPoints[1].x) / 2).toFixed(1)}, {((selectedPoints[0].y + selectedPoints[1].y) / 2).toFixed(1)})
                </p>
              </div>
            </div>
          )}
          
          {mode === 'triangle' && trianglePoints.length === 3 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h5 className="font-semibold text-orange-700 mb-2">Triangle Properties</h5>
              <div className="bg-white p-3 rounded space-y-2">
                <p className="text-sm">Vertices: 
                  A({trianglePoints[0].x}, {trianglePoints[0].y}), 
                  B({trianglePoints[1].x}, {trianglePoints[1].y}), 
                  C({trianglePoints[2].x}, {trianglePoints[2].y})
                </p>
                <p className="text-sm">
                  Perimeter: {(
                    Math.sqrt(Math.pow(trianglePoints[1].x - trianglePoints[0].x, 2) + Math.pow(trianglePoints[1].y - trianglePoints[0].y, 2)) +
                    Math.sqrt(Math.pow(trianglePoints[2].x - trianglePoints[1].x, 2) + Math.pow(trianglePoints[2].y - trianglePoints[1].y, 2)) +
                    Math.sqrt(Math.pow(trianglePoints[0].x - trianglePoints[2].x, 2) + Math.pow(trianglePoints[0].y - trianglePoints[2].y, 2))
                  ).toFixed(2)} units
                </p>
                <p className="text-sm">
                  Area: {Math.abs(
                    0.5 * (
                      trianglePoints[0].x * (trianglePoints[1].y - trianglePoints[2].y) +
                      trianglePoints[1].x * (trianglePoints[2].y - trianglePoints[0].y) +
                      trianglePoints[2].x * (trianglePoints[0].y - trianglePoints[1].y)
                    )
                  ).toFixed(2)} square units
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Coordinate Guessing Game</h4>
          <div className="mb-4">
            <button
              onClick={() => {
                setCoordinateGuessMode(!coordinateGuessMode);
                if (!coordinateGuessMode) {
                  setTargetPoint({
                    x: Math.floor(Math.random() * 9) - 4,
                    y: Math.floor(Math.random() * 9) - 4
                  });
                  setGuessedPoint(null);
                }
              }}
              className={`w-full px-4 py-2 rounded-lg transition-colors ${
                coordinateGuessMode 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {coordinateGuessMode ? 'Stop Game' : 'Start Guessing Game'}
            </button>
          </div>
          
          {coordinateGuessMode && (
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-semibold text-blue-700">
                  Find the point: ({targetPoint.x}, {targetPoint.y})
                </p>
              </div>
              
              {guessedPoint && (
                <div className={`p-3 rounded-lg ${
                  guessedPoint.x === targetPoint.x && guessedPoint.y === targetPoint.y
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {guessedPoint.x === targetPoint.x && guessedPoint.y === targetPoint.y ? (
                    <>
                      <p className="font-semibold">✅ Correct!</p>
                      <button
                        onClick={() => {
                          setTargetPoint({
                            x: Math.floor(Math.random() * 9) - 4,
                            y: Math.floor(Math.random() * 9) - 4
                          });
                          setGuessedPoint(null);
                        }}
                        className="mt-2 px-4 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Next Point
                      </button>
                    </>
                  ) : (
                    <p className="text-sm">
                      ❌ You clicked ({guessedPoint.x}, {guessedPoint.y}). Try again!
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
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
                <p className="text-green-600">Perfect! You've mastered coordinate geometry!</p>
              ) : (
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
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

export default CoordinateGeometry;