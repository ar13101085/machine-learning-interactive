import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend, Cell } from 'recharts';
import { Mail, School, CreditCard, Heart, Lightbulb, Target, Sparkles, AlertCircle, TrendingUp } from 'lucide-react';

const InteractivePractice = ({ 
  userPoints, 
  setUserPoints, 
  predict, 
  theta0, 
  theta1,
  normalizeX
}) => {
  const [clickMode, setClickMode] = useState(1);
  const [testInput, setTestInput] = useState(30);
  const [selectedScenario, setSelectedScenario] = useState('exam');
  const [showGuidedMode, setShowGuidedMode] = useState(true);
  
  // Predefined scenarios for beginners
  const scenarios = {
    exam: {
      title: 'Exam Pass/Fail Prediction',
      icon: School,
      xLabel: 'Study Hours',
      yLabel: 'Result',
      class0: 'Fail',
      class1: 'Pass',
      color0: '#EF4444',
      color1: '#10B981',
      hint: 'More study hours → Higher chance of passing',
      sampleData: [
        { x: 10, y: 0, label: '10 hours → Fail' },
        { x: 15, y: 0, label: '15 hours → Fail' },
        { x: 25, y: 0, label: '25 hours → Fail' },
        { x: 40, y: 1, label: '40 hours → Pass' },
        { x: 50, y: 1, label: '50 hours → Pass' },
        { x: 60, y: 1, label: '60 hours → Pass' },
        { x: 70, y: 1, label: '70 hours → Pass' },
        { x: 30, y: 0, label: '30 hours → Fail' },
        { x: 35, y: 1, label: '35 hours → Pass' }
      ]
    },
    email: {
      title: 'Email Spam Detection',
      icon: Mail,
      xLabel: 'Spam Word Count',
      yLabel: 'Classification',
      class0: 'Normal Email',
      class1: 'Spam Email',
      color0: '#3B82F6',
      color1: '#DC2626',
      hint: 'More spam words → Higher chance of being spam',
      sampleData: [
        { x: 0, y: 0, label: '0 spam words → Normal' },
        { x: 2, y: 0, label: '2 spam words → Normal' },
        { x: 5, y: 0, label: '5 spam words → Normal' },
        { x: 15, y: 1, label: '15 spam words → Spam' },
        { x: 20, y: 1, label: '20 spam words → Spam' },
        { x: 25, y: 1, label: '25 spam words → Spam' },
        { x: 8, y: 0, label: '8 spam words → Normal' },
        { x: 12, y: 1, label: '12 spam words → Spam' }
      ]
    },
    loan: {
      title: 'Loan Approval',
      icon: CreditCard,
      xLabel: 'Credit Score',
      yLabel: 'Decision',
      class0: 'Rejected',
      class1: 'Approved',
      color0: '#F59E0B',
      color1: '#059669',
      hint: 'Higher credit score → Higher chance of approval',
      sampleData: [
        { x: 20, y: 0, label: 'Score 400 → Rejected' },
        { x: 30, y: 0, label: 'Score 500 → Rejected' },
        { x: 40, y: 0, label: 'Score 600 → Rejected' },
        { x: 60, y: 1, label: 'Score 700 → Approved' },
        { x: 70, y: 1, label: 'Score 750 → Approved' },
        { x: 80, y: 1, label: 'Score 800 → Approved' },
        { x: 50, y: 0, label: 'Score 650 → Rejected' },
        { x: 55, y: 1, label: 'Score 675 → Approved' }
      ]
    }
  };
  
  const currentScenario = scenarios[selectedScenario];

  const handleChartClick = (e) => {
    if (e && e.activeCoordinate) {
      const newPoint = {
        x: Math.round(e.activeCoordinate.x),
        y: clickMode,
        label: `x=${Math.round(e.activeCoordinate.x)}, y=${clickMode}`
      };
      setUserPoints([...userPoints, newPoint]);
    }
  };

  const clearPoints = () => {
    setUserPoints([]);
  };

  const generateDecisionBoundary = () => {
    const points = [];
    const minX = userPoints.length > 0 ? Math.min(...userPoints.map(p => p.x)) - 10 : 0;
    const maxX = userPoints.length > 0 ? Math.max(...userPoints.map(p => p.x)) + 10 : 100;
    
    for (let x = minX; x <= maxX; x += (maxX - minX) / 100) {
      points.push({
        x: x,
        probability: predict(x)
      });
    }
    return points;
  };

  const testPrediction = predict(testInput);
  const decisionBoundaryData = generateDecisionBoundary();

  const class0Points = userPoints.filter(p => p.y === 0);
  const class1Points = userPoints.filter(p => p.y === 1);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Interactive Practice</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-lg">
          নিজের data points create করুন এবং দেখুন কিভাবে logistic regression model 
          decision boundary তৈরি করে!
        </p>
      </div>
      
      {/* Scenario Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          Choose a Real-World Scenario
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(scenarios).map(([key, scenario]) => {
            const Icon = scenario.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedScenario(key);
                  setUserPoints([]);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedScenario === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">{scenario.title}</p>
                <p className="text-sm text-gray-600 mt-1">{scenario.hint}</p>
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showGuidedMode}
              onChange={(e) => setShowGuidedMode(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Show guided examples</span>
          </label>
          
          {showGuidedMode && (
            <button
              onClick={() => {
                setUserPoints(currentScenario.sampleData);
              }}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm"
            >
              Load Sample Data
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Create Your Dataset
          </h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Click mode:</p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={0}
                  checked={clickMode === 0}
                  onChange={(e) => setClickMode(0)}
                  className="mr-2"
                />
                <span style={{ color: currentScenario.color0 }}>
                  {currentScenario.class0}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={1}
                  checked={clickMode === 1}
                  onChange={(e) => setClickMode(1)}
                  className="mr-2"
                />
                <span style={{ color: currentScenario.color1 }}>
                  {currentScenario.class1}
                </span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Click on the chart to add {clickMode === 0 ? currentScenario.class0 : currentScenario.class1} examples!
            </p>
            {showGuidedMode && userPoints.length === 0 && (
              <p className="text-xs text-blue-600 mt-2">
                Tip: Try creating two distinct groups - low {currentScenario.xLabel} for {currentScenario.class0}, 
                high {currentScenario.xLabel} for {currentScenario.class1}
              </p>
            )}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="x" 
                type="number" 
                domain={[0, 100]}
                label={{ value: currentScenario.xLabel, position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                domain={[-0.1, 1.1]}
                label={{ value: currentScenario.yLabel, angle: -90, position: 'insideLeft' }}
                ticks={[0, 1]}
                tickFormatter={(value) => value === 0 ? currentScenario.class0 : currentScenario.class1}
              />
              <Tooltip />
              <Scatter name={currentScenario.class0} data={class0Points} fill={currentScenario.color0} />
              <Scatter name={currentScenario.class1} data={class1Points} fill={currentScenario.color1} />
            </ScatterChart>
          </ResponsiveContainer>

          <button
            onClick={clearPoints}
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All Points
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Decision Boundary
          </h3>
          
          {userPoints.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={decisionBoundaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: currentScenario.xLabel, position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  domain={[0, 1]}
                  label={{ value: 'Probability', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="probability" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                  name="P(y=1|x)"
                />
                <Line 
                  data={[{x: Math.min(...userPoints.map(p => p.x)), probability: 0.5}, 
                         {x: Math.max(...userPoints.map(p => p.x)), probability: 0.5}]}
                  stroke="#FF0000"
                  strokeDasharray="5 5"
                  name="Decision Boundary (0.5)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Add points to see decision boundary</p>
            </div>
          )}

          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="font-semibold mb-2">Current Model:</p>
            <p className="text-sm">θ₀ = {theta0.toFixed(4)}</p>
            <p className="text-sm">θ₁ = {theta1.toFixed(4)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Test Your Model
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test {currentScenario.xLabel}: {testInput}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={testInput}
              onChange={(e) => setTestInput(parseInt(e.target.value))}
              className="w-full"
            />
            
            <div className="mt-4 space-y-2 text-sm">
              <p className="font-medium">What-if scenarios:</p>
              <button
                onClick={() => setTestInput(20)}
                className="block w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Low {currentScenario.xLabel} (20)
              </button>
              <button
                onClick={() => setTestInput(50)}
                className="block w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Medium {currentScenario.xLabel} (50)
              </button>
              <button
                onClick={() => setTestInput(80)}
                className="block w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                High {currentScenario.xLabel} (80)
              </button>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm mb-2">Prediction for {currentScenario.xLabel} = {testInput}:</p>
              <p className="text-lg font-bold">
                P({currentScenario.class1}) = {(testPrediction * 100).toFixed(1)}%
              </p>
              
              <div className="mt-3">
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full transition-all duration-300"
                    style={{ 
                      width: `${testPrediction * 100}%`,
                      backgroundColor: testPrediction >= 0.5 ? currentScenario.color1 : currentScenario.color0
                    }}
                  />
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <span className="text-xs font-medium">{currentScenario.class0}</span>
                    <span className="text-xs font-medium">{currentScenario.class1}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm mt-3">
                Predicted outcome: 
                <span 
                  className="font-bold ml-2"
                  style={{ color: testPrediction >= 0.5 ? currentScenario.color1 : currentScenario.color0 }}
                >
                  {testPrediction >= 0.5 ? currentScenario.class1 : currentScenario.class0}
                </span>
              </p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded text-sm">
              <p className="font-medium mb-1">Interpretation:</p>
              <p>
                {testPrediction >= 0.5 
                  ? `With ${testInput} ${currentScenario.xLabel}, the model predicts ${currentScenario.class1}.`
                  : `With ${testInput} ${currentScenario.xLabel}, the model predicts ${currentScenario.class0}.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Beginner-Friendly Exercises */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-orange-500" />
          Guided Exercises
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-700">Exercise 1: Clear Separation</h4>
            <p className="text-sm text-gray-600 mb-2">
              Create two clearly separated groups:
            </p>
            <ul className="text-sm space-y-1">
              <li>• Add {currentScenario.class0} points with low {currentScenario.xLabel} (0-30)</li>
              <li>• Add {currentScenario.class1} points with high {currentScenario.xLabel} (70-100)</li>
              <li>• Train the model and observe the decision boundary</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-700">Exercise 2: Overlapping Data</h4>
            <p className="text-sm text-gray-600 mb-2">
              Create overlapping groups:
            </p>
            <ul className="text-sm space-y-1">
              <li>• Add mixed points in the middle range (40-60)</li>
              <li>• See how the model handles uncertainty</li>
              <li>• Check predictions for borderline cases</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-700">Exercise 3: Learning Rate</h4>
            <p className="text-sm text-gray-600 mb-2">
              Experiment with learning rate:
            </p>
            <ul className="text-sm space-y-1">
              <li>• Try very small α (0.001) - slow learning</li>
              <li>• Try medium α (0.01) - balanced learning</li>
              <li>• Try large α (0.1) - fast but unstable</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-red-700">Exercise 4: Real Patterns</h4>
            <p className="text-sm text-gray-600 mb-2">
              Recreate real scenarios:
            </p>
            <ul className="text-sm space-y-1">
              <li>• {scenarios.exam.hint}</li>
              <li>• {scenarios.email.hint}</li>
              <li>• {scenarios.loan.hint}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Key Observations</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Decision boundary is where probability = 0.5 (50/50 chance)</li>
          <li>Points far from boundary have high confidence predictions</li>
          <li>Points near boundary have uncertain predictions</li>
          <li>More training data usually leads to better boundaries</li>
          <li>Logistic regression creates linear decision boundaries</li>
        </ul>
      </div>
    </div>
  );
};

export default InteractivePractice;