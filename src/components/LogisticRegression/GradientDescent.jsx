import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ScatterChart, Scatter } from 'recharts';
import { TrendingDown, Activity, Zap, Target, ArrowDown, ArrowUp, Play, Pause, RotateCcw, Lightbulb, Mountain } from 'lucide-react';

const GradientDescent = ({ 
  theta0, 
  theta1, 
  setTheta0, 
  setTheta1, 
  learningRate, 
  setLearningRate,
  costHistory,
  isTraining,
  trainModel,
  resetModel
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [selectedConcept, setSelectedConcept] = useState('overview');
  
  // Animation steps for gradient descent
  const animationSteps = [
    { step: 1, desc: 'Calculate current predictions', bengali: 'বর্তমান prediction হিসাব করুন' },
    { step: 2, desc: 'Calculate error for each example', bengali: 'প্রতিটি example এর error বের করুন' },
    { step: 3, desc: 'Calculate gradients', bengali: 'Gradient হিসাব করুন' },
    { step: 4, desc: 'Update parameters', bengali: 'Parameters update করুন' },
    { step: 5, desc: 'Check if cost decreased', bengali: 'Cost কমেছে কিনা দেখুন' }
  ];
  
  useEffect(() => {
    if (showAnimation && animationStep < animationSteps.length) {
      const timer = setTimeout(() => {
        setAnimationStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, animationStep]);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gradient Descent for Logistic Regression</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-lg">
          Gradient Descent algorithm ব্যবহার করে আমরা cost function minimize করি এবং 
          optimal parameters (θ₀, θ₁) খুঁজে বের করি।
        </p>
      </div>
      
      {/* Visual Analogy */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          সহজ ভাষায় Gradient Descent
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Mountain className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold">পাহাড় থেকে নামা</h4>
            </div>
            <p className="text-sm text-gray-600">
              একটি অন্ধকার পাহাড়ে আছেন। নিচে যেতে হবে (minimum cost)। 
              প্রতি পদক্ষেপে ঢাল দেখে নিচের দিকে যান।
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">লক্ষ্য</h4>
            </div>
            <p className="text-sm text-gray-600">
              সবচেয়ে নিচের point (lowest cost) খুঁজে বের করা। 
              যেখানে model সবচেয়ে কম ভুল করবে।
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold">Learning Rate</h4>
            </div>
            <p className="text-sm text-gray-600">
              কত বড় পদক্ষেপ নেবেন। খুব বড় = miss করতে পারেন। 
              খুব ছোট = অনেক সময় লাগবে।
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm flex items-start gap-2">
            <Activity className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              <strong>মনে রাখুন:</strong> Gradient = ঢাল/slope। Descent = নিচে নামা। 
              Gradient Descent = ঢাল দেখে নিচে নামা!
            </span>
          </p>
        </div>
      </div>
      
      {/* Interactive Animation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Step-by-Step Process</h3>
        
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => {
              setShowAnimation(!showAnimation);
              if (!showAnimation) setAnimationStep(0);
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              showAnimation ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {showAnimation ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {showAnimation ? 'Pause' : 'Start'} Animation
          </button>
          <button
            onClick={() => {
              setAnimationStep(0);
              setShowAnimation(false);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        <div className="space-y-3">
          {animationSteps.map((step, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                idx < animationStep 
                  ? 'bg-green-50 border-2 border-green-300' 
                  : idx === animationStep && showAnimation
                  ? 'bg-blue-50 border-2 border-blue-300 animate-pulse'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                idx < animationStep ? 'bg-green-500 text-white' : 
                idx === animationStep && showAnimation ? 'bg-blue-500 text-white' : 
                'bg-gray-300 text-gray-600'
              }`}>
                {step.step}
              </div>
              <div>
                <p className="font-medium">{step.desc}</p>
                <p className="text-sm text-gray-600">{step.bengali}</p>
                {idx === 0 && animationStep > 0 && (
                  <p className="text-xs mt-1 font-mono">h(x) = σ(θ₀ + θ₁x)</p>
                )}
                {idx === 1 && animationStep > 1 && (
                  <p className="text-xs mt-1 font-mono">error = h(x) - y</p>
                )}
                {idx === 2 && animationStep > 2 && (
                  <p className="text-xs mt-1 font-mono">∂J/∂θ = (1/m) × Σ(error × x)</p>
                )}
                {idx === 3 && animationStep > 3 && (
                  <p className="text-xs mt-1 font-mono">θ_new = θ_old - α × gradient</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {animationStep >= animationSteps.length && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-green-700 font-medium">One iteration complete! Repeat until convergence.</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Update Rules</h3>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="mb-4">Logistic Regression এর gradient descent rules:</p>
          
          <div className="space-y-3">
            <div className="bg-white p-4 rounded border border-gray-200">
              <div className="text-center text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                <span>θ</span><sub>0</sub>
                <span> = θ</span><sub>0</sub>
                <span> − α × </span>
                <div className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>1</div>
                    <div className="border-t border-gray-700 px-2"></div>
                    <div>m</div>
                  </div>
                </div>
                <span className="text-2xl align-middle mx-2">∑</span>
                <span>(h(x</span><sup>(i)</sup><span>) − y</span><sup>(i)</sup><span>)</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded border border-gray-200">
              <div className="text-center text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                <span>θ</span><sub>1</sub>
                <span> = θ</span><sub>1</sub>
                <span> − α × </span>
                <div className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>1</div>
                    <div className="border-t border-gray-700 px-2"></div>
                    <div>m</div>
                  </div>
                </div>
                <span className="text-2xl align-middle mx-2">∑</span>
                <span>(h(x</span><sup>(i)</sup><span>) − y</span><sup>(i)</sup><span>) × x</span><sup>(i)</sup>
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-sm">
            যেখানে α = learning rate, m = number of examples, h(x) = sigmoid function
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Parameters Control</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                θ₀ (Bias): {theta0.toFixed(4)}
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.01"
                value={theta0}
                onChange={(e) => setTheta0(parseFloat(e.target.value))}
                className="w-full"
                disabled={isTraining}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                θ₁ (Weight): {theta1.toFixed(4)}
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.01"
                value={theta1}
                onChange={(e) => setTheta1(parseFloat(e.target.value))}
                className="w-full"
                disabled={isTraining}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Learning Rate (α): {learningRate}
              </label>
              <input
                type="range"
                min="0.001"
                max="0.1"
                step="0.001"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full"
                disabled={isTraining}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={trainModel}
                disabled={isTraining}
                className={`flex-1 px-4 py-2 rounded ${
                  isTraining 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isTraining ? 'Training...' : 'Start Training'}
              </button>
              
              <button
                onClick={resetModel}
                disabled={isTraining}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Cost History</h3>
          
          {costHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={costHistory.map((cost, idx) => ({ iteration: idx, cost }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Click "Start Training" to see cost history</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Learning Rate এর প্রভাব (Visual)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-semibold text-red-600 mb-2">Too Small (α &lt; 0.01)</h4>
            <div className="mb-2">
              <div className="flex items-center gap-1">
                {[...Array(8)].map((_, i) => (
                  <ArrowDown key={i} className="w-3 h-3 text-red-400" />
                ))}
              </div>
            </div>
            <p className="text-sm">খুব ধীরে converge করবে, অনেক iterations লাগবে</p>
            <div className="mt-2 bg-red-50 p-2 rounded text-xs text-center">
              🐌 Slow progress
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-semibold text-green-600 mb-2">Just Right (α ≈ 0.01-0.05)</h4>
            <div className="mb-2">
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <ArrowDown key={i} className="w-4 h-4 text-green-500" />
                ))}
              </div>
            </div>
            <p className="text-sm">ভালো speed এ converge করবে</p>
            <div className="mt-2 bg-green-50 p-2 rounded text-xs text-center">
              ✅ Perfect balance
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-semibold text-red-600 mb-2">Too Large (α &gt; 0.1)</h4>
            <div className="mb-2">
              <div className="flex items-center gap-3">
                <ArrowDown className="w-6 h-6 text-red-600" />
                <ArrowUp className="w-6 h-6 text-red-600" />
                <ArrowDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm">Overshoot করতে পারে, diverge হতে পারে</p>
            <div className="mt-2 bg-red-50 p-2 rounded text-xs text-center">
              ⚠️ Unstable jumps
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded">
          <p className="text-sm font-medium mb-2">Visual Representation:</p>
          <div className="relative h-32 bg-gray-100 rounded overflow-hidden">
            {/* Mountain visual */}
            <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full">
              <path 
                d="M 0 80 Q 75 20 150 60 T 300 80" 
                fill="none" 
                stroke="#6B7280" 
                strokeWidth="2"
              />
              
              {/* Small steps */}
              <g className="text-red-500">
                <circle cx="50" cy="65" r="3" fill="currentColor" />
                <circle cx="55" cy="63" r="3" fill="currentColor" />
                <circle cx="60" cy="61" r="3" fill="currentColor" />
                <circle cx="65" cy="59" r="3" fill="currentColor" />
                <text x="40" y="95" className="text-xs fill-current">Small α</text>
              </g>
              
              {/* Good steps */}
              <g className="text-green-500">
                <circle cx="150" cy="60" r="3" fill="currentColor" />
                <circle cx="165" cy="65" r="3" fill="currentColor" />
                <circle cx="180" cy="68" r="3" fill="currentColor" />
                <text x="140" y="95" className="text-xs fill-current">Good α</text>
              </g>
              
              {/* Large steps */}
              <g className="text-red-600">
                <circle cx="250" cy="70" r="3" fill="currentColor" />
                <circle cx="280" cy="30" r="3" fill="currentColor" />
                <circle cx="220" cy="40" r="3" fill="currentColor" />
                <text x="230" y="95" className="text-xs fill-current">Large α</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Key Differences from Linear Regression</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Hypothesis function এ sigmoid ব্যবহার</li>
          <li>Different cost function (cross-entropy vs MSE)</li>
          <li>Output interpretation: probability vs continuous value</li>
          <li>Decision boundary concept applicable</li>
          <li>Same gradient descent algorithm কিন্তু different derivatives</li>
        </ul>
      </div>
    </div>
  );
};

export default GradientDescent;