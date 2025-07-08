import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GradientDescent = ({ 
  theta0, theta1, learningRate, setLearningRate, 
  costHistory, isTraining, setIsTraining, 
  performGradientDescentStep, resetModel,
  dataExamples, dataExample, calculateGradients
}) => {
  const [showMathDetails, setShowMathDetails] = useState(false);
  const [stepMode, setStepMode] = useState(false);

  const data = dataExamples[dataExample];
  const { gradientTheta0, gradientTheta1 } = calculateGradients(data, theta0, theta1);

  const handleSingleStep = () => {
    performGradientDescentStep();
  };

  const handleTrainingToggle = () => {
    setStepMode(false);
    setIsTraining(!isTraining);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Gradient Descent (গ্রেডিয়েন্ট ডিসেন্ট)</h3>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Gradient Descent কি?</h4>
        <p className="text-gray-600 mb-4">
          Gradient Descent হলো একটি optimization algorithm যা cost function কে minimize করার জন্য 
          ব্যবহার করা হয়। এটি পাহাড় থেকে নামার মতো - প্রতিটি step এ সবচেয়ে খাড়া পথে নিচে নামে।
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-blue-700">
            <strong>মূল ধারণা:</strong> Cost কমানোর জন্য parameters (θ₀, θ₁) কে ধীরে ধীরে update করা
          </p>
        </div>
      </div>

      {/* How Gradient Descent Works - Detailed Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          How Does Gradient Descent Work?
        </h4>
        
        {/* Step 1: The Mountain Analogy */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-blue-800 mb-4">Step 1: Understanding the Mountain Analogy</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-3">
                Imagine আপনি একটি পাহাড়ে আছেন অন্ধকারে। আপনার লক্ষ্য হলো সবচেয়ে নিচু জায়গায় পৌঁছানো।
              </p>
              <div className="bg-white p-3 rounded shadow-sm space-y-2">
                <p className="text-sm"><strong>🏔️ Mountain = Cost Function Surface</strong></p>
                <p className="text-sm"><strong>📍 Your Position = Current θ₀, θ₁ values</strong></p>
                <p className="text-sm"><strong>🎯 Valley (lowest point) = Optimal θ₀, θ₁</strong></p>
                <p className="text-sm"><strong>👟 Each Step = Parameter Update</strong></p>
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <svg width="250" height="200" viewBox="0 0 250 200" className="mx-auto">
                <defs>
                  {/* Gradient for 3D effect */}
                  <radialGradient id="mountain-gradient">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </radialGradient>
                  
                  {/* Arrow marker */}
                  <marker 
                    id="descent-arrow" 
                    markerWidth="8" 
                    markerHeight="6" 
                    refX="7" 
                    refY="3" 
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
                  </marker>
                </defs>
                
                {/* Grid background */}
                <g opacity="0.1">
                  {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map(x => (
                    <line key={`vgrid-${x}`} x1={x} y1="20" x2={x} y2="180" stroke="#000" strokeWidth="0.5"/>
                  ))}
                  {[40, 60, 80, 100, 120, 140, 160].map(y => (
                    <line key={`hgrid-${y}`} x1="20" y1={y} x2="230" y2={y} stroke="#000" strokeWidth="0.5"/>
                  ))}
                </g>
                
                {/* Cost function surface (bowl/parabola shape) */}
                <path 
                  d="M 20 40 Q 50 160, 125 170 T 230 40" 
                  fill="url(#mountain-gradient)" 
                  fillOpacity="0.3"
                  stroke="#3b82f6" 
                  strokeWidth="2"
                />
                
                {/* Contour lines to show depth */}
                <ellipse cx="125" cy="140" rx="80" ry="20" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
                <ellipse cx="125" cy="120" rx="60" ry="15" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
                <ellipse cx="125" cy="100" rx="40" ry="10" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
                
                {/* Valley point (global minimum) */}
                <circle cx="125" cy="170" r="6" fill="#10b981"/>
                <text x="125" y="190" fontSize="11" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  Global Minimum
                </text>
                
                {/* Starting position */}
                <circle cx="45" cy="55" r="6" fill="#ef4444"/>
                <text x="45" y="45" fontSize="11" fill="#ef4444" textAnchor="middle" fontWeight="bold">
                  Start
                </text>
                
                {/* Gradient descent path with steps */}
                <g>
                  {/* Step 1 */}
                  <line x1="45" y1="55" x2="65" y2="80" stroke="#dc2626" strokeWidth="2" markerEnd="url(#descent-arrow)"/>
                  <circle cx="65" cy="80" r="3" fill="#ef4444"/>
                  
                  {/* Step 2 */}
                  <line x1="65" y1="80" x2="85" y2="105" stroke="#dc2626" strokeWidth="2" markerEnd="url(#descent-arrow)"/>
                  <circle cx="85" cy="105" r="3" fill="#ef4444"/>
                  
                  {/* Step 3 */}
                  <line x1="85" y1="105" x2="105" y2="130" stroke="#dc2626" strokeWidth="2" markerEnd="url(#descent-arrow)"/>
                  <circle cx="105" cy="130" r="3" fill="#ef4444"/>
                  
                  {/* Step 4 */}
                  <line x1="105" y1="130" x2="120" y2="155" stroke="#dc2626" strokeWidth="2" markerEnd="url(#descent-arrow)"/>
                  <circle cx="120" cy="155" r="3" fill="#ef4444"/>
                  
                  {/* Final step */}
                  <line x1="120" y1="155" x2="125" y2="170" stroke="#dc2626" strokeWidth="2" markerEnd="url(#descent-arrow)"/>
                </g>
                
                {/* Labels */}
                <text x="100" y="60" fontSize="10" fill="#374151">High Cost</text>
                <text x="100" y="150" fontSize="10" fill="#374151">Low Cost</text>
                
                {/* Axis labels */}
                <text x="125" y="15" fontSize="12" fill="#000" textAnchor="middle" fontWeight="bold">
                  Cost Function J(θ)
                </text>
                <text x="10" y="110" fontSize="10" fill="#6b7280" transform="rotate(-90 10 110)">Cost</text>
                <text x="125" y="195" fontSize="10" fill="#6b7280" textAnchor="middle">Parameters (θ₀, θ₁)</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Step 2: Finding the Direction */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-green-800 mb-4">Step 2: How to Find Which Way to Go?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-3">
                <strong>Gradient (ঢাল)</strong> হলো slope বা steepness। এটি বলে দেয় কোন দিকে cost বাড়ছে।
              </p>
              <div className="bg-white p-3 rounded space-y-3">
                <div className="bg-red-50 p-2 rounded">
                  <p className="text-sm font-semibold text-red-700">Positive Gradient (+)</p>
                  <p className="text-xs">Cost increases in this direction → Go opposite way</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="text-sm font-semibold text-green-700">Negative Gradient (-)</p>
                  <p className="text-xs">Cost decreases in this direction → Go this way</p>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-sm font-semibold text-blue-700">Zero Gradient (0)</p>
                  <p className="text-xs">Flat surface → We've reached minimum!</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <h6 className="font-semibold text-gray-700 mb-2">Mathematical Intuition:</h6>
              <div className="space-y-2 text-sm">
                <p>📈 Derivative = Rate of change</p>
                <p>🎯 ∂J/∂θ = How much J changes when θ changes</p>
                <div className="bg-yellow-50 p-2 rounded mt-3">
                  <p className="font-semibold">Key Insight:</p>
                  <p className="text-xs">We move in the OPPOSITE direction of gradient to minimize cost!</p>
                  <p className="font-mono text-xs mt-1">θ_new = θ_old - (gradient)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Calculating Gradients */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-purple-800 mb-4">Step 3: Calculating the Gradients</h5>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="font-semibold text-gray-700 mb-2">Starting with our Cost Function:</p>
              <div className="text-center text-lg mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                <span>J(θ<sub>0</sub>, θ<sub>1</sub>) = </span>
                <div className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>1</div>
                    <div className="border-t border-gray-700 px-2"></div>
                    <div>2m</div>
                  </div>
                </div>
                <span className="mx-2">∑</span>
                <span>(h(x<sup>(i)</sup>) − y<sup>(i)</sup>)<sup>2</sup></span>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>where h(x) = θ<sub>0</sub> + θ<sub>1</sub>x</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded">
                <h6 className="font-semibold text-purple-700 mb-2">Gradient for θ₀:</h6>
                <div className="space-y-2 text-sm">
                  <div style={{ fontFamily: 'Georgia, serif' }}>
                    <span className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>∂J</div>
                        <div className="border-t border-gray-700 px-1"></div>
                        <div>∂θ<sub>0</sub></div>
                      </div>
                    </span>
                    <span className="mx-2">=</span>
                    <span className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>∂</div>
                        <div className="border-t border-gray-700 px-1"></div>
                        <div>∂θ<sub>0</sub></div>
                      </div>
                    </span>
                    <span className="ml-2">[(1/2m) ∑(θ<sub>0</sub> + θ<sub>1</sub>x − y)<sup>2</sup>]</span>
                  </div>
                  <p className="text-gray-600">Using chain rule:</p>
                  <p style={{ fontFamily: 'Georgia, serif' }}>= (1/m) ∑(θ<sub>0</sub> + θ<sub>1</sub>x − y) × 1</p>
                  <p className="bg-white p-2 rounded" style={{ fontFamily: 'Georgia, serif' }}>= (1/m) ∑(h(x) − y)</p>
                </div>
              </div>
              
              <div className="bg-pink-50 p-4 rounded">
                <h6 className="font-semibold text-pink-700 mb-2">Gradient for θ₁:</h6>
                <div className="space-y-2 text-sm">
                  <div style={{ fontFamily: 'Georgia, serif' }}>
                    <span className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>∂J</div>
                        <div className="border-t border-gray-700 px-1"></div>
                        <div>∂θ<sub>1</sub></div>
                      </div>
                    </span>
                    <span className="mx-2">=</span>
                    <span className="inline-block align-middle">
                      <div className="text-center" style={{ lineHeight: '1' }}>
                        <div>∂</div>
                        <div className="border-t border-gray-700 px-1"></div>
                        <div>∂θ<sub>1</sub></div>
                      </div>
                    </span>
                    <span className="ml-2">[(1/2m) ∑(θ<sub>0</sub> + θ<sub>1</sub>x − y)<sup>2</sup>]</span>
                  </div>
                  <p className="text-gray-600">Using chain rule:</p>
                  <p style={{ fontFamily: 'Georgia, serif' }}>= (1/m) ∑(θ<sub>0</sub> + θ<sub>1</sub>x − y) × x</p>
                  <p className="bg-white p-2 rounded" style={{ fontFamily: 'Georgia, serif' }}>= (1/m) ∑(h(x) − y) × x</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-yellow-700">
                <strong>Notice:</strong> θ<sub>1</sub> gradient has extra 'x' term because θ<sub>1</sub> is multiplied by x in h(x)!
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: The Update Rule */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-orange-800 mb-4">Step 4: The Update Rule</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-semibold text-gray-700 mb-3">General Update Formula:</h6>
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="text-lg text-center mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  <span>θ := θ − α × </span>
                  <span className="inline-block align-middle">
                    <div className="text-center" style={{ lineHeight: '1' }}>
                      <div>∂J</div>
                      <div className="border-t border-gray-700 px-1"></div>
                      <div>∂θ</div>
                    </div>
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>θ</strong> = Parameter to update</p>
                  <p><strong>α</strong> = Learning rate (step size)</p>
                  <p><strong>∂J/∂θ</strong> = Gradient (direction & steepness)</p>
                </div>
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold text-gray-700 mb-3">Why Subtract?</h6>
              <div className="bg-white p-4 rounded shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  <div className="text-sm">
                    <p>If gradient is positive → Cost increases</p>
                    <p className="text-gray-600">So we go negative direction (subtract)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📉</span>
                  <div className="text-sm">
                    <p>If gradient is negative → Cost already decreasing</p>
                    <p className="text-gray-600">Subtracting negative = adding (correct direction)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-orange-50 p-4 rounded">
            <h6 className="font-semibold text-orange-700 mb-2">Simultaneous Update (Important!):</h6>
            <div className="bg-white p-3 rounded font-mono text-sm space-y-1">
              <p style={{ fontFamily: 'Georgia, serif' }}>temp<sub>0</sub> := θ<sub>0</sub> − α × (1/m) × ∑(h(x) − y)</p>
              <p style={{ fontFamily: 'Georgia, serif' }}>temp<sub>1</sub> := θ<sub>1</sub> − α × (1/m) × ∑(h(x) − y) × x</p>
              <p className="text-gray-600">// Update both at the same time</p>
              <p style={{ fontFamily: 'Georgia, serif' }}>θ<sub>0</sub> := temp<sub>0</sub></p>
              <p style={{ fontFamily: 'Georgia, serif' }}>θ<sub>1</sub> := temp<sub>1</sub></p>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              We calculate both gradients using OLD values, then update together!
            </p>
          </div>
        </div>

        {/* Step 5: Learning Rate */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-cyan-800 mb-4">Step 5: The Learning Rate (α)</h5>
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <p className="text-center font-semibold mb-3">Learning Rate controls how big our steps are</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-red-50 p-3 rounded text-center">
                <svg width="100" height="60" viewBox="0 0 100 60" className="mx-auto mb-2">
                  <path d="M 10 50 Q 30 20, 50 30 T 90 10" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                  {/* Many tiny steps */}
                  {[10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((x, i) => (
                    <circle key={i} cx={x} cy={50 - 0.02 * x * x + 1.5 * x} r="1" fill="#ef4444"/>
                  ))}
                </svg>
                <p className="font-semibold text-red-700 text-sm">Too Small (α = 0.001)</p>
                <p className="text-xs text-gray-600">Very slow convergence</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded text-center">
                <svg width="100" height="60" viewBox="0 0 100 60" className="mx-auto mb-2">
                  <path d="M 10 50 Q 30 20, 50 30 T 90 10" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                  {/* Just right steps */}
                  {[10, 25, 40, 55, 70, 85].map((x, i) => (
                    <circle key={i} cx={x} cy={50 - 0.02 * x * x + 1.5 * x} r="2" fill="#10b981"/>
                  ))}
                </svg>
                <p className="font-semibold text-green-700 text-sm">Just Right (α = 0.01)</p>
                <p className="text-xs text-gray-600">Efficient convergence</p>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded text-center">
                <svg width="100" height="60" viewBox="0 0 100 60" className="mx-auto mb-2">
                  <path d="M 10 50 Q 30 20, 50 30 T 90 10" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                  {/* Overshooting */}
                  <circle cx="10" cy="50" r="2" fill="#f59e0b"/>
                  <circle cx="80" cy="15" r="2" fill="#f59e0b"/>
                  <circle cx="20" cy="45" r="2" fill="#f59e0b"/>
                  <circle cx="90" cy="10" r="2" fill="#f59e0b"/>
                  {/* Zigzag lines */}
                  <path d="M 10 50 L 80 15 L 20 45 L 90 10" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2"/>
                </svg>
                <p className="font-semibold text-yellow-700 text-sm">Too Large (α = 0.5)</p>
                <p className="text-xs text-gray-600">May overshoot or diverge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 6: Complete Algorithm */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-indigo-800 mb-4">Step 6: Complete Gradient Descent Algorithm</h5>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="font-mono text-sm space-y-3">
              <p className="text-gray-600">// Initialize parameters</p>
              <p style={{ fontFamily: 'Georgia, serif' }}>θ<sub>0</sub> = 0, θ<sub>1</sub> = 0</p>
              <p style={{ fontFamily: 'Georgia, serif' }}>α = 0.01 (learning rate)</p>
              <p className="text-gray-600 mt-3">// Repeat until convergence:</p>
              <div className="bg-gray-50 p-3 rounded">
                <p style={{ fontFamily: 'Georgia, serif' }}>1. Calculate predictions: h(x) = θ<sub>0</sub> + θ<sub>1</sub>x</p>
                <p>2. Calculate gradients:</p>
                <p className="ml-4" style={{ fontFamily: 'Georgia, serif' }}>   grad<sub>0</sub> = (1/m) × ∑(h(x<sup>(i)</sup>) − y<sup>(i)</sup>)</p>
                <p className="ml-4" style={{ fontFamily: 'Georgia, serif' }}>   grad<sub>1</sub> = (1/m) × ∑(h(x<sup>(i)</sup>) − y<sup>(i)</sup>) × x<sup>(i)</sup></p>
                <p>3. Update parameters:</p>
                <p className="ml-4" style={{ fontFamily: 'Georgia, serif' }}>   θ<sub>0</sub> = θ<sub>0</sub> − α × grad<sub>0</sub></p>
                <p className="ml-4" style={{ fontFamily: 'Georgia, serif' }}>   θ<sub>1</sub> = θ<sub>1</sub> − α × grad<sub>1</sub></p>
                <p style={{ fontFamily: 'Georgia, serif' }}>4. Calculate new cost J(θ<sub>0</sub>, θ<sub>1</sub>)</p>
                <p>5. If cost is not changing much, stop. Else go to step 1.</p>
              </div>
            </div>
            
            <div className="mt-4 bg-indigo-50 p-3 rounded">
              <p className="text-sm font-semibold text-indigo-700">Convergence:</p>
              <p className="text-sm">Algorithm stops when cost function stops decreasing significantly</p>
            </div>
          </div>
        </div>

        {/* Visual Example with Numbers */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
          <h5 className="text-xl font-semibold text-teal-800 mb-4">Visual Example: First Iteration</h5>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-semibold text-gray-700 mb-3">Let's see a concrete example with 3 data points:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <table className="w-full text-sm border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border">x</th>
                      <th className="p-2 border">y (actual)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border text-center">1</td>
                      <td className="p-2 border text-center">2</td>
                    </tr>
                    <tr>
                      <td className="p-2 border text-center">2</td>
                      <td className="p-2 border text-center">4</td>
                    </tr>
                    <tr>
                      <td className="p-2 border text-center">3</td>
                      <td className="p-2 border text-center">5</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">Initial: θ₀ = 0, θ₁ = 0, α = 0.1</p>
              </div>
              
              <div className="bg-teal-50 p-3 rounded">
                <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
                  {/* Grid */}
                  {[0,1,2,3,4,5].map(i => (
                    <g key={`ex-grid-${i}`}>
                      <line x1={20 + i * 30} y1="20" x2={20 + i * 30} y2="130" stroke="#e5e7eb" strokeWidth="1"/>
                      <line x1="20" y1={20 + i * 22} x2="170" y2={20 + i * 22} stroke="#e5e7eb" strokeWidth="1"/>
                    </g>
                  ))}
                  {/* Axes */}
                  <line x1="20" y1="130" x2="170" y2="130" stroke="#374151" strokeWidth="2"/>
                  <line x1="20" y1="20" x2="20" y2="130" stroke="#374151" strokeWidth="2"/>
                  
                  {/* Data points */}
                  <circle cx="50" cy="108" r="4" fill="#ef4444"/>
                  <circle cx="80" cy="64" r="4" fill="#ef4444"/>
                  <circle cx="110" cy="42" r="4" fill="#ef4444"/>
                  
                  {/* Initial line (θ₀=0, θ₁=0) - horizontal at y=0 */}
                  <line x1="20" y1="130" x2="170" y2="130" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3"/>
                  <text x="175" y="133" fontSize="9" fill="#3b82f6">h(x)=0</text>
                  
                  {/* Labels */}
                  <text x="0" y="25" fontSize="10" fill="#6b7280">y</text>
                  <text x="165" y="145" fontSize="10" fill="#6b7280">x</text>
                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded">
                <p className="font-semibold text-yellow-700 text-sm mb-2">Step 1: Calculate Predictions & Errors</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>h(1) = 0 + 0×1 = 0<br/>Error = 0 - 2 = -2</div>
                  <div>h(2) = 0 + 0×2 = 0<br/>Error = 0 - 4 = -4</div>
                  <div>h(3) = 0 + 0×3 = 0<br/>Error = 0 - 5 = -5</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-semibold text-purple-700 text-sm mb-2">Step 2: Calculate Gradients</p>
                <div className="text-sm space-y-1">
                  <p style={{ fontFamily: 'Georgia, serif' }}>grad<sub>0</sub> = (1/3) × [(−2) + (−4) + (−5)] = (1/3) × (−11) = −3.67</p>
                  <p style={{ fontFamily: 'Georgia, serif' }}>grad<sub>1</sub> = (1/3) × [(−2)×1 + (−4)×2 + (−5)×3] = (1/3) × (−25) = −8.33</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-700 text-sm mb-2">Step 3: Update Parameters</p>
                <div className="text-sm space-y-1">
                  <p style={{ fontFamily: 'Georgia, serif' }}>θ<sub>0</sub>_new = 0 − 0.1 × (−3.67) = 0 + 0.367 = 0.367</p>
                  <p style={{ fontFamily: 'Georgia, serif' }}>θ<sub>1</sub>_new = 0 − 0.1 × (−8.33) = 0 + 0.833 = 0.833</p>
                </div>
                <p className="text-xs text-gray-600 mt-2">New line equation: h(x) = 0.367 + 0.833x</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-700 text-sm">Result After 1 Iteration:</p>
                <p className="text-sm">The line moved from y=0 (flat) to y=0.367+0.833x (sloped)!</p>
                <p className="text-xs text-gray-600 mt-1">Cost reduced from initial value → Getting closer to data!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Update Rules</h4>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <div className="text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                <span>θ<sub>0</sub> := θ<sub>0</sub> − α × </span>
                <span className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>∂J</div>
                    <div className="border-t border-gray-700 px-1"></div>
                    <div>∂θ<sub>0</sub></div>
                  </div>
                </span>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>θ<sub>0</sub> = θ<sub>0</sub> − α × (1/m) × Σ(ŷ<sub>i</sub> − y<sub>i</sub>)</p>
            </div>
            <div>
              <div className="text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                <span>θ<sub>1</sub> := θ<sub>1</sub> − α × </span>
                <span className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>∂J</div>
                    <div className="border-t border-gray-700 px-1"></div>
                    <div>∂θ<sub>1</sub></div>
                  </div>
                </span>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>θ<sub>1</sub> = θ<sub>1</sub> − α × (1/m) × Σ(ŷ<sub>i</sub> − y<sub>i</sub>) × x<sub>i</sub></p>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm"><strong>α</strong> = Learning rate (শেখার হার)</p>
              <p className="text-sm"><strong>m</strong> = Total data points</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Current Gradients</h4>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>∂J</div>
                    <div className="border-t border-gray-700 px-1"></div>
                    <div>∂θ<sub>0</sub></div>
                  </div>
                </span>
                <span className="ml-2">(Intercept gradient)</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{gradientTheta0.toFixed(6)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>∂J</div>
                    <div className="border-t border-gray-700 px-1"></div>
                    <div>∂θ<sub>1</sub></div>
                  </div>
                </span>
                <span className="ml-2">(Slope gradient)</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{gradientTheta1.toFixed(6)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Training Controls</h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Rate (α): {learningRate}
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
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.001 (ধীর)</span>
              <span>0.1 (দ্রুত)</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleTrainingToggle}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isTraining 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isTraining ? 'Stop Training' : 'Start Training'}
            </button>
            
            <button
              onClick={handleSingleStep}
              disabled={isTraining}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Single Step
            </button>
            
            <button
              onClick={resetModel}
              disabled={isTraining}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {costHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Cost History</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iteration" label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Cost', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Total iterations:</strong> {costHistory.length} | 
              <strong> Initial cost:</strong> {costHistory[0]?.cost.toFixed(4)} | 
              <strong> Current cost:</strong> {costHistory[costHistory.length - 1]?.cost.toFixed(4)}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Learning Rate এর গুরুত্ব</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h5 className="font-semibold text-red-700 mb-2">খুব ছোট α</h5>
            <p className="text-sm text-gray-600">
              • Training অনেক ধীর হবে
              <br />• অনেক iteration লাগবে
              <br />• কিন্তু stable convergence
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">সঠিক α</h5>
            <p className="text-sm text-gray-600">
              • দ্রুত convergence
              <br />• Stable training
              <br />• Optimal performance
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-semibold text-yellow-700 mb-2">খুব বড় α</h5>
            <p className="text-sm text-gray-600">
              • Overshoot হতে পারে
              <br />• Diverge করতে পারে
              <br />• Cost বাড়তে পারে
            </p>
          </div>
        </div>
      </div>

      {/* Learning Rate Deep Dive */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Learning Rate (α) - Complete Guide
        </h4>
        
        {/* What is Learning Rate? */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-blue-800 mb-4">What is Learning Rate?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-3">
                <strong>Learning Rate (α)</strong> নির্ধারণ করে প্রতিটি iteration এ আমরা কত বড় step নেব। এটি gradient descent এর সবচেয়ে গুরুত্বপূর্ণ hyperparameter।
              </p>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-mono text-center text-lg mb-2">θ = θ - α × gradient</p>
                <div className="space-y-2 text-sm">
                  <p><strong>α = 0.001</strong> → Very small steps (খুব ছোট পদক্ষেপ)</p>
                  <p><strong>α = 0.01</strong> → Moderate steps (মাঝারি পদক্ষেপ)</p>
                  <p><strong>α = 0.1</strong> → Large steps (বড় পদক্ষেপ)</p>
                  <p><strong>α = 1.0</strong> → Very large steps (খুব বড় পদক্ষেপ)</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <svg width="250" height="200" viewBox="0 0 250 200" className="mx-auto">
                <defs>
                  <marker id="lr-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#374151" />
                  </marker>
                </defs>
                
                {/* Cost function curve */}
                <path 
                  d="M 20 20 Q 80 180, 125 185 T 230 20" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="2"
                />
                
                {/* Small learning rate */}
                <g>
                  <circle cx="50" cy="50" r="4" fill="#ef4444"/>
                  <line x1="50" y1="50" x2="60" y2="65" stroke="#ef4444" strokeWidth="2" markerEnd="url(#lr-arrow)"/>
                  <line x1="60" y1="65" x2="70" y2="80" stroke="#ef4444" strokeWidth="2" markerEnd="url(#lr-arrow)"/>
                  <text x="30" y="40" fontSize="9" fill="#ef4444">α small</text>
                </g>
                
                {/* Large learning rate */}
                <g>
                  <circle cx="200" cy="50" r="4" fill="#10b981"/>
                  <line x1="200" y1="50" x2="150" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#lr-arrow)"/>
                  <text x="180" y="40" fontSize="9" fill="#10b981">α large</text>
                </g>
                
                {/* Optimal */}
                <circle cx="125" cy="185" r="5" fill="#6366f1"/>
                <text x="125" y="198" fontSize="10" fill="#6366f1" textAnchor="middle">Minimum</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Learning Rate Effects */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-purple-800 mb-4">Effects of Different Learning Rates</h5>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Too Small */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-red-700 mb-2 text-center">Too Small<br/>(α &lt; 0.001)</h6>
              <svg width="150" height="100" viewBox="0 0 150 100" className="mx-auto mb-2">
                <path d="M 10 80 Q 50 70, 75 60 T 110 50 Q 130 45, 140 44" 
                  fill="none" stroke="#ef4444" strokeWidth="2"/>
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130].map((x, i) => (
                  <circle key={i} cx={x} cy={80 - i * 3} r="1" fill="#ef4444"/>
                ))}
                <text x="75" y="95" fontSize="9" fill="#6b7280" textAnchor="middle">Many iterations</text>
              </svg>
              <div className="text-xs space-y-1">
                <p>❌ Extremely slow</p>
                <p>❌ May stop early</p>
                <p>❌ Time consuming</p>
                <p>✓ Very stable</p>
              </div>
            </div>
            
            {/* Good Range */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-green-700 mb-2 text-center">Good Range<br/>(0.001 - 0.01)</h6>
              <svg width="150" height="100" viewBox="0 0 150 100" className="mx-auto mb-2">
                <path d="M 10 80 Q 50 50, 90 30 T 140 20" 
                  fill="none" stroke="#10b981" strokeWidth="2"/>
                {[10, 35, 60, 85, 110, 135].map((x, i) => (
                  <circle key={i} cx={x} cy={80 - i * 10} r="2" fill="#10b981"/>
                ))}
                <text x="75" y="95" fontSize="9" fill="#6b7280" textAnchor="middle">Efficient</text>
              </svg>
              <div className="text-xs space-y-1">
                <p>✓ Good speed</p>
                <p>✓ Stable descent</p>
                <p>✓ Reliable</p>
                <p>✓ Converges well</p>
              </div>
            </div>
            
            {/* Large */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-yellow-700 mb-2 text-center">Large<br/>(0.1 - 0.5)</h6>
              <svg width="150" height="100" viewBox="0 0 150 100" className="mx-auto mb-2">
                <path d="M 10 80 L 40 30 L 70 70 L 100 40 L 130 50 L 140 48" 
                  fill="none" stroke="#f59e0b" strokeWidth="2"/>
                <circle cx="10" cy="80" r="2" fill="#f59e0b"/>
                <circle cx="40" cy="30" r="2" fill="#f59e0b"/>
                <circle cx="70" cy="70" r="2" fill="#f59e0b"/>
                <circle cx="100" cy="40" r="2" fill="#f59e0b"/>
                <circle cx="130" cy="50" r="2" fill="#f59e0b"/>
                <text x="75" y="95" fontSize="9" fill="#6b7280" textAnchor="middle">Oscillating</text>
              </svg>
              <div className="text-xs space-y-1">
                <p>⚠️ May oscillate</p>
                <p>⚠️ Less stable</p>
                <p>✓ Fast initially</p>
                <p>❌ May overshoot</p>
              </div>
            </div>
            
            {/* Too Large */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-red-700 mb-2 text-center">Too Large<br/>(α &gt; 1.0)</h6>
              <svg width="150" height="100" viewBox="0 0 150 100" className="mx-auto mb-2">
                <path d="M 10 50 L 30 20 L 50 80 L 70 10 L 90 90 L 110 5 L 130 95" 
                  fill="none" stroke="#dc2626" strokeWidth="2"/>
                <text x="75" y="95" fontSize="9" fill="#6b7280" textAnchor="middle">Diverging</text>
              </svg>
              <div className="text-xs space-y-1">
                <p>❌ Diverges</p>
                <p>❌ Cost increases</p>
                <p>❌ Never converges</p>
                <p>❌ Unstable</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Choose Learning Rate */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-green-800 mb-4">How to Choose the Right Learning Rate?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-3">Method 1: Start with Common Values</h6>
              <div className="space-y-2">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-sm font-semibold">Try these first:</p>
                  <p className="font-mono text-xs">α = [0.001, 0.003, 0.01, 0.03, 0.1, 0.3]</p>
                </div>
                <p className="text-sm text-gray-600">
                  Most problems work well with α between 0.001 and 0.1
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-3">Method 2: Learning Rate Range Test</h6>
              <div className="space-y-2">
                <ol className="text-sm space-y-1">
                  <li>1. Start with very small α (10⁻⁵)</li>
                  <li>2. Increase gradually each iteration</li>
                  <li>3. Plot cost vs α</li>
                  <li>4. Choose α where cost decreases fastest</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-3">Method 3: Monitor Cost Function</h6>
              <svg width="100%" height="150" viewBox="0 0 300 150" className="mb-2">
                {/* Good learning rate */}
                <g>
                  <text x="10" y="15" fontSize="11" fill="#10b981">Good α</text>
                  <path d="M 10 30 Q 50 50, 100 60 T 200 65 L 280 65" 
                    fill="none" stroke="#10b981" strokeWidth="2"/>
                </g>
                
                {/* Bad learning rate */}
                <g>
                  <text x="10" y="85" fontSize="11" fill="#ef4444">Bad α</text>
                  <path d="M 10 100 L 30 90 L 50 110 L 70 85 L 90 115 L 110 80 L 130 120" 
                    fill="none" stroke="#ef4444" strokeWidth="2"/>
                </g>
                
                {/* Axes */}
                <line x1="10" y1="140" x2="290" y2="140" stroke="#6b7280" strokeWidth="1"/>
                <text x="150" y="148" fontSize="10" fill="#6b7280" textAnchor="middle">Iterations</text>
              </svg>
              <p className="text-xs text-gray-600">
                If cost oscillates or increases, reduce α by 3x
              </p>
            </div>
            
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-3">Method 4: Adaptive Learning Rate</h6>
              <div className="space-y-2 text-sm">
                <div className="bg-yellow-50 p-2 rounded">
                  <p className="font-semibold">Decay Schedule:</p>
                  <p className="font-mono text-xs">α = α₀ / (1 + decay × iteration)</p>
                </div>
                <p className="text-xs text-gray-600">
                  Start with larger α, automatically decrease over time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Learning Rate Demo */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-indigo-800 mb-4">Interactive: Effect of Learning Rate on Path</h5>
          <div className="bg-white p-4 rounded shadow-sm">
            <svg width="100%" height="300" viewBox="0 0 400 300" className="mx-auto">
              <defs>
                <radialGradient id="lr-cost-gradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#1e40af" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </radialGradient>
              </defs>
              
              {/* Cost function contours */}
              <g transform="translate(200, 150)">
                {[180, 140, 100, 60, 20].map((r, i) => (
                  <ellipse 
                    key={`lr-contour-${i}`}
                    cx="0" 
                    cy="0" 
                    rx={r} 
                    ry={r * 0.6} 
                    fill={i === 4 ? "url(#lr-cost-gradient)" : "none"}
                    fillOpacity={i === 4 ? "0.3" : "0"}
                    stroke="#60a5fa" 
                    strokeWidth="1" 
                    opacity={0.2 + i * 0.15}
                  />
                ))}
                
                {/* Center (minimum) */}
                <circle cx="0" cy="0" r="6" fill="#1e40af"/>
                <text x="0" y="-15" fontSize="10" fill="#1e40af" textAnchor="middle" fontWeight="bold">
                  Minimum
                </text>
                
                {/* α = 0.001 (too small) */}
                <g>
                  <circle cx="-160" cy="-60" r="4" fill="#ef4444"/>
                  {[-160, -155, -150, -145, -140, -135, -130, -125, -120].map((x, i) => (
                    <circle key={`small-${i}`} cx={x} cy={-60 + i * 2} r="1" fill="#ef4444" opacity="0.6"/>
                  ))}
                  <text x="-160" y="-70" fontSize="9" fill="#ef4444" textAnchor="middle">α=0.001</text>
                  <text x="-140" y="-30" fontSize="8" fill="#ef4444">Too slow!</text>
                </g>
                
                {/* α = 0.01 (good) */}
                <g>
                  <circle cx="140" cy="-70" r="4" fill="#10b981"/>
                  <path 
                    d="M 140,-70 Q 100,-50 60,-30 T 20,-10 Q 10,-5 0,0" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2"
                    strokeDasharray="5,2"
                  />
                  {[140, 110, 80, 50, 20, 0].map((x, i) => (
                    <circle 
                      key={`good-${i}`} 
                      cx={x} 
                      cy={-70 + i * 12} 
                      r="3" 
                      fill="#10b981" 
                      opacity={0.8 - i * 0.1}
                    />
                  ))}
                  <text x="140" y="-80" fontSize="9" fill="#10b981" textAnchor="middle">α=0.01</text>
                  <text x="100" y="-20" fontSize="8" fill="#10b981">Perfect!</text>
                </g>
                
                {/* α = 0.5 (too large) */}
                <g>
                  <circle cx="-120" cy="70" r="4" fill="#f59e0b"/>
                  <path 
                    d="M -120,70 L -40,-40 L 40,50 L -30,-30 L 20,20 L -10,-10 L 5,5 L 0,0" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="2"
                  />
                  <text x="-120" y="85" fontSize="9" fill="#f59e0b" textAnchor="middle">α=0.5</text>
                  <text x="-50" y="30" fontSize="8" fill="#f59e0b">Oscillating!</text>
                </g>
              </g>
              
              {/* Title and labels */}
              <text x="200" y="20" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="bold">
                Learning Rate Impact on Convergence Path
              </text>
              <text x="200" y="290" fontSize="10" fill="#6b7280" textAnchor="middle">
                Parameter Space (θ₀, θ₁)
              </text>
            </svg>
          </div>
        </div>

        {/* Learning Rate Schedules */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
          <h5 className="text-xl font-semibold text-orange-800 mb-4">Advanced: Learning Rate Schedules</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-2">Constant</h6>
              <svg width="100%" height="80" viewBox="0 0 150 80">
                <line x1="10" y1="40" x2="140" y2="40" stroke="#3b82f6" strokeWidth="2"/>
                <text x="75" y="70" fontSize="9" fill="#6b7280" textAnchor="middle">α = constant</text>
              </svg>
              <p className="text-xs mt-2">Simple, but may oscillate near minimum</p>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-2">Step Decay</h6>
              <svg width="100%" height="80" viewBox="0 0 150 80">
                <path d="M 10 20 L 50 20 L 50 35 L 90 35 L 90 50 L 140 50" 
                  fill="none" stroke="#10b981" strokeWidth="2"/>
                <text x="75" y="70" fontSize="9" fill="#6b7280" textAnchor="middle">α = α₀ × decay^epoch</text>
              </svg>
              <p className="text-xs mt-2">Drops by factor at intervals</p>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-2">Exponential Decay</h6>
              <svg width="100%" height="80" viewBox="0 0 150 80">
                <path d="M 10 20 Q 40 30, 70 45 T 140 60" 
                  fill="none" stroke="#f59e0b" strokeWidth="2"/>
                <text x="75" y="70" fontSize="9" fill="#6b7280" textAnchor="middle">α = α₀ × e^(-λt)</text>
              </svg>
              <p className="text-xs mt-2">Smooth decrease over time</p>
            </div>
          </div>
          
          <div className="mt-4 bg-orange-50 p-3 rounded">
            <p className="text-sm text-orange-700">
              <strong>Pro Tip:</strong> Start with constant learning rate. If you see oscillation near convergence, try decay schedules.
            </p>
          </div>
        </div>
      </div>

      {/* Convergence Theory Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Convergence Theory (অভিসরণ তত্ত্ব)
        </h4>
        
        {/* What is Convergence? */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-purple-800 mb-4">What is Convergence?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-3">
                <strong>Convergence</strong> মানে হলো আমাদের algorithm টি optimal solution এর দিকে এগিয়ে যাচ্ছে এবং একটি stable point এ পৌঁছাচ্ছে।
              </p>
              <div className="bg-white p-3 rounded shadow-sm space-y-2">
                <p className="text-sm"><strong>✓ Converged:</strong> Cost আর কমছে না</p>
                <p className="text-sm"><strong>✓ Parameters:</strong> θ₀, θ₁ stable হয়ে গেছে</p>
                <p className="text-sm"><strong>✓ Gradient:</strong> প্রায় শূন্য (≈ 0)</p>
                <p className="text-sm"><strong>✓ Iterations:</strong> আরো চালালেও change নেই</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <svg width="250" height="180" viewBox="0 0 250 180" className="mx-auto">
                {/* Convergence graph */}
                <defs>
                  <linearGradient id="conv-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                
                {/* Grid */}
                <g opacity="0.1">
                  {[30, 60, 90, 120, 150, 180, 210].map(x => (
                    <line key={`cv-${x}`} x1={x} y1="20" x2={x} y2="160" stroke="#000" strokeWidth="0.5"/>
                  ))}
                  {[40, 60, 80, 100, 120, 140].map(y => (
                    <line key={`ch-${y}`} x1="30" y1={y} x2="230" y2={y} stroke="#000" strokeWidth="0.5"/>
                  ))}
                </g>
                
                {/* Axes */}
                <line x1="30" y1="160" x2="230" y2="160" stroke="#374151" strokeWidth="2"/>
                <line x1="30" y1="20" x2="30" y2="160" stroke="#374151" strokeWidth="2"/>
                
                {/* Convergence curve */}
                <path 
                  d="M 30 140 Q 80 100, 120 60 T 180 40 Q 210 35, 230 35" 
                  fill="none" 
                  stroke="url(#conv-gradient)" 
                  strokeWidth="3"
                />
                
                {/* Convergence point */}
                <circle cx="180" cy="40" r="5" fill="#10b981"/>
                <text x="180" y="30" fontSize="10" fill="#10b981" textAnchor="middle">Converged!</text>
                
                {/* Labels */}
                <text x="130" y="175" fontSize="10" fill="#6b7280" textAnchor="middle">Iterations</text>
                <text x="15" y="90" fontSize="10" fill="#6b7280" transform="rotate(-90 15 90)">Cost</text>
                
                {/* Phases */}
                <text x="60" y="155" fontSize="9" fill="#ef4444">Fast</text>
                <text x="120" y="155" fontSize="9" fill="#f59e0b">Slowing</text>
                <text x="200" y="155" fontSize="9" fill="#10b981">Stable</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Types of Convergence */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-blue-800 mb-4">Types of Convergence Behavior</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Good Convergence */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-green-700 mb-2 text-center">Good Convergence</h6>
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto mb-2">
                <g opacity="0.1">
                  {[40, 80, 120, 160].map(x => (
                    <line key={`g1-${x}`} x1={x} y1="10" x2={x} y2="100" stroke="#000" strokeWidth="0.5"/>
                  ))}
                </g>
                <line x1="20" y1="100" x2="180" y2="100" stroke="#374151" strokeWidth="1"/>
                <line x1="20" y1="10" x2="20" y2="100" stroke="#374151" strokeWidth="1"/>
                
                <path 
                  d="M 20 90 Q 60 60, 100 30 T 160 20 L 180 20" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2"
                />
                
                <text x="100" y="115" fontSize="9" fill="#6b7280" textAnchor="middle">Smooth descent</text>
              </svg>
              <p className="text-xs text-gray-600">
                • Smooth curve<br/>
                • Reaches minimum<br/>
                • Stays stable
              </p>
            </div>
            
            {/* Oscillating */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-yellow-700 mb-2 text-center">Oscillating</h6>
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto mb-2">
                <g opacity="0.1">
                  {[40, 80, 120, 160].map(x => (
                    <line key={`g2-${x}`} x1={x} y1="10" x2={x} y2="100" stroke="#000" strokeWidth="0.5"/>
                  ))}
                </g>
                <line x1="20" y1="100" x2="180" y2="100" stroke="#374151" strokeWidth="1"/>
                <line x1="20" y1="10" x2="20" y2="100" stroke="#374151" strokeWidth="1"/>
                
                <path 
                  d="M 20 90 L 40 30 L 60 80 L 80 40 L 100 70 L 120 50 L 140 60 L 160 55 L 180 57" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                />
                
                <text x="100" y="115" fontSize="9" fill="#6b7280" textAnchor="middle">α too large</text>
              </svg>
              <p className="text-xs text-gray-600">
                • Jumps around<br/>
                • Eventually converges<br/>
                • Takes longer
              </p>
            </div>
            
            {/* Diverging */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-red-700 mb-2 text-center">Diverging</h6>
              <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto mb-2">
                <g opacity="0.1">
                  {[40, 80, 120, 160].map(x => (
                    <line key={`g3-${x}`} x1={x} y1="10" x2={x} y2="100" stroke="#000" strokeWidth="0.5"/>
                  ))}
                </g>
                <line x1="20" y1="100" x2="180" y2="100" stroke="#374151" strokeWidth="1"/>
                <line x1="20" y1="10" x2="20" y2="100" stroke="#374151" strokeWidth="1"/>
                
                <path 
                  d="M 20 60 L 40 40 L 60 70 L 80 20 L 100 90 L 120 10 L 140 95 L 160 5 L 180 98" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2"
                />
                
                <text x="100" y="115" fontSize="9" fill="#6b7280" textAnchor="middle">α way too large</text>
              </svg>
              <p className="text-xs text-gray-600">
                • Cost increases<br/>
                • Never converges<br/>
                • Need smaller α
              </p>
            </div>
          </div>
        </div>

        {/* Convergence Criteria */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-green-800 mb-4">How to Check Convergence?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-3">Method 1: Cost Change Threshold</h6>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                <p>if |J(θ_new) - J(θ_old)| &lt; ε:</p>
                <p className="ml-4">converged = True</p>
                <p className="mt-2 text-xs text-gray-600">where ε = 0.0001 (example)</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Cost change খুব ছোট হলে stop করো
              </p>
            </div>
            
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="font-semibold text-gray-700 mb-3">Method 2: Gradient Magnitude</h6>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                <p>if ||∇J(θ)|| &lt; ε:</p>
                <p className="ml-4">converged = True</p>
                <p className="mt-2 text-xs text-gray-600">where ||∇J|| = √(grad₀² + grad₁²)</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Gradient প্রায় zero হলে stop করো
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-yellow-50 p-4 rounded">
            <h6 className="font-semibold text-yellow-700 mb-2">Practical Tips:</h6>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• সাধারণত 100-1000 iterations এ converge হয়</li>
              <li>• ε = 10⁻³ থেকে 10⁻⁶ ব্যবহার করা হয়</li>
              <li>• Maximum iteration limit রাখা উচিত (যেমন 10000)</li>
              <li>• Cost increase হলে learning rate কমান</li>
            </ul>
          </div>
        </div>

        {/* Interactive Convergence Demo */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
          <h5 className="text-xl font-semibold text-indigo-800 mb-4">Convergence Visualization</h5>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">Watch how different learning rates affect convergence:</p>
            </div>
            
            <svg width="100%" height="250" viewBox="0 0 400 250" className="mx-auto">
              <defs>
                <linearGradient id="cost-surface" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              
              {/* 3D Cost surface representation */}
              <g transform="translate(200, 125)">
                {/* Elliptical contours */}
                {[160, 120, 80, 40].map((r, i) => (
                  <ellipse 
                    key={`contour-${i}`}
                    cx="0" 
                    cy="0" 
                    rx={r} 
                    ry={r/2} 
                    fill="none" 
                    stroke="#60a5fa" 
                    strokeWidth="1" 
                    opacity={0.3 + i * 0.1}
                  />
                ))}
                
                {/* Minimum point */}
                <circle cx="0" cy="0" r="5" fill="#10b981"/>
                <text x="0" y="-10" fontSize="10" fill="#10b981" textAnchor="middle">Min</text>
                
                {/* Different convergence paths */}
                {/* Good path (green) */}
                <g>
                  <path 
                    d="M -140,-50 Q -80,-30 -40,-15 T 0,0" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                  <circle cx="-140" cy="-50" r="4" fill="#10b981"/>
                  <text x="-140" y="-60" fontSize="9" fill="#10b981" textAnchor="middle">α=0.01</text>
                </g>
                
                {/* Oscillating path (yellow) */}
                <g>
                  <path 
                    d="M -120,40 L -60,-30 L -20,25 L 10,-10 L -5,5 L 0,0" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                  <circle cx="-120" cy="40" r="4" fill="#f59e0b"/>
                  <text x="-120" y="55" fontSize="9" fill="#f59e0b" textAnchor="middle">α=0.1</text>
                </g>
                
                {/* Slow path (red) */}
                <g>
                  <path 
                    d="M 140,-30 L 130,-28 L 120,-26 L 110,-24 L 100,-22 L 90,-20 L 80,-18" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                  <circle cx="140" cy="-30" r="4" fill="#ef4444"/>
                  <text x="140" y="-40" fontSize="9" fill="#ef4444" textAnchor="middle">α=0.001</text>
                </g>
              </g>
              
              {/* Legend */}
              <g transform="translate(20, 220)">
                <rect x="0" y="0" width="15" height="3" fill="#10b981"/>
                <text x="20" y="3" fontSize="10" fill="#374151">Good convergence</text>
                
                <rect x="120" y="0" width="15" height="3" fill="#f59e0b"/>
                <text x="140" y="3" fontSize="10" fill="#374151">Oscillating</text>
                
                <rect x="240" y="0" width="15" height="3" fill="#ef4444"/>
                <text x="260" y="3" fontSize="10" fill="#374151">Too slow</text>
              </g>
            </svg>
            
            <div className="mt-4 bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-700">
                <strong>Key Insight:</strong> সঠিক learning rate selection convergence এর জন্য critical!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientDescent;