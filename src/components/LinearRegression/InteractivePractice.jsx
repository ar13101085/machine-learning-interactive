import React, { useState, useRef, useCallback } from 'react';
import { ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const InteractivePractice = ({
  theta0, theta1, setTheta0, setTheta1,
  dataExample, setDataExample, dataExamples,
  userPoints, setUserPoints, generateLineData,
  calculateCost, resetModel
}) => {
  const [canvasMode, setCanvasMode] = useState(false);
  const [manualTheta0, setManualTheta0] = useState(theta0.toString());
  const [manualTheta1, setManualTheta1] = useState(theta1.toString());

  const handleCanvasClick = (e) => {
    if (!canvasMode || !e) return;
    
    const newPoint = {
      x: e.xValue || 0,
      y: e.yValue || 0,
      label: `Point ${userPoints.length + 1}`
    };
    
    setUserPoints([...userPoints, newPoint]);
  };

  const clearUserPoints = () => {
    setUserPoints([]);
  };

  const handleManualUpdate = () => {
    const t0 = parseFloat(manualTheta0);
    const t1 = parseFloat(manualTheta1);
    if (!isNaN(t0) && !isNaN(t1)) {
      setTheta0(t0);
      setTheta1(t1);
    }
  };

  const currentData = userPoints.length > 0 ? userPoints : dataExamples[dataExample];
  const lineData = generateLineData();
  const currentCost = calculateCost(currentData, theta0, theta1);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg border">
          <p className="text-sm">X: {payload[0].value.toFixed(2)}</p>
          <p className="text-sm">Y: {payload[1].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Interactive Practice</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Interactive Plot</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setCanvasMode(!canvasMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  canvasMode 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {canvasMode ? 'Drawing Mode ON' : 'Drawing Mode OFF'}
              </button>
              {userPoints.length > 0 && (
                <button
                  onClick={clearUserPoints}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear Points
                </button>
              )}
            </div>
          </div>
          
          <div className={`rounded-lg overflow-hidden ${canvasMode ? 'ring-2 ring-blue-500' : ''}`}>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart 
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                onClick={handleCanvasClick}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  name="Data Points" 
                  data={currentData} 
                  fill="#8884d8"
                  cursor={canvasMode ? 'crosshair' : 'default'}
                />
                {lineData.length > 0 && (
                  <ReferenceLine 
                    segment={lineData} 
                    stroke="red" 
                    strokeWidth={2}
                  />
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          {canvasMode && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>টিপস:</strong> Chart এ click করে নতুন data point যোগ করুন। 
                আপনার নিজের data দিয়ে model train করে দেখুন!
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Parameter Controls</h4>
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
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Manual Input</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">θ₀</label>
                <input
                  type="number"
                  value={manualTheta0}
                  onChange={(e) => setManualTheta0(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">θ₁</label>
                <input
                  type="number"
                  value={manualTheta1}
                  onChange={(e) => setManualTheta1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleManualUpdate}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update Parameters
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Current Cost</h4>
            <p className="text-3xl font-bold text-yellow-600">{currentCost.toFixed(4)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Data Example Selector</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setDataExample('house')}
            className={`p-4 rounded-lg border-2 transition-all ${
              dataExample === 'house' && userPoints.length === 0
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h5 className="font-semibold text-gray-700 mb-1">🏠 House Prices</h5>
            <p className="text-sm text-gray-600">Area vs Price relationship</p>
          </button>
          
          <button
            onClick={() => setDataExample('student')}
            className={`p-4 rounded-lg border-2 transition-all ${
              dataExample === 'student' && userPoints.length === 0
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h5 className="font-semibold text-gray-700 mb-1">📚 Student Grades</h5>
            <p className="text-sm text-gray-600">Study hours vs Marks</p>
          </button>
          
          <button
            onClick={() => setDataExample('temperature')}
            className={`p-4 rounded-lg border-2 transition-all ${
              dataExample === 'temperature' && userPoints.length === 0
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h5 className="font-semibold text-gray-700 mb-1">🍦 Ice Cream Sales</h5>
            <p className="text-sm text-gray-600">Temperature vs Sales</p>
          </button>
        </div>
        
        {userPoints.length > 0 && (
          <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-700 text-sm">
              <strong>Note:</strong> আপনি {userPoints.length}টি custom point ব্যবহার করছেন। 
              Predefined data দেখতে points clear করুন।
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Challenge Tasks</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">🎯 Task 1: Perfect Fit</h5>
            <p className="text-sm text-gray-600">
              Slider ব্যবহার করে cost 100 এর নিচে আনুন
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-700 mb-2">🎨 Task 2: Create Pattern</h5>
            <p className="text-sm text-gray-600">
              নিজের data points draw করে একটি pattern তৈরি করুন
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-700 mb-2">📊 Task 3: Compare Models</h5>
            <p className="text-sm text-gray-600">
              বিভিন্ন dataset এ একই parameters test করুন
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold text-yellow-700 mb-2">🔍 Task 4: Find Outliers</h5>
            <p className="text-sm text-gray-600">
              এমন points add করুন যা pattern break করে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePractice;