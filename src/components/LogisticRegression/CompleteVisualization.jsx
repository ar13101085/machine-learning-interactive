import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, ComposedChart, BarChart, Bar, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, BarChart3, PieChartIcon, Info, Target, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const CompleteVisualization = ({ 
  data, 
  predict, 
  theta0, 
  theta1, 
  costHistory,
  dataExample,
  setDataExample,
  dataExamples,
  trainModel,
  resetModel,
  isTraining,
  calculateCost,
  calculateStatistics,
  denormalizeX
}) => {
  const [showMetrics, setShowMetrics] = useState(true);
  const [showConfusionMatrix, setShowConfusionMatrix] = useState(true);
  const [selectedVisualization, setSelectedVisualization] = useState('scatter');
  const generatePredictionLine = () => {
    const points = [];
    const minX = Math.min(...data.map(d => d.x));
    const maxX = Math.max(...data.map(d => d.x));
    
    for (let x = minX - 10; x <= maxX + 10; x += (maxX - minX) / 50) {
      points.push({
        x: x,
        probability: predict(x)
      });
    }
    return points;
  };

  const predictionData = generatePredictionLine();
  const currentCost = calculateCost(theta0, theta1);

  const class0Data = data.filter(d => d.y === 0);
  const class1Data = data.filter(d => d.y === 1);

  const decisionBoundaryX = theta1 !== 0 ? denormalizeX(-theta0 / theta1) : 0;
  
  // Calculate comprehensive statistics
  const stats = calculateStatistics();
  const { confusionMatrix, accuracy, precision, recall, f1Score } = stats;
  
  // Prepare data for different visualizations
  const rocData = [];
  for (let threshold = 0; threshold <= 1; threshold += 0.05) {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    data.forEach(point => {
      const pred = predict(point.x) >= threshold ? 1 : 0;
      if (point.y === 1 && pred === 1) tp++;
      else if (point.y === 0 && pred === 1) fp++;
      else if (point.y === 0 && pred === 0) tn++;
      else if (point.y === 1 && pred === 0) fn++;
    });
    const tpr = tp / (tp + fn) || 0;
    const fpr = fp / (fp + tn) || 0;
    rocData.push({ threshold, tpr, fpr });
  }
  
  // Feature importance visualization data
  const featureData = [
    { feature: dataExample === 'exam' ? 'Study Hours' : dataExample === 'email' ? 'Spam Words' : 'Age', 
      importance: Math.abs(theta1), 
      coefficient: theta1 
    }
  ];
  
  // Class distribution pie chart data
  const classDistribution = [
    { name: 'Class 0', value: class0Data.length, fill: '#3B82F6' },
    { name: 'Class 1', value: class1Data.length, fill: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Complete Visualization</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-lg">
          সব concepts একসাথে দেখুন - data points, probability curve, decision boundary, 
          এবং training process!
        </p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <button
            onClick={() => setSelectedVisualization('scatter')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedVisualization === 'scatter' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Data & Boundary
          </button>
          <button
            onClick={() => setSelectedVisualization('metrics')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedVisualization === 'metrics' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Performance Metrics
          </button>
          <button
            onClick={() => setSelectedVisualization('roc')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedVisualization === 'roc' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            ROC Curve
          </button>
          <button
            onClick={() => setSelectedVisualization('distribution')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedVisualization === 'distribution' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <PieChartIcon className="w-4 h-4" />
            Distribution
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Dataset Selection</h3>
          <select
            value={dataExample}
            onChange={(e) => setDataExample(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="email">Email Spam Detection</option>
            <option value="exam">Exam Pass/Fail</option>
            <option value="disease">Disease Prediction</option>
            <option value="creditScore">Credit Score (Loan)</option>
          </select>
        </div>

        {selectedVisualization === 'scatter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Data Points & Decision Boundary</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number"
                    dataKey="x" 
                    name="x"
                    label={{ value: dataExample === 'exam' ? 'Study Hours' : dataExample === 'email' ? 'Spam Words' : dataExample === 'creditScore' ? 'Credit Score' : 'Age', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    type="number"
                    dataKey="y"
                    name="y"
                    domain={[-0.1, 1.1]}
                    label={{ value: 'Class', angle: -90, position: 'insideLeft' }}
                    ticks={[0, 1]}
                  />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'y') return value === 0 ? 'Class 0' : 'Class 1';
                    return value;
                  }} />
                  <Scatter name="Class 0" data={class0Data} fill="#3B82F6" />
                  <Scatter name="Class 1" data={class1Data} fill="#EF4444" />
                  {theta1 !== 0 && (
                    <Scatter
                      name="Decision Boundary"
                      data={[{x: decisionBoundaryX, y: 0.5}]}
                      fill="#10B981"
                      shape="diamond"
                      size={100}
                    />
                  )}
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                <p><strong>Decision Boundary:</strong> x = {decisionBoundaryX.toFixed(2)}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Points to the right are classified as Class 1
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Probability Curve</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="x" 
                    label={{ value: dataExample === 'exam' ? 'Study Hours' : dataExample === 'email' ? 'Spam Words' : dataExample === 'creditScore' ? 'Credit Score' : 'Age', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    domain={[0, 1]}
                    label={{ value: 'P(Class 1)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  <Line 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={false}
                    name="Probability"
                  />
                  <Line 
                    data={[{x: Math.min(...data.map(d => d.x)), probability: 0.5}, 
                           {x: Math.max(...data.map(d => d.x)), probability: 0.5}]}
                    stroke="#FF0000"
                    strokeDasharray="5 5"
                    name="Decision Threshold"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-2 bg-green-50 p-3 rounded text-sm">
                <p><strong>Sigmoid Parameters:</strong> θ₀ = {theta0.toFixed(3)}, θ₁ = {theta1.toFixed(3)}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Steepness controlled by θ₁, position by θ₀
                </p>
              </div>
            </div>
          </div>
        )}
        
        {selectedVisualization === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-blue-700">{(accuracy * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-600">Precision</p>
                <p className="text-2xl font-bold text-green-700">{(precision * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-gray-600">Recall</p>
                <p className="text-2xl font-bold text-purple-700">{(recall * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-sm text-gray-600">F1 Score</p>
                <p className="text-2xl font-bold text-orange-700">{f1Score.toFixed(3)}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Confusion Matrix
              </h4>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div></div>
                <div className="text-center font-semibold">Predicted 0</div>
                <div className="text-center font-semibold">Predicted 1</div>
                
                <div className="text-right font-semibold">Actual 0</div>
                <div className="bg-green-100 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-green-700">{confusionMatrix.trueNegative}</p>
                  <p className="text-xs text-gray-600">True Negative</p>
                </div>
                <div className="bg-red-100 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-red-700">{confusionMatrix.falsePositive}</p>
                  <p className="text-xs text-gray-600">False Positive</p>
                </div>
                
                <div className="text-right font-semibold">Actual 1</div>
                <div className="bg-orange-100 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-orange-700">{confusionMatrix.falseNegative}</p>
                  <p className="text-xs text-gray-600">False Negative</p>
                </div>
                <div className="bg-blue-100 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-blue-700">{confusionMatrix.truePositive}</p>
                  <p className="text-xs text-gray-600">True Positive</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Metric Explanations:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Accuracy:</strong> Overall correct predictions / Total predictions</p>
                <p><strong>Precision:</strong> True Positives / (True Positives + False Positives)</p>
                <p><strong>Recall:</strong> True Positives / (True Positives + False Negatives)</p>
                <p><strong>F1 Score:</strong> Harmonic mean of Precision and Recall</p>
              </div>
            </div>
          </div>
        )}
        
        {selectedVisualization === 'roc' && (
          <div>
            <h4 className="font-semibold mb-4">ROC Curve (Receiver Operating Characteristic)</h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={rocData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="fpr" 
                  label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
                  domain={[0, 1]}
                />
                <YAxis 
                  dataKey="tpr"
                  label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                  domain={[0, 1]}
                />
                <Tooltip formatter={(value) => value.toFixed(3)} />
                <Line 
                  type="monotone" 
                  dataKey="tpr" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={false}
                  name="ROC Curve"
                />
                <Line 
                  data={[{fpr: 0, tpr: 0}, {fpr: 1, tpr: 1}]}
                  stroke="#EF4444"
                  strokeDasharray="5 5"
                  name="Random Classifier"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-blue-50 p-4 rounded">
              <p className="text-sm">
                <strong>AUC (Area Under Curve):</strong> 
                {' ' + (rocData.reduce((sum, point, idx) => {
                  if (idx === 0) return sum;
                  const width = rocData[idx].fpr - rocData[idx-1].fpr;
                  const height = (rocData[idx].tpr + rocData[idx-1].tpr) / 2;
                  return sum + width * height;
                }, 0)).toFixed(3)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                AUC closer to 1 indicates better model performance
              </p>
            </div>
          </div>
        )}
        
        {selectedVisualization === 'distribution' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Class Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={classDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value} (${(entry.value/data.length*100).toFixed(1)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {classDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Feature Coefficient</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="feature" />
                  <YAxis label={{ value: 'Coefficient Value', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="coefficient" fill={theta1 > 0 ? '#10B981' : '#EF4444'}>
                    <Cell fill={theta1 > 0 ? '#10B981' : '#EF4444'} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                <p>
                  {theta1 > 0 ? 
                    `Positive coefficient: Higher ${featureData[0].feature.toLowerCase()} → Higher probability of Class 1` :
                    `Negative coefficient: Higher ${featureData[0].feature.toLowerCase()} → Lower probability of Class 1`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Model Training & Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600">Current Parameters</p>
            <p className="font-semibold">θ₀ = {theta0.toFixed(4)}</p>
            <p className="font-semibold">θ₁ = {theta1.toFixed(4)}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600">Current Cost</p>
            <p className="text-2xl font-bold text-red-600">{currentCost.toFixed(4)}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600">Training Status</p>
            <p className="text-lg font-semibold">
              {isTraining ? 'Training...' : costHistory.length > 0 ? 'Trained' : 'Not trained'}
            </p>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={trainModel}
            disabled={isTraining}
            className={`flex-1 px-4 py-2 rounded ${
              isTraining 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isTraining ? 'Training...' : 'Train Model'}
          </button>
          
          <button
            onClick={resetModel}
            disabled={isTraining}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
          >
            Reset Model
          </button>
        </div>

        {costHistory.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Training Progress</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={costHistory.map((cost, idx) => ({ iteration: idx, cost }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Detailed Model Predictions</h3>
        
        <div className="mb-4 flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showMetrics}
              onChange={(e) => setShowMetrics(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Show detailed metrics</span>
          </label>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Data Point</th>
                <th className="border px-4 py-2">X Value</th>
                <th className="border px-4 py-2">Actual</th>
                <th className="border px-4 py-2">P(Class 1)</th>
                <th className="border px-4 py-2">Predicted</th>
                <th className="border px-4 py-2">Result</th>
                {showMetrics && <th className="border px-4 py-2">Error</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((point, idx) => {
                const prob = predict(point.x);
                const predClass = prob >= 0.5 ? 1 : 0;
                const isCorrect = predClass === point.y;
                const error = Math.abs(point.y - prob);
                
                return (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="border px-4 py-2 text-sm">{point.label}</td>
                    <td className="border px-4 py-2 text-center">{point.x}</td>
                    <td className="border px-4 py-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        point.y === 1 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        Class {point.y}
                      </span>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full"
                            style={{ width: `${prob * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">{(prob * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        predClass === 1 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        Class {predClass}
                      </span>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                      )}
                    </td>
                    {showMetrics && (
                      <td className="border px-4 py-2 text-center">
                        <span className={`text-sm ${
                          error < 0.2 ? 'text-green-600' : error < 0.5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {error.toFixed(3)}
                        </span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-sm text-gray-600">Total Samples</p>
            <p className="text-lg font-bold">{data.length}</p>
          </div>
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="text-sm text-gray-600">Correct Predictions</p>
            <p className="text-lg font-bold text-green-700">
              {data.filter(point => (predict(point.x) >= 0.5 ? 1 : 0) === point.y).length}
            </p>
          </div>
          <div className="bg-red-50 p-3 rounded border border-red-200">
            <p className="text-sm text-gray-600">Incorrect Predictions</p>
            <p className="text-lg font-bold text-red-700">
              {data.filter(point => (predict(point.x) >= 0.5 ? 1 : 0) !== point.y).length}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <p className="text-sm text-gray-600">Overall Accuracy</p>
            <p className="text-lg font-bold text-blue-700">
              {(accuracy * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          Key Insights & Interpretation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold mb-2">Model Performance</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Accuracy: {(accuracy * 100).toFixed(1)}% of predictions are correct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>Decision boundary at x = {decisionBoundaryX.toFixed(2)}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Current cost: {currentCost.toFixed(4)}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold mb-2">Interpretation Guide</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Steeper curve = More confident predictions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span>Curve shift right/left = Decision boundary moves</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>Points near boundary = Uncertain predictions</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 bg-yellow-50 p-3 rounded">
          <p className="text-sm">
            <strong>Pro Tip:</strong> For {dataExample} prediction, 
            {dataExample === 'exam' && ' students need approximately ' + decisionBoundaryX.toFixed(0) + ' hours of study to have 50% chance of passing.'}
            {dataExample === 'email' && ' emails with more than ' + decisionBoundaryX.toFixed(0) + ' spam words have >50% chance of being spam.'}
            {dataExample === 'disease' && ' patients older than ' + decisionBoundaryX.toFixed(0) + ' years have >50% chance of having the disease.'}
            {dataExample === 'creditScore' && ' credit scores above ' + decisionBoundaryX.toFixed(0) + ' have >50% chance of loan approval.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompleteVisualization;