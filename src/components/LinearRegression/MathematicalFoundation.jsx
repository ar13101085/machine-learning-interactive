import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MathematicalFoundation = () => {
  const coordinateData = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 8 },
    { x: 5, y: 10 }
  ];

  const slopeExamples = [
    { name: 'Positive Slope', data: [{ x: 0, y: 1 }, { x: 5, y: 6 }], color: '#10b981' },
    { name: 'Negative Slope', data: [{ x: 0, y: 6 }, { x: 5, y: 1 }], color: '#ef4444' },
    { name: 'Zero Slope', data: [{ x: 0, y: 3 }, { x: 5, y: 3 }], color: '#3b82f6' }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Mathematical Foundation</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Coordinate System (স্থানাঙ্ক পদ্ধতি)</h4>
          <p className="text-gray-600 mb-4">
            Linear Regression বোঝার জন্য প্রথমে coordinate system বুঝতে হবে। 
            প্রতিটি data point এর দুটি মান থাকে: x (input) এবং y (output)।
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={coordinateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" label={{ value: 'X-axis (Input)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Y-axis (Output)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Linear Equation (সরল রেখার সমীকরণ)</h4>
          <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <div className="text-2xl text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <span>y = mx + c</span>
            </div>
            <p className="text-xl text-center mb-4">বা</p>
            <div className="text-2xl text-center" style={{ fontFamily: 'Georgia, serif' }}>
              <span>y = θ</span><sub>1</sub><span>x + θ</span><sub>0</sub>
            </div>
          </div>
          <div className="space-y-2 text-gray-600">
            <p><strong>m বা θ<sub>1</sub></strong> = Slope (ঢাল) - রেখাটি কতটা খাড়া</p>
            <p><strong>c বা θ<sub>0</sub></strong> = Y-intercept - রেখাটি Y-axis এ কোথায় কাটে</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Slope (ঢাল) এর ধারণা</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="bg-green-50 p-4 rounded-lg mb-2">
              <p className="font-semibold text-green-700">Positive Slope</p>
              <p className="text-sm text-gray-600">X বাড়লে Y বাড়ে</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-red-50 p-4 rounded-lg mb-2">
              <p className="font-semibold text-red-700">Negative Slope</p>
              <p className="text-sm text-gray-600">X বাড়লে Y কমে</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-50 p-4 rounded-lg mb-2">
              <p className="font-semibold text-blue-700">Zero Slope</p>
              <p className="text-sm text-gray-600">X পরিবর্তনে Y অপরিবর্তিত</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h5 className="font-semibold text-gray-700 mb-4">Slope Calculation Formula</h5>
          <div className="text-center">
            <div className="text-xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <span>Slope (m) = </span>
              <div className="inline-block align-middle">
                <div className="text-center" style={{ lineHeight: '1' }}>
                  <div>(y<sub>2</sub> − y<sub>1</sub>)</div>
                  <div className="border-t border-gray-700 px-2"></div>
                  <div>(x<sub>2</sub> − x<sub>1</sub>)</div>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              দুটি point (x<sub>1</sub>, y<sub>1</sub>) এবং (x<sub>2</sub>, y<sub>2</sub>) এর মধ্যে slope
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">উদাহরণ সহ ব্যাখ্যা</h4>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h5 className="font-semibold text-gray-700 mb-3">বাস্তব উদাহরণ: পড়াশোনার সময় এবং নম্বর</h5>
          <p className="text-gray-600 mb-3">
            ধরি, একজন ছাত্র প্রতি ঘন্টা পড়াশোনার জন্য গড়ে 10 নম্বর বেশি পায়, এবং 
            কোন পড়াশোনা ছাড়াই সে 40 নম্বর পায় (basic knowledge)।
          </p>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-lg text-center" style={{ fontFamily: 'Georgia, serif' }}>y = 10x + 40</div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              যেখানে: x = পড়াশোনার ঘন্টা, y = প্রত্যাশিত নম্বর
            </p>
          </div>
          <div className="mt-4 space-y-2 text-gray-600">
            <p>• 2 ঘন্টা পড়লে: y = 10(2) + 40 = 60 নম্বর</p>
            <p>• 4 ঘন্টা পড়লে: y = 10(4) + 40 = 80 নম্বর</p>
            <p>• 6 ঘন্টা পড়লে: y = 10(6) + 40 = 100 নম্বর</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicalFoundation;