import React, { useState } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ComposedChart } from 'recharts';

const CompleteVisualization = ({
  theta0, theta1, setTheta0, setTheta1,
  learningRate, setLearningRate,
  costHistory, isTraining, setIsTraining,
  dataExample, setDataExample, dataExamples,
  userPoints, getCurrentData, calculateCost,
  calculateGradients, performGradientDescentStep,
  resetModel, generateLineData
}) => {
  const [showEquation, setShowEquation] = useState(true);
  const [showPredictions, setShowPredictions] = useState(true);

  const data = getCurrentData();
  const currentCost = calculateCost(data, theta0, theta1);
  const { gradientTheta0, gradientTheta1 } = calculateGradients(data, theta0, theta1);
  const lineData = generateLineData();

  const predictionData = data.map(point => ({
    ...point,
    prediction: theta0 + theta1 * point.x,
    error: (theta0 + theta1 * point.x) - point.y
  }));

  const costSurface = [];
  for (let t0 = -50; t0 <= 150; t0 += 10) {
    for (let t1 = -1; t1 <= 3; t1 += 0.2) {
      costSurface.push({
        theta0: t0,
        theta1: t1,
        cost: calculateCost(data, t0, t1)
      });
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Complete Visualization</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Main Visualization</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEquation(!showEquation)}
                className={`px-3 py-1 rounded text-sm ${
                  showEquation ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Equation
              </button>
              <button
                onClick={() => setShowPredictions(!showPredictions)}
                className={`px-3 py-1 rounded text-sm ${
                  showPredictions ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Predictions
              </button>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={predictionData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Scatter name="Actual Data" dataKey="y" fill="#8884d8" />
              {showPredictions && (
                <Scatter name="Predictions" dataKey="prediction" fill="#ff7300" shape="square" />
              )}
              {lineData.length > 0 && (
                <ReferenceLine 
                  segment={lineData} 
                  stroke="red" 
                  strokeWidth={2}
                />
              )}
              {showPredictions && predictionData.map((point, index) => (
                <ReferenceLine
                  key={index}
                  segment={[
                    { x: point.x, y: point.y },
                    { x: point.x, y: point.prediction }
                  ]}
                  stroke="#999"
                  strokeDasharray="3 3"
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
          
          {showEquation && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-xl font-mono">
                y = {theta0.toFixed(2)} + {theta1.toFixed(2)}x
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h5 className="font-semibold text-gray-700 mb-3">Model Status</h5>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-gray-600">Current Cost</p>
                <p className="text-2xl font-bold text-yellow-600">{currentCost.toFixed(4)}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-gray-600">θ₀ (Intercept)</p>
                <p className="text-xl font-bold text-blue-600">{theta0.toFixed(4)}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-600">θ₁ (Slope)</p>
                <p className="text-xl font-bold text-green-600">{theta1.toFixed(4)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h5 className="font-semibold text-gray-700 mb-3">Gradients</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">∂J/∂θ₀:</span>
                <span className="font-mono text-sm">{gradientTheta0.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">∂J/∂θ₁:</span>
                <span className="font-mono text-sm">{gradientTheta1.toFixed(6)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Cost History</h4>
          {costHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={costHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-250 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Start training to see cost history</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Error Analysis</h4>
          <div className="space-y-3 max-h-250 overflow-y-auto">
            {predictionData.map((point, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">{point.label || `Point ${index + 1}`}</span>
                <span className={`text-sm font-medium ${
                  point.error > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {point.error > 0 ? '+' : ''}{point.error.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Complete Controls</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">Parameter Adjustment</h5>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  θ₀ (Intercept): {theta0.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={theta0}
                  onChange={(e) => setTheta0(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isTraining}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  θ₁ (Slope): {theta1.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.01"
                  value={theta1}
                  onChange={(e) => setTheta1(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isTraining}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Rate: {learningRate}
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isTraining}
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-700 mb-3">Training Controls</h5>
            <div className="space-y-4">
              <select
                value={dataExample}
                onChange={(e) => setDataExample(e.target.value)}
                disabled={isTraining || userPoints.length > 0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="house">🏠 House Prices</option>
                <option value="student">📚 Student Grades</option>
                <option value="temperature">🍦 Ice Cream Sales</option>
              </select>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsTraining(!isTraining)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isTraining 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isTraining ? 'Stop' : 'Start'} Training
                </button>
                
                <button
                  onClick={performGradientDescentStep}
                  disabled={isTraining}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Single Step
                </button>
              </div>
              
              <button
                onClick={resetModel}
                disabled={isTraining}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm">
            <strong>প্রো টিপ:</strong> বিভিন্ন learning rate দিয়ে experiment করুন। 
            খুব বড় learning rate divergence ঘটাতে পারে, আর খুব ছোট learning rate training slow করে দেয়।
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompleteVisualization;