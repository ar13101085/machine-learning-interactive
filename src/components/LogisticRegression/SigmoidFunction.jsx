import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const SigmoidFunction = ({ sigmoid }) => {
  const [zValue, setZValue] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [selectedExample, setSelectedExample] = useState('email');
  
  const realWorldExamples = {
    email: {
      title: 'Email Spam Detection',
      lowZ: { value: -3, desc: 'Very few spam words', result: 'Definitely NOT spam' },
      midZ: { value: 0, desc: 'Some spam indicators', result: 'Uncertain (50/50)' },
      highZ: { value: 3, desc: 'Many spam words', result: 'Definitely SPAM' }
    },
    exam: {
      title: 'Pass/Fail Prediction',
      lowZ: { value: -2.5, desc: 'Low study hours', result: 'Likely to FAIL' },
      midZ: { value: 0, desc: 'Average preparation', result: 'Borderline' },
      highZ: { value: 2.5, desc: 'High study hours', result: 'Likely to PASS' }
    },
    loan: {
      title: 'Loan Approval',
      lowZ: { value: -4, desc: 'Poor credit score', result: 'REJECTED' },
      midZ: { value: 0, desc: 'Average credit', result: 'Needs review' },
      highZ: { value: 4, desc: 'Excellent credit', result: 'APPROVED' }
    }
  };
  
  const sigmoidData = [];
  for (let z = -10; z <= 10; z += 0.5) {
    sigmoidData.push({
      z: z,
      sigmoid: sigmoid(z)
    });
  }

  const currentPoint = {
    z: zValue,
    sigmoid: sigmoid(zValue)
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sigmoid Function Visualization</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-lg">
          Sigmoid function (logistic function নামেও পরিচিত) হল সেই mathematical function 
          যা যেকোনো real number কে ০ থেকে ১ এর মধ্যে convert করে।
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Interactive Sigmoid Visualization</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            z value: {zValue.toFixed(2)}
          </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={zValue}
            onChange={(e) => setZValue(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="bg-white p-6 rounded border border-gray-200 mb-4">
          <div className="text-center">
            <div className="text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
              <span>σ({zValue.toFixed(2)}) = </span>
              <div className="inline-block align-middle mx-2">
                <div className="text-center" style={{ lineHeight: '1' }}>
                  <div>1</div>
                  <div className="border-t border-gray-700 px-4"></div>
                  <div>1 + e<sup>−{zValue.toFixed(2)}</sup></div>
                </div>
              </div>
              <span> = {currentPoint.sigmoid.toFixed(4)}</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sigmoidData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="z" 
              label={{ value: 'z value', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'σ(z)', angle: -90, position: 'insideLeft' }}
              domain={[0, 1]}
            />
            <Tooltip />
            <ReferenceLine y={0.5} stroke="red" strokeDasharray="5 5" />
            <ReferenceLine x={0} stroke="gray" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              dataKey="sigmoid" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
            />
            <Line
              data={[currentPoint]}
              type="monotone"
              dataKey="sigmoid"
              stroke="#EF4444"
              strokeWidth={0}
              dot={{ r: 6, fill: '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">z → -∞</h4>
          <p>σ(z) → 0</p>
          <p className="text-sm mt-1">Very negative z gives probability ≈ 0</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">z = 0</h4>
          <p>σ(0) = 0.5</p>
          <p className="text-sm mt-1">Decision boundary এ probability = 0.5</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">z → +∞</h4>
          <p>σ(z) → 1</p>
          <p className="text-sm mt-1">Very positive z gives probability ≈ 1</p>
        </div>
      </div>

      {/* Real World Examples */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Real-World Examples</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(realWorldExamples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedExample === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="text-sm font-medium">{example.title}</p>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">{realWorldExamples[selectedExample].title}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['lowZ', 'midZ', 'highZ'].map((type) => {
              const example = realWorldExamples[selectedExample][type];
              const prob = sigmoid(example.value);
              
              return (
                <div 
                  key={type}
                  className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setZValue(example.value)}
                >
                  <div className="text-center mb-2">
                    <p className="text-sm font-medium">{example.desc}</p>
                    <p className="text-xs text-gray-600 mt-1">z = {example.value}</p>
                  </div>
                  
                  <div className="my-3">
                    <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full transition-all ${
                          prob < 0.3 ? 'bg-red-500' : prob > 0.7 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${prob * 100}%` }}
                      />
                    </div>
                    <p className="text-center text-sm mt-1">{(prob * 100).toFixed(1)}%</p>
                  </div>
                  
                  <p className={`text-center text-sm font-medium ${
                    prob < 0.3 ? 'text-red-600' : prob > 0.7 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {example.result}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visual Analogy */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">সহজ ভাষায় Sigmoid Function</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">পাহাড়ের উদাহরণ</h4>
            <p className="text-sm text-gray-600 mb-3">
              Sigmoid function একটি মসৃণ পাহাড়ের মত যা বাম দিকে 0 থেকে শুরু হয়ে ডান দিকে 1 এ শেষ হয়।
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span>বাম দিক (negative z): নিচে থাকে (0 এর কাছে)</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="w-4 h-4 text-yellow-500" />
                <span>মাঝখানে (z=0): ঠিক মাঝে (0.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>ডান দিক (positive z): উপরে থাকে (1 এর কাছে)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Switch/Button উদাহরণ</h4>
            <p className="text-sm text-gray-600 mb-3">
              Sigmoid একটি smooth switch এর মত - হঠাৎ করে on/off হয় না, ধীরে ধীরে transition হয়।
            </p>
            <div className="relative h-12 bg-gray-200 rounded-full p-1">
              <div 
                className="absolute top-1 h-10 w-10 bg-blue-500 rounded-full transition-all duration-500"
                style={{ left: `${Math.max(0, Math.min(88, (sigmoid(zValue) * 88)))}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <span className="text-xs font-medium">OFF (0)</span>
                <span className="text-xs font-medium">ON (1)</span>
              </div>
            </div>
            <p className="text-center text-sm mt-2">
              Current position: {(sigmoid(zValue) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Properties of Sigmoid Function</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">গাণিতিক বৈশিষ্ট্য</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <span>Output সবসময় 0 থেকে 1 এর মধ্যে</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <span>Monotonically increasing (সবসময় বাড়ে)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <span>z = 0 এ value = 0.5 (মাঝখানে)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">ব্যবহারিক সুবিধা</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <span>Probability হিসেবে interpret করা যায়</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <span>Smooth transition (no sudden jumps)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <span>Easy to compute derivative</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigmoidFunction;