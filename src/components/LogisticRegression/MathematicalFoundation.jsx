import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, AreaChart, Area } from 'recharts';
import { Calculator, Brain, TrendingUp, BookOpen, Lightbulb, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const MathematicalFoundation = ({ sigmoid, data, dataExample }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showDerivation, setShowDerivation] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('logistic');
  
  // Generate data for visualizations
  const generateLogisticData = () => {
    const data = [];
    for (let z = -10; z <= 10; z += 0.5) {
      data.push({
        z: z,
        sigmoid: sigmoid(z),
        linear: z > 0 ? 1 : 0,
        tanh: Math.tanh(z)
      });
    }
    return data;
  };
  
  const logisticData = generateLogisticData();
  
  // Maximum Likelihood Estimation example
  const mleExample = [
    { x: 10, y: 0, prob: 0.1, likelihood: 0.9 },
    { x: 20, y: 0, prob: 0.2, likelihood: 0.8 },
    { x: 30, y: 0, prob: 0.4, likelihood: 0.6 },
    { x: 40, y: 1, prob: 0.6, likelihood: 0.6 },
    { x: 50, y: 1, prob: 0.8, likelihood: 0.8 },
    { x: 60, y: 1, prob: 0.9, likelihood: 0.9 }
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mathematical Foundation</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-lg mb-4">
          Logistic Regression এর mathematical foundation বুঝতে হলে আমাদের জানতে হবে কিভাবে 
          linear output কে probability তে convert করা হয়।
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setSelectedTopic('logistic')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTopic === 'logistic' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Calculator className="inline w-4 h-4 mr-2" />
            Logistic Function
          </button>
          <button
            onClick={() => setSelectedTopic('mle')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTopic === 'mle' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Brain className="inline w-4 h-4 mr-2" />
            Maximum Likelihood
          </button>
          <button
            onClick={() => setSelectedTopic('gradient')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTopic === 'gradient' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <TrendingUp className="inline w-4 h-4 mr-2" />
            Gradient Derivation
          </button>
        </div>
      </div>

      {selectedTopic === 'logistic' && (
        <>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Hypothesis Function</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">Logistic Regression এ আমরা দুটি step এ কাজ করি:</p>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="font-semibold mb-3">Step 1: Linear Combination</p>
                  <div className="text-center text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                    <span>z = θ</span><sub>0</sub>
                    <span> + θ</span><sub>1</sub><span>x</span><sub>1</sub>
                    <span> + θ</span><sub>2</sub><span>x</span><sub>2</sub>
                    <span> + ... + θ</span><sub>n</sub><span>x</span><sub>n</sub>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>For our {dataExample} example with one feature:</p>
                    <p className="font-mono mt-1">z = θ₀ + θ₁ × {dataExample === 'exam' ? 'study_hours' : dataExample === 'email' ? 'spam_words' : 'age'}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="font-semibold mb-3">Step 2: Sigmoid Function</p>
                  <div className="text-center">
                    <div className="text-xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                      <span>h(x) = σ(z) = </span>
                      <div className="inline-block align-middle">
                        <div className="text-center" style={{ lineHeight: '1' }}>
                          <div>1</div>
                          <div className="border-t border-gray-700 px-4"></div>
                          <div>1 + e<sup>−z</sup></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <p className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    Numerical Example
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>Let's calculate for θ₀ = -2, θ₁ = 0.1, x = 30:</p>
                    <p className="font-mono">z = -2 + 0.1 × 30 = -2 + 3 = 1</p>
                    <p className="font-mono">σ(1) = 1/(1 + e⁻¹) = 1/(1 + 0.368) = 0.731</p>
                    <p>Probability = 73.1% → Predict class 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Sigmoid vs Other Functions</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={logisticData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="z" label={{ value: 'z value', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Output', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="sigmoid" stroke="#3B82F6" name="Sigmoid" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="linear" stroke="#EF4444" name="Step Function" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="tanh" stroke="#10B981" name="Tanh" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-700">Sigmoid</p>
                <p>Smooth, interpretable as probability</p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="font-semibold text-red-700">Step Function</p>
                <p>Not differentiable at z=0</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-700">Tanh</p>
                <p>Output range: [-1, 1]</p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedTopic === 'mle' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              Maximum Likelihood Estimation (MLE)
            </h3>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <p className="text-sm">
                MLE finds parameters that maximize the probability of observing our data.
                For binary classification, we want to maximize:
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold mb-3">Likelihood Function:</p>
              <div className="text-center text-xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                <span>L(θ) = </span>
                <span className="text-2xl">∏</span>
                <span> [h(x</span><sup>(i)</sup><span>)]</span><sup>y<sup>(i)</sup></sup>
                <span> [1 - h(x</span><sup>(i)</sup><span>)]</span><sup>1-y<sup>(i)</sup></sup>
              </div>
              
              <p className="font-semibold mb-3">Log Likelihood (easier to work with):</p>
              <div className="text-center text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                <span>log L(θ) = </span>
                <span className="text-2xl">∑</span>
                <span> [y</span><sup>(i)</sup>
                <span> log h(x</span><sup>(i)</sup>
                <span>) + (1-y</span><sup>(i)</sup>
                <span>) log(1-h(x</span><sup>(i)</sup><span>))]</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Example Calculation:</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">x</th>
                      <th className="border px-4 py-2">y (actual)</th>
                      <th className="border px-4 py-2">h(x) (predicted)</th>
                      <th className="border px-4 py-2">Likelihood Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mleExample.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="border px-4 py-2 text-center">{row.x}</td>
                        <td className="border px-4 py-2 text-center">{row.y}</td>
                        <td className="border px-4 py-2 text-center">{row.prob.toFixed(2)}</td>
                        <td className="border px-4 py-2 text-center">{row.likelihood.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-yellow-50 p-4 rounded">
                <p className="text-sm">
                  <strong>Total Log Likelihood:</strong> {mleExample.reduce((sum, row) => sum + Math.log(row.likelihood), 0).toFixed(3)}
                </p>
                <p className="text-sm mt-2">
                  Higher likelihood = Better model fit to the data
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedTopic === 'gradient' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Gradient Derivation
            </h3>
            
            <button
              onClick={() => setShowDerivation(!showDerivation)}
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
            >
              {showDerivation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showDerivation ? 'Hide' : 'Show'} Detailed Derivation
            </button>
            
            {showDerivation && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Step 1: Cost Function</p>
                  <div className="text-center" style={{ fontFamily: 'Georgia, serif' }}>
                    <span>J(θ) = -</span>
                    <div className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>1</div>
                        <div className="border-t border-gray-700 px-2"></div>
                        <div>m</div>
                      </div>
                    </div>
                    <span className="text-xl align-middle mx-2">∑</span>
                    <span>[y</span><sup>(i)</sup>
                    <span> log(h(x</span><sup>(i)</sup>
                    <span>)) + (1-y</span><sup>(i)</sup>
                    <span>) log(1-h(x</span><sup>(i)</sup><span>))]</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Step 2: Derivative of Sigmoid</p>
                  <div className="text-center" style={{ fontFamily: 'Georgia, serif' }}>
                    <div className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>dσ(z)</div>
                        <div className="border-t border-gray-700 px-2"></div>
                        <div>dz</div>
                      </div>
                    </div>
                    <span> = σ(z)(1 - σ(z))</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Step 3: Chain Rule Application</p>
                  <div className="text-center" style={{ fontFamily: 'Georgia, serif' }}>
                    <div className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>∂J</div>
                        <div className="border-t border-gray-700 px-2"></div>
                        <div>∂θ<sub>j</sub></div>
                      </div>
                    </div>
                    <span> = </span>
                    <div className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>1</div>
                        <div className="border-t border-gray-700 px-2"></div>
                        <div>m</div>
                      </div>
                    </div>
                    <span className="text-xl align-middle mx-2">∑</span>
                    <span>(h(x</span><sup>(i)</sup>
                    <span>) - y</span><sup>(i)</sup>
                    <span>)x</span><sub>j</sub><sup>(i)</sup>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-blue-700">Final Gradient Update Rule:</p>
                  <div className="text-center text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    <span>θ</span><sub>j</sub>
                    <span> := θ</span><sub>j</sub>
                    <span> - α × </span>
                    <div className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>1</div>
                        <div className="border-t border-gray-700 px-2"></div>
                        <div>m</div>
                      </div>
                    </div>
                    <span className="text-xl align-middle mx-2">∑</span>
                    <span>(h(x</span><sup>(i)</sup>
                    <span>) - y</span><sup>(i)</sup>
                    <span>)x</span><sub>j</sub><sup>(i)</sup>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-700">Key Insight:</h4>
              <p className="text-sm">
                The gradient for logistic regression has the same form as linear regression!
                The difference is that h(x) uses the sigmoid function instead of a linear function.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">কেন Sigmoid Function?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">✅ Output Range</h4>
            <p>সবসময় ০ থেকে ১ এর মধ্যে output দেয়</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">📈 Smooth Curve</h4>
            <p>Differentiable, gradient descent এর জন্য উপযুক্ত</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">🎯 Threshold</h4>
            <p>z=0 এ probability 0.5, decision boundary তৈরি করে</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">📊 Interpretable</h4>
            <p>Output directly probability হিসেবে interpret করা যায়</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Decision Boundary</h3>
        
        <div className="bg-orange-50 p-6 rounded-lg">
          <p className="mb-4">
            Decision boundary হল সেই line/curve যা দুটি class কে আলাদা করে:
          </p>
          
          <div className="bg-white p-4 rounded border border-orange-200">
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-lg">যদি </span>
                <span className="font-mono text-lg text-blue-600">h(x) ≥ 0.5</span>
                <span className="text-lg">, তাহলে predict করি </span>
                <span className="font-mono text-lg text-green-600">y = 1</span>
              </div>
              <div className="text-center">
                <span className="text-lg">যদি </span>
                <span className="font-mono text-lg text-blue-600">h(x) &lt; 0.5</span>
                <span className="text-lg">, তাহলে predict করি </span>
                <span className="font-mono text-lg text-red-600">y = 0</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <p className="text-center font-semibold mb-2">Decision boundary:</p>
                <div className="text-center text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                  <span>θ</span><sub>0</sub>
                  <span> + θ</span><sub>1</sub><span>x = 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Practical Examples with Real Data
        </h3>
        
        {data && data.length > 0 && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded">
              <h4 className="font-semibold mb-2">Current Dataset: {dataExample}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total samples:</p>
                  <p className="text-lg font-bold">{data.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class distribution:</p>
                  <p className="text-sm">
                    Class 0: {data.filter(d => d.y === 0).length} | 
                    Class 1: {data.filter(d => d.y === 1).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded">
              <h4 className="font-semibold mb-2">Example Calculations:</h4>
              <div className="space-y-3">
                {data.slice(0, 3).map((point, idx) => {
                  const z = -2 + 0.1 * point.x; // Example parameters
                  const prob = sigmoid(z);
                  return (
                    <div key={idx} className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-medium">Sample {idx + 1}: x = {point.x}</p>
                      <p className="font-mono">z = -2 + 0.1 × {point.x} = {z.toFixed(2)}</p>
                      <p className="font-mono">σ({z.toFixed(2)}) = {prob.toFixed(3)}</p>
                      <p>
                        Prediction: {prob >= 0.5 ? 'Class 1' : 'Class 0'} | 
                        Actual: Class {point.y}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-purple-600" />
          Important Mathematical Properties
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold mb-2">Sigmoid Properties</h4>
            <ul className="space-y-2 text-sm">
              <li>• Range: (0, 1)</li>
              <li>• σ(0) = 0.5</li>
              <li>• σ(-z) = 1 - σ(z)</li>
              <li>• Derivative: σ'(z) = σ(z)(1 - σ(z))</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold mb-2">Logistic Regression Assumptions</h4>
            <ul className="space-y-2 text-sm">
              <li>• Binary outcome variable</li>
              <li>• Linear relationship between log odds and features</li>
              <li>• No multicollinearity</li>
              <li>• Large sample size</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicalFoundation;