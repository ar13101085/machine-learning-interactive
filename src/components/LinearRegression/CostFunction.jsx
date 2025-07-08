import React, { useState, useMemo } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const CostFunction = ({ theta0, theta1, dataExamples, dataExample, calculateCost }) => {
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  
  const data = dataExamples[dataExample];
  
  const errorCalculations = useMemo(() => {
    return data.map(point => {
      const prediction = theta0 + theta1 * point.x;
      const error = prediction - point.y;
      const squaredError = error * error;
      return {
        x: point.x,
        y: point.y,
        prediction: prediction.toFixed(2),
        error: error.toFixed(2),
        squaredError: squaredError.toFixed(2),
        label: point.label
      };
    });
  }, [data, theta0, theta1]);

  const currentCost = calculateCost(data, theta0, theta1);

  const chartData = data.map(point => ({
    x: point.x,
    y: point.y,
    prediction: theta0 + theta1 * point.x
  }));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Cost Function (খরচ ফাংশন)</h3>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Cost Function কি?</h4>
        <p className="text-gray-600 mb-4">
          Cost Function আমাদের model এর ভুল পরিমাপ করে। এটি বলে দেয় আমাদের prediction line 
          actual data points থেকে কতটা দূরে আছে। কম cost মানে ভালো model!
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-blue-700 font-semibold">
            লক্ষ্য: Cost Function কে minimize করা
          </p>
        </div>
      </div>

      {/* How Cost Function Formula is Derived */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          How is the Cost Function Formula Generated?
        </h4>
        
        {/* Step 1: The Problem */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-red-800 mb-4">Step 1: Understanding the Problem</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-3">
                আমাদের একটি prediction line আছে: <span className="font-mono bg-gray-100 px-2 py-1 rounded" style={{ fontFamily: 'Georgia, serif' }}>h(x) = θ<sub>0</sub> + θ<sub>1</sub>x</span>
              </p>
              <p className="text-gray-700 mb-3">
                কিন্তু actual data points এর সাথে এই line exact match করে না। তাই <strong>error</strong> হয়।
              </p>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-semibold text-red-700 mb-1">Error কি?</p>
                <p className="text-sm">Error = Prediction - Actual</p>
                <p className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>e = h(x) − y</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <svg width="250" height="180" viewBox="0 0 250 180" className="mx-auto">
                {/* Grid */}
                {[0,1,2,3,4,5].map(i => (
                  <g key={`prob-grid-${i}`}>
                    <line x1={20 + i * 40} y1="20" x2={20 + i * 40} y2="160" stroke="#f3f4f6" strokeWidth="1"/>
                    <line x1="20" y1={20 + i * 28} x2="220" y2={20 + i * 28} stroke="#f3f4f6" strokeWidth="1"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="20" y1="160" x2="220" y2="160" stroke="#374151" strokeWidth="2"/>
                <line x1="20" y1="20" x2="20" y2="160" stroke="#374151" strokeWidth="2"/>
                
                {/* Prediction line */}
                <line x1="40" y1="140" x2="200" y2="40" stroke="#3b82f6" strokeWidth="2"/>
                
                {/* Data points */}
                <circle cx="60" cy="120" r="4" fill="#ef4444"/>
                <circle cx="100" cy="90" r="4" fill="#ef4444"/>
                <circle cx="140" cy="70" r="4" fill="#ef4444"/>
                <circle cx="180" cy="50" r="4" fill="#ef4444"/>
                
                {/* Error lines */}
                <line x1="60" y1="120" x2="60" y2="125" stroke="#ff6b6b" strokeWidth="2" strokeDasharray="2,2"/>
                <line x1="100" y1="90" x2="100" y2="95" stroke="#ff6b6b" strokeWidth="2" strokeDasharray="2,2"/>
                <line x1="140" y1="70" x2="140" y2="75" stroke="#ff6b6b" strokeWidth="2" strokeDasharray="2,2"/>
                <line x1="180" y1="50" x2="180" y2="55" stroke="#ff6b6b" strokeWidth="2" strokeDasharray="2,2"/>
                
                <text x="50" y="175" fontSize="10" fill="#6b7280">x</text>
                <text x="5" y="25" fontSize="10" fill="#6b7280">y</text>
                <text x="100" y="175" fontSize="11" fill="#3b82f6">Prediction Line</text>
                <text x="190" y="45" fontSize="9" fill="#ef4444">Data</text>
                <text x="190" y="65" fontSize="9" fill="#ff6b6b">Errors</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Step 2: Why Square the Errors */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-yellow-800 mb-4">Step 2: Why Do We Square the Errors?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-yellow-700 mb-2">Problem with Simple Errors:</p>
                  <div className="text-sm space-y-1">
                    <p>Point 1: Error = +2</p>
                    <p>Point 2: Error = -2</p>
                    <p className="text-red-600">Total Error = +2 + (-2) = 0</p>
                    <p className="text-xs text-gray-600">Positive ও negative errors cancel out!</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-green-700 mb-2">Solution: Square the Errors!</p>
                  <div className="text-sm space-y-1">
                    <p>Point 1: Error² = (+2)² = 4</p>
                    <p>Point 2: Error² = (-2)² = 4</p>
                    <p className="text-green-600">Total Error² = 4 + 4 = 8</p>
                    <p className="text-xs text-gray-600">সব errors positive হয়ে গেল!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <h6 className="font-semibold text-gray-700 mb-2">Why Squaring Works:</h6>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Always positive (no cancellation)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Penalizes larger errors more</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Mathematically convenient (differentiable)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Standard practice in statistics</span>
                </li>
              </ul>
              
              <div className="mt-3 bg-gray-50 p-2 rounded">
                <p className="text-xs font-semibold">Large Error Penalty:</p>
                <p className="text-xs">Error = 1 → Error² = 1</p>
                <p className="text-xs">Error = 3 → Error² = 9 (3x larger!)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Sum All Squared Errors */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-green-800 mb-4">Step 3: Sum All Squared Errors</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-3">
                আমাদের <strong>m</strong> টি data points আছে। প্রতিটির জন্য error calculate করতে হবে।
              </p>
              <div className="bg-white p-3 rounded space-y-2">
                <p className="font-semibold text-green-700">For each data point i:</p>
                <p className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>h(x<sup>(i)</sup>) = θ<sub>0</sub> + θ<sub>1</sub>x<sup>(i)</sup></p>
                <p className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>error<sup>(i)</sup> = h(x<sup>(i)</sup>) − y<sup>(i)</sup></p>
                <p className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>squared_error<sup>(i)</sup> = (error<sup>(i)</sup>)²</p>
              </div>
              <div className="bg-teal-50 p-3 rounded mt-3">
                <p className="font-semibold text-teal-700">Total Sum:</p>
                <p className="text-center text-lg" style={{ fontFamily: 'Georgia, serif' }}>∑(h(x<sup>(i)</sup>) − y<sup>(i)</sup>)²</p>
                <p className="text-xs text-center text-gray-600">i=1 to m</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <h6 className="font-semibold text-gray-700 mb-2">Example Calculation:</h6>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-1">x</th>
                    <th className="p-1">y</th>
                    <th className="p-1">h(x)</th>
                    <th className="p-1">Error</th>
                    <th className="p-1">Error²</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1 text-center">1</td>
                    <td className="p-1 text-center">2</td>
                    <td className="p-1 text-center">1.5</td>
                    <td className="p-1 text-center">-0.5</td>
                    <td className="p-1 text-center bg-yellow-100">0.25</td>
                  </tr>
                  <tr>
                    <td className="p-1 text-center">2</td>
                    <td className="p-1 text-center">4</td>
                    <td className="p-1 text-center">3.5</td>
                    <td className="p-1 text-center">-0.5</td>
                    <td className="p-1 text-center bg-yellow-100">0.25</td>
                  </tr>
                  <tr>
                    <td className="p-1 text-center">3</td>
                    <td className="p-1 text-center">5</td>
                    <td className="p-1 text-center">5.5</td>
                    <td className="p-1 text-center">0.5</td>
                    <td className="p-1 text-center bg-yellow-100">0.25</td>
                  </tr>
                  <tr className="border-t-2 border-green-300">
                    <td colSpan="4" className="p-1 text-right font-semibold">Sum:</td>
                    <td className="p-1 text-center font-bold bg-green-100">0.75</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Step 4: Why Divide by 2m */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg mb-6">
          <h5 className="text-xl font-semibold text-purple-800 mb-4">Step 4: Why Divide by 2m?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-purple-700 mb-2">Why divide by m?</p>
                  <p className="text-sm text-gray-700 mb-2">
                    Average করার জন্য! 100টি points এর cost আর 10টি points এর cost compare করতে পারি।
                  </p>
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <p>10 points: Sum = 50, Average = 50/10 = 5</p>
                    <p>100 points: Sum = 500, Average = 500/100 = 5</p>
                    <p className="text-green-600">Same average error!</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-indigo-700 mb-2">Why multiply by ½?</p>
                  <p className="text-sm text-gray-700">
                    Mathematical convenience! যখন আমরা derivative নিব (gradient descent এ), 
                    2 cancel হয়ে যাবে।
                  </p>
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <p>d/dx (½x²) = x</p>
                    <p>d/dx (x²) = 2x</p>
                    <p className="text-blue-600">½ makes math cleaner!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <h6 className="font-semibold text-gray-700 mb-3">Final Formula Derivation:</h6>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <p>Step 1: Sum of squared errors</p>
                  <p style={{ fontFamily: 'Georgia, serif' }}>∑(h(x<sup>(i)</sup>) − y<sup>(i)</sup>)²</p>
                </div>
                <div className="text-center text-gray-400">↓</div>
                <div className="bg-gray-50 p-2 rounded">
                  <p>Step 2: Take average (divide by m)</p>
                  <p style={{ fontFamily: 'Georgia, serif' }}>(1/m) ∑(h(x<sup>(i)</sup>) − y<sup>(i)</sup>)²</p>
                </div>
                <div className="text-center text-gray-400">↓</div>
                <div className="bg-blue-50 p-2 rounded">
                  <p>Step 3: Add ½ for convenience</p>
                  <p className="font-bold" style={{ fontFamily: 'Georgia, serif' }}>J(θ) = (1/2m) ∑(h(x<sup>(i)</sup>) − y<sup>(i)</sup>)²</p>
                </div>
              </div>
              
              <div className="mt-3 bg-indigo-50 p-2 rounded">
                <p className="text-xs font-semibold text-indigo-700">This is our Cost Function!</p>
                <p className="text-xs">Also called "Mean Squared Error" (MSE)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Complete Formula */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
          <h5 className="text-xl font-semibold text-blue-800 mb-4">Step 5: Complete Cost Function Formula</h5>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-blue-600 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                <span>J(θ<sub>0</sub>, θ<sub>1</sub>) = </span>
                <div className="inline-block align-middle">
                  <div className="text-center" style={{ lineHeight: '1' }}>
                    <div>1</div>
                    <div className="border-t border-blue-600 px-2"></div>
                    <div>2m</div>
                  </div>
                </div>
                <span className="text-3xl align-middle mx-2">∑</span>
                <span className="text-lg align-middle">
                  <sub>i=1</sub>
                  <sup>m</sup>
                </span>
                <span className="align-middle ml-2">(h<sub>θ</sub>(x<sup>(i)</sup>) − y<sup>(i)</sup>)<sup>2</sup></span>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>where h<sub>θ</sub>(x) = θ<sub>0</sub> + θ<sub>1</sub>x</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-700 text-sm">J(θ₀, θ₁)</p>
                <p className="text-xs">Cost function - our measure of error</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-700 text-sm">1/2m</p>
                <p className="text-xs">Average + mathematical convenience</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="font-semibold text-yellow-700 text-sm">∑(h-y)²</p>
                <p className="text-xs">Sum of squared prediction errors</p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <p className="text-sm font-semibold text-gray-700 mb-1">Our Goal:</p>
              <p className="text-sm">Find θ₀ and θ₁ that minimize J(θ₀, θ₁)</p>
              <p className="text-xs text-gray-600 mt-1">
                This gives us the best fitting line through our data!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Mean Squared Error (MSE)</h4>
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <div className="text-lg text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <span>J(θ<sub>0</sub>, θ<sub>1</sub>) = </span>
              <div className="inline-block align-middle">
                <div className="text-center" style={{ lineHeight: '1' }}>
                  <div>1</div>
                  <div className="border-t border-gray-700 px-2"></div>
                  <div>2m</div>
                </div>
              </div>
              <span className="mx-2">×</span>
              <span className="text-2xl">∑</span>
              <span>(ŷ<sub>i</sub> − y<sub>i</sub>)<sup>2</sup></span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• m = Total data points সংখ্যা</p>
              <p>• ŷ<sub>i</sub> = Predicted value (θ<sub>0</sub> + θ<sub>1</sub>x<sub>i</sub>)</p>
              <p>• y<sub>i</sub> = Actual value</p>
              <p>• (ŷ<sub>i</sub> − y<sub>i</sub>) = Error বা ভুল</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">বর্তমান Cost:</p>
            <p className="text-3xl font-bold text-yellow-600">{currentCost.toFixed(4)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Visual Representation</h4>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Scatter name="Actual Data" data={chartData} fill="#8884d8" />
              <ReferenceLine 
                segment={[
                  { x: Math.min(...data.map(p => p.x)), y: theta0 + theta1 * Math.min(...data.map(p => p.x)) },
                  { x: Math.max(...data.map(p => p.x)), y: theta0 + theta1 * Math.max(...data.map(p => p.x)) }
                ]} 
                stroke="red" 
                strokeWidth={2}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-gray-700">Error Breakdown (ভুলের বিস্তারিত)</h4>
          <button
            onClick={() => setShowErrorDetails(!showErrorDetails)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showErrorDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        {showErrorDetails && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Data Point</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actual (y)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Predicted (ŷ)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Error (ŷ - y)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Squared Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {errorCalculations.map((calc, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-600">{calc.label}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 font-medium">{calc.y}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 font-medium">{calc.prediction}</td>
                    <td className={`px-4 py-2 text-sm font-medium ${
                      parseFloat(calc.error) > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {calc.error}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 font-medium">{calc.squaredError}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">কেন Squared Error ব্যবহার করি?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">✓ সব error positive হয়</h5>
            <p className="text-sm text-gray-600">
              Negative error গুলো positive হয়ে যায়, তাই cancel out হয় না
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">✓ বড় error কে বেশি penalty</h5>
            <p className="text-sm text-gray-600">
              Square করার ফলে বড় error আরো বড় হয়ে যায়
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">✓ Mathematical সুবিধা</h5>
            <p className="text-sm text-gray-600">
              Derivative নেওয়া সহজ, optimization এ সাহায্য করে
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">✓ Smooth function</h5>
            <p className="text-sm text-gray-600">
              Continuous এবং differentiable everywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostFunction;