import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { TrendingDown, TrendingUp, Target, AlertCircle, Lightbulb, ThumbsUp, ThumbsDown, Activity } from 'lucide-react';

const CostFunction = ({ calculateCost, theta0, theta1 }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedExample, setSelectedExample] = useState('correct');
  const [visualMode, setVisualMode] = useState('graph');
  
  const costData = [];
  for (let t1 = -2; t1 <= 2; t1 += 0.1) {
    costData.push({
      theta1: t1,
      cost: calculateCost(theta0, t1)
    });
  }

  const currentCost = calculateCost(theta0, theta1);
  
  // Visual examples of predictions and their costs
  const predictionExamples = {
    correct: {
      title: 'Perfect Predictions',
      icon: ThumbsUp,
      color: 'green',
      examples: [
        { actual: 1, predicted: 0.99, cost: 0.01, label: 'Spam correctly identified' },
        { actual: 0, predicted: 0.01, cost: 0.01, label: 'Normal email correctly identified' }
      ]
    },
    wrong: {
      title: 'Wrong Predictions',
      icon: ThumbsDown,
      color: 'red',
      examples: [
        { actual: 1, predicted: 0.1, cost: 2.3, label: 'Spam missed (False Negative)' },
        { actual: 0, predicted: 0.9, cost: 2.3, label: 'Normal marked as spam (False Positive)' }
      ]
    },
    uncertain: {
      title: 'Uncertain Predictions',
      icon: AlertCircle,
      color: 'yellow',
      examples: [
        { actual: 1, predicted: 0.5, cost: 0.69, label: 'Model unsure about spam' },
        { actual: 0, predicted: 0.5, cost: 0.69, label: 'Model unsure about normal' }
      ]
    }
  };
  
  // Generate cost visualization data for different predictions
  const generateCostCurve = (actualY) => {
    const data = [];
    for (let pred = 0.01; pred <= 0.99; pred += 0.01) {
      const cost = actualY === 1 
        ? -Math.log(pred)
        : -Math.log(1 - pred);
      data.push({
        prediction: pred,
        cost: cost
      });
    }
    return data;
  };
  
  const costCurveY1 = generateCostCurve(1);
  const costCurveY0 = generateCostCurve(0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cost Function for Logistic Regression</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-lg">
          Logistic Regression এর cost function কে Binary Cross-Entropy বা Log Loss বলা হয়। 
          এটি model এর predictions কতটা ভুল তা measure করে।
        </p>
      </div>
      
      {/* Visual Analogy */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          সহজ ভাষায় Cost Function
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">পারফেক্ট Prediction</h4>
            </div>
            <p className="text-sm text-gray-600">যখন আপনার prediction একদম সঠিক</p>
            <div className="mt-2 bg-green-100 p-2 rounded text-center">
              <p className="text-2xl font-bold text-green-700">Cost ≈ 0</p>
              <p className="text-xs">কোন penalty নেই</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold">অনিশ্চিত Prediction</h4>
            </div>
            <p className="text-sm text-gray-600">Model যখন confused (50/50)</p>
            <div className="mt-2 bg-yellow-100 p-2 rounded text-center">
              <p className="text-2xl font-bold text-yellow-700">Cost ≈ 0.69</p>
              <p className="text-xs">মাঝারি penalty</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <h4 className="font-semibold">ভুল Prediction</h4>
            </div>
            <p className="text-sm text-gray-600">যখন prediction সম্পূর্ণ ভুল</p>
            <div className="mt-2 bg-red-100 p-2 rounded text-center">
              <p className="text-2xl font-bold text-red-700">Cost → ∞</p>
              <p className="text-xs">অনেক বড় penalty</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm flex items-start gap-2">
            <Activity className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              <strong>মনে রাখুন:</strong> Cost function একটি "punishment system" - 
              যত বেশি ভুল করবে, তত বেশি punishment (cost) পাবে!
            </span>
          </p>
        </div>
      </div>
      
      {/* Interactive Examples */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Real Examples with Cost Values</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {Object.entries(predictionExamples).map(([key, example]) => {
            const Icon = example.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedExample === key
                    ? `border-${example.color}-500 bg-${example.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-1 text-${example.color}-600`} />
                <p className="text-sm font-medium">{example.title}</p>
              </button>
            );
          })}
        </div>
        
        <div className="space-y-3">
          {predictionExamples[selectedExample].examples.map((ex, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">{ex.label}</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Actual</p>
                  <p className="text-lg font-bold">{ex.actual}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-600">Predicted</p>
                  <p className="text-lg font-bold">{ex.predicted}</p>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        ex.predicted > 0.7 ? 'bg-green-500' : 
                        ex.predicted < 0.3 ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${ex.predicted * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-600">Cost</p>
                  <p className={`text-lg font-bold ${
                    ex.cost < 0.1 ? 'text-green-600' : 
                    ex.cost > 1 ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {ex.cost.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Cost Function Formula</h3>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="bg-white p-6 rounded border border-gray-200 mb-4">
            <div className="text-center">
              <div className="text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                <span>J(θ) = −</span>
                <div className="inline-block align-middle mx-2">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>1</div>
                    <div className="border-t border-gray-700 px-2"></div>
                    <div>m</div>
                  </div>
                </div>
                <span className="text-3xl align-middle">∑</span>
                <span className="align-middle ml-2">[y</span>
                <sup className="text-sm">(i)</sup>
                <span className="align-middle"> log(h(x</span>
                <sup className="text-sm">(i)</sup>
                <span className="align-middle">)) + (1 − y</span>
                <sup className="text-sm">(i)</sup>
                <span className="align-middle">) log(1 − h(x</span>
                <sup className="text-sm">(i)</sup>
                <span className="align-middle">))]</span>
              </div>
              
              <div className="text-sm text-gray-600 mt-6 space-y-1">
                <p>where:</p>
                <p>• m = number of training examples</p>
                <p>• h(x) = hypothesis function (sigmoid output)</p>
                <p>• y<sup>(i)</sup> = actual label (0 or 1)</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showDetail ? 'Hide' : 'Show'} Explanation
          </button>
          
          {showDetail && (
            <div className="mt-4 space-y-3">
              <div className="bg-green-50 p-4 rounded">
                <p className="font-semibold">যখন y = 1:</p>
                <p>Cost = -log(h(x))</p>
                <p className="text-sm mt-1">h(x) → 1 হলে cost → 0 (perfect prediction)</p>
                <p className="text-sm">h(x) → 0 হলে cost → ∞ (worst prediction)</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded">
                <p className="font-semibold">যখন y = 0:</p>
                <p>Cost = -log(1 - h(x))</p>
                <p className="text-sm mt-1">h(x) → 0 হলে cost → 0 (perfect prediction)</p>
                <p className="text-sm">h(x) → 1 হলে cost → ∞ (worst prediction)</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">কেন Cross-Entropy Loss?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-semibold mb-2">✅ Convex Function</h4>
            <p>Global minimum guarantee করে, local minimum নেই</p>
          </div>
          
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-semibold mb-2">📈 Large Penalty</h4>
            <p>Wrong predictions এর জন্য high penalty</p>
          </div>
          
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-semibold mb-2">🎯 Probabilistic</h4>
            <p>Maximum likelihood principle follow করে</p>
          </div>
          
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-semibold mb-2">⚡ Efficient</h4>
            <p>Gradient computation সহজ</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Cost Function Visualization</h3>
        
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => setVisualMode('graph')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              visualMode === 'graph' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Parameter Cost
          </button>
          <button
            onClick={() => setVisualMode('prediction')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              visualMode === 'prediction' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Prediction Cost
          </button>
        </div>
        
        {visualMode === 'graph' ? (
          <>
            <div className="bg-white p-4 rounded border border-gray-200 mb-4">
              <p className="text-center">
                Current Cost at θ₁ = {theta1.toFixed(2)}: 
                <span className="font-bold text-red-600"> {currentCost.toFixed(4)}</span>
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="theta1" 
                  label={{ value: 'θ₁', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'Cost J(θ)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  data={[{ theta1: theta1, cost: currentCost }]}
                  type="monotone"
                  dataKey="cost"
                  stroke="#EF4444"
                  strokeWidth={0}
                  dot={{ r: 6, fill: '#EF4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <p className="text-sm text-gray-600 text-center mt-2">
              Lower θ₁ values → model predicts lower probabilities → different cost
            </p>
          </>
        ) : (
          <>
            <div className="bg-white p-4 rounded border border-gray-200 mb-4">
              <p className="text-sm text-gray-600 mb-2">Cost based on prediction probability:</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium">When actual y = 1 (Positive class)</p>
                  <p className="text-xs text-gray-500">Cost = -log(prediction)</p>
                </div>
                <div>
                  <p className="text-xs font-medium">When actual y = 0 (Negative class)</p>
                  <p className="text-xs text-gray-500">Cost = -log(1 - prediction)</p>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="prediction" 
                  label={{ value: 'Predicted Probability', position: 'insideBottom', offset: -5 }}
                  domain={[0, 1]}
                />
                <YAxis 
                  label={{ value: 'Cost', angle: -90, position: 'insideLeft' }}
                  domain={[0, 5]}
                />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend />
                <Line 
                  data={costCurveY1}
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                  name="Cost when y=1 (Spam)"
                />
                <Line 
                  data={costCurveY0}
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={false}
                  name="Cost when y=0 (Normal)"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-3 rounded text-center">
                <p className="text-sm font-medium text-green-700">Green curve (y=1)</p>
                <p className="text-xs">Low cost when predicting high probability</p>
              </div>
              <div className="bg-red-50 p-3 rounded text-center">
                <p className="text-sm font-medium text-red-700">Red curve (y=0)</p>
                <p className="text-xs">Low cost when predicting low probability</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Key Points</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Cost function measures কতটা ভুল prediction হচ্ছে</li>
          <li>Perfect prediction এর জন্য cost = 0</li>
          <li>Completely wrong prediction এর জন্য cost → ∞</li>
          <li>Convex nature ensure করে যে gradient descent global minimum find করবে</li>
          <li>Lower cost মানে better model performance</li>
        </ul>
      </div>
    </div>
  );
};

export default CostFunction;