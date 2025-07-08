import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, BarChart3, TrendingUp, Activity, Eye, EyeOff } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

const Statistics = ({ onComplete }) => {
  const [dataPoints, setDataPoints] = useState([85, 92, 78, 88, 95, 82, 90]);
  const [newValue, setNewValue] = useState('');
  const [selectedExample, setSelectedExample] = useState('exam');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showMedian, setShowMedian] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [outlierMode, setOutlierMode] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [dataset1, setDataset1] = useState([85, 92, 78, 88, 95]);
  const [dataset2, setDataset2] = useState([75, 82, 88, 91, 79]);

  const examples = {
    exam: {
      name: 'Exam Scores',
      bengali: 'পরীক্ষার নম্বর',
      unit: 'marks',
      data: [85, 92, 78, 88, 95, 82, 90]
    },
    temperature: {
      name: 'Daily Temperature',
      bengali: 'দৈনিক তাপমাত্রা',
      unit: '°C',
      data: [28, 30, 32, 29, 31, 33, 30]
    },
    sales: {
      name: 'Ice Cream Sales',
      bengali: 'আইসক্রিম বিক্রয়',
      unit: 'units',
      data: [45, 52, 38, 60, 55, 48, 50]
    }
  };

  const calculateMean = (data) => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, val) => acc + val, 0);
    return (sum / data.length).toFixed(2);
  };

  const calculateSum = (data) => {
    return data.reduce((acc, val) => acc + val, 0);
  };

  const calculateVariability = (data) => {
    if (data.length === 0) return { min: 0, max: 0, range: 0 };
    const min = Math.min(...data);
    const max = Math.max(...data);
    return { min, max, range: max - min };
  };

  const addDataPoint = () => {
    if (newValue && !isNaN(newValue)) {
      setDataPoints([...dataPoints, parseFloat(newValue)]);
      setNewValue('');
    }
  };

  const removeDataPoint = (index) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  const loadExample = (key) => {
    setSelectedExample(key);
    setDataPoints([...examples[key].data]);
  };

  const mean = calculateMean(dataPoints);
  const sum = calculateSum(dataPoints);
  const { min, max, range } = calculateVariability(dataPoints);
  
  const calculateMedian = (data) => {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };
  
  const calculateMode = (data) => {
    const frequency = {};
    data.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    return Object.keys(frequency)
      .filter(key => frequency[key] === maxFreq)
      .map(Number);
  };
  
  const detectOutliers = (data) => {
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    return data.filter(val => val < lowerBound || val > upperBound);
  };
  
  const median = calculateMedian(dataPoints);
  const mode = calculateMode(dataPoints);
  const outliers = detectOutliers(dataPoints);

  const chartData = dataPoints.map((value, index) => ({
    name: `Point ${index + 1}`,
    value: value,
    mean: parseFloat(mean)
  }));

  const visualizeSteps = () => {
    const steps = [];
    let runningSum = 0;
    dataPoints.forEach((value, index) => {
      runningSum += value;
      steps.push({
        step: index + 1,
        value: value,
        runningSum: runningSum,
        currentMean: (runningSum / (index + 1)).toFixed(2)
      });
    });
    return steps;
  };

  const quizQuestions = [
    {
      question: "5 জন ছাত্রের marks: 80, 85, 90, 75, 95। Average কত?",
      options: ['82', '85', '87', '90'],
      correct: 1
    },
    {
      question: "Mean/Average কি measure করে?",
      options: [
        'সবচেয়ে বড় value',
        'Central tendency বা কেন্দ্রীয় প্রবণতা',
        'সবচেয়ে ছোট value',
        'Total count'
      ],
      correct: 1
    },
    {
      question: "Σ (Sigma) symbol এর মানে কি?",
      options: ['Multiply', 'Divide', 'Sum/যোগফল', 'Average'],
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
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Basic Statistics (মৌলিক পরিসংখ্যান)</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Data Collection & Management</h4>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Example Datasets:</p>
            <div className="flex gap-2">
              {Object.entries(examples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => loadExample(key)}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedExample === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {example.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addDataPoint()}
                placeholder="Add new value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addDataPoint}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-40 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {dataPoints.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{value}</span>
                    <button
                      onClick={() => removeDataPoint(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-blue-700">Mean/Average (গড়)</span>
                <span className="text-2xl font-bold text-blue-600">{mean}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span style={{ fontFamily: 'Georgia, serif' }}>
                  Formula: Mean = 
                  <div className="inline-block align-middle mx-2">
                    <div className="text-center" style={{ lineHeight: '1' }}>
                      <div>Σx</div>
                      <div className="border-t border-gray-700 px-2"></div>
                      <div>n</div>
                    </div>
                  </div>
                  = 
                  <div className="inline-block align-middle mx-2">
                    <div className="text-center" style={{ lineHeight: '1' }}>
                      <div>{sum}</div>
                      <div className="border-t border-gray-700 px-2"></div>
                      <div>{dataPoints.length}</div>
                    </div>
                  </div>
                  = {mean}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Sum (Σ)</p>
                <p className="text-xl font-bold">{sum}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Count (n)</p>
                <p className="text-xl font-bold">{dataPoints.length}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Range</p>
                <p className="text-xl font-bold">{range}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Data Visualization</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6">
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={outlierMode && outliers.includes(entry.value) ? '#ef4444' : '#3b82f6'}
                  />
                ))}
              </Bar>
              <ReferenceLine y={parseFloat(mean)} stroke="#ef4444" strokeDasharray="5 5" />
              {showMedian && (
                <ReferenceLine y={median} stroke="#8b5cf6" strokeDasharray="3 3" />
              )}
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>Observation:</strong> লাল রেখা হলো mean/average। 
              কিছু value mean এর উপরে, কিছু নিচে - এটাই variability!
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Advanced Statistics</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <button
            onClick={() => setShowMedian(!showMedian)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              showMedian ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Median</span>
          </button>
          <button
            onClick={() => setShowMode(!showMode)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              showMode ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-sm">Mode</span>
          </button>
          <button
            onClick={() => setOutlierMode(!outlierMode)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              outlierMode ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {outlierMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            <span className="text-sm">Outliers</span>
          </button>
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
              comparisonMode ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm">Compare</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-600">Mean</p>
            <p className="text-xl font-bold text-blue-600">{mean}</p>
          </div>
          {showMedian && (
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-600">Median</p>
              <p className="text-xl font-bold text-purple-600">{median.toFixed(2)}</p>
            </div>
          )}
          {showMode && (
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-600">Mode</p>
              <p className="text-xl font-bold text-green-600">{mode.join(', ')}</p>
            </div>
          )}
          {outlierMode && outliers.length > 0 && (
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-600">Outliers</p>
              <p className="text-xl font-bold text-red-600">{outliers.join(', ')}</p>
            </div>
          )}
        </div>
        
        {(showMedian || showMode) && (
          <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>Central Tendency:</strong>
              {showMedian && ' Median হলো middle value।'}
              {showMode && ' Mode হলো most frequent value।'}
              Mean, Median, Mode - এই তিনটি different ways এ center measure করে।
            </p>
          </div>
        )}
      </div>
      
      {outlierMode && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Outlier Detection & Analysis</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 mb-2">What are Outliers?</h5>
              <p className="text-sm text-gray-700 mb-2">
                Outliers হলো এমন data points যা অন্যান্য data থেকে অনেক দূরে অবস্থিত।
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Unusual বা exceptional values</li>
                <li>• Mean calculation এ প্রভাব ফেলে</li>
                <li>• Data entry error বা genuine exception হতে পারে</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-700 mb-2">IQR Method</h5>
              <p className="text-sm text-gray-700 mb-2">
                Interquartile Range (IQR) method ব্যবহার করে outlier detect করা হয়:
              </p>
              <div className="bg-white p-2 rounded text-xs font-mono">
                <p>Q1 = 25th percentile</p>
                <p>Q3 = 75th percentile</p>
                <p>IQR = Q3 - Q1</p>
                <p>Lower Bound = Q1 - 1.5 × IQR</p>
                <p>Upper Bound = Q3 + 1.5 × IQR</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold text-yellow-700 mb-2">Current Dataset Analysis</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded">
                <p className="text-xs text-gray-600">Q1 (25%)</p>
                <p className="font-bold">{(() => {
                  const sorted = [...dataPoints].sort((a, b) => a - b);
                  return sorted[Math.floor(sorted.length * 0.25)];
                })()}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-xs text-gray-600">Q3 (75%)</p>
                <p className="font-bold">{(() => {
                  const sorted = [...dataPoints].sort((a, b) => a - b);
                  return sorted[Math.floor(sorted.length * 0.75)];
                })()}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-xs text-gray-600">IQR</p>
                <p className="font-bold">{(() => {
                  const sorted = [...dataPoints].sort((a, b) => a - b);
                  const q1 = sorted[Math.floor(sorted.length * 0.25)];
                  const q3 = sorted[Math.floor(sorted.length * 0.75)];
                  return q3 - q1;
                })()}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-xs text-gray-600">Outliers</p>
                <p className="font-bold text-red-600">
                  {outliers.length > 0 ? outliers.join(', ') : 'None'}
                </p>
              </div>
            </div>
          </div>
          
          {outliers.length > 0 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-700">
                <strong>Impact of Outliers:</strong> 
                {outliers.length} outlier(s) detected. These values are shown in red in the bar chart above.
                Outliers can significantly affect the mean but have less impact on the median.
              </p>
            </div>
          )}
        </div>
      )}
      
      {comparisonMode && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Dataset Comparison</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Dataset 1 (Class A)</p>
              <div className="flex flex-wrap gap-2">
                {dataset1.map((val, i) => (
                  <span key={i} className="bg-blue-100 px-2 py-1 rounded text-sm">
                    {val}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Mean: {calculateMean(dataset1)}, Range: {Math.max(...dataset1) - Math.min(...dataset1)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Dataset 2 (Class B)</p>
              <div className="flex flex-wrap gap-2">
                {dataset2.map((val, i) => (
                  <span key={i} className="bg-green-100 px-2 py-1 rounded text-sm">
                    {val}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Mean: {calculateMean(dataset2)}, Range: {Math.max(...dataset2) - Math.min(...dataset2)}
              </p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                data={dataset1.map((val, i) => ({ index: i + 1, value: val }))}
                dataKey="value"
                stroke="#3b82f6"
                name="Dataset 1"
              />
              <Line
                type="monotone"
                data={dataset2.map((val, i) => ({ index: i + 1, value: val }))}
                dataKey="value"
                stroke="#10b981"
                name="Dataset 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Step-by-Step Mean Calculation</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Step</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Running Sum</th>
                <th className="px-4 py-2 text-left">Current Mean</th>
              </tr>
            </thead>
            <tbody>
              {visualizeSteps().map((step, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{step.step}</td>
                  <td className="px-4 py-2">{step.value}</td>
                  <td className="px-4 py-2">{step.runningSum}</td>
                  <td className="px-4 py-2 font-semibold">{step.currentMean}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Key Concepts</h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 mb-1">Sum Notation (Σ)</h5>
              <p className="text-sm text-gray-700">
                Σ (Sigma) মানে যোগফল। যেমন: Σx = x₁ + x₂ + x₃ + ...
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-700 mb-1">Variability</h5>
              <p className="text-sm text-gray-700">
                Data কতটা ছড়িয়ে আছে তার পরিমাপ। Range = Max - Min
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-semibold text-purple-700 mb-1">Representative Value</h5>
              <p className="text-sm text-gray-700">
                Mean হলো সব data এর representative value
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Real-World Applications</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <p className="font-medium">Cricket Batting Average</p>
                <p className="text-sm text-gray-600">
                  Total runs ÷ Number of innings = Average
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-medium">Class Performance</p>
                <p className="text-sm text-gray-600">
                  সব ছাত্রের marks এর average = class average
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-purple-500 mt-1" />
              <div>
                <p className="font-medium">Daily Sales</p>
                <p className="text-sm text-gray-600">
                  Average daily sales predict করতে সাহায্য করে
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
                <p className="text-green-600">Great job! You understand basic statistics!</p>
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

export default Statistics;