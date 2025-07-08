import React, { useState } from 'react';
import { CheckCircle, XCircle, Mail, School, CreditCard, Heart, AlertCircle, Lightbulb } from 'lucide-react';

const BasicIntroduction = () => {
  const [selectedExample, setSelectedExample] = useState('email');
  
  const examples = {
    email: {
      title: 'Email Spam Detection',
      icon: Mail,
      color: 'blue',
      positive: 'Spam Email',
      negative: 'Normal Email',
      features: ['Number of spam words', 'Sender reputation', 'Email length'],
      samples: [
        { feature: 'Few spam words', result: 0, label: 'Normal' },
        { feature: 'Many spam words', result: 1, label: 'Spam' }
      ]
    },
    exam: {
      title: 'Pass/Fail Prediction',
      icon: School,
      color: 'green',
      positive: 'Pass',
      negative: 'Fail',
      features: ['Study hours', 'Previous scores', 'Attendance'],
      samples: [
        { feature: '20 hours study', result: 0, label: 'Fail' },
        { feature: '60 hours study', result: 1, label: 'Pass' }
      ]
    },
    loan: {
      title: 'Loan Approval',
      icon: CreditCard,
      color: 'purple',
      positive: 'Approved',
      negative: 'Rejected',
      features: ['Income', 'Credit score', 'Employment'],
      samples: [
        { feature: 'Low income', result: 0, label: 'Rejected' },
        { feature: 'High income', result: 1, label: 'Approved' }
      ]
    },
    medical: {
      title: 'Disease Detection',
      icon: Heart,
      color: 'red',
      positive: 'Disease Present',
      negative: 'Healthy',
      features: ['Age', 'Symptoms', 'Test results'],
      samples: [
        { feature: 'No symptoms', result: 0, label: 'Healthy' },
        { feature: 'Multiple symptoms', result: 1, label: 'Disease' }
      ]
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Logistic Regression কী?</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-lg">
          Logistic Regression হল একটি classification algorithm যা binary outcomes (হ্যাঁ/না, সত্য/মিথ্যা, ০/১) 
          predict করতে ব্যবহৃত হয়। Linear Regression এর মত continuous values predict করার পরিবর্তে, 
          এটি probability (০ থেকে ১) predict করে।
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">কোথায় ব্যবহার হয়?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📧 Email Spam Detection</h4>
            <p>Email spam কি না তা identify করতে</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🏥 Medical Diagnosis</h4>
            <p>রোগ আছে কি নেই তা predict করতে</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">🎓 Pass/Fail Prediction</h4>
            <p>ছাত্র pass করবে কি fail করবে predict করতে</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">💳 Credit Default</h4>
            <p>Loan default হবে কি না predict করতে</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Linear vs Logistic Regression</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Feature</th>
                <th className="border px-4 py-2">Linear Regression</th>
                <th className="border px-4 py-2">Logistic Regression</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">Output</td>
                <td className="border px-4 py-2">Continuous value (যেকোনো সংখ্যা)</td>
                <td className="border px-4 py-2">Probability (০ থেকে ১)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2 font-semibold">Use Case</td>
                <td className="border px-4 py-2">Price, temperature prediction</td>
                <td className="border px-4 py-2">Yes/No, Pass/Fail prediction</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Function</td>
                <td className="border px-4 py-2">y = θ₀ + θ₁x</td>
                <td className="border px-4 py-2">p = 1/(1 + e^-(θ₀ + θ₁x))</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Analogy Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          সহজ ভাষায় বুঝি
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-3">Linear Regression (আগের পাঠ)</h4>
            <div className="space-y-2">
              <p className="text-sm">প্রশ্ন: "কত নম্বর পাবে?"</p>
              <div className="bg-gray-100 p-3 rounded text-center">
                <p className="text-2xl font-bold">85.5</p>
                <p className="text-sm text-gray-600">Exact number</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-3">Logistic Regression (এই পাঠ)</h4>
            <div className="space-y-2">
              <p className="text-sm">প্রশ্ন: "পাস করবে কি না?"</p>
              <div className="bg-gray-100 p-3 rounded text-center">
                <p className="text-2xl font-bold">হ্যাঁ / না</p>
                <p className="text-sm text-gray-600">Yes or No</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm">
            <strong>মনে রাখুন:</strong> Linear Regression দেয় সংখ্যা, Logistic Regression দেয় হ্যাঁ/না উত্তর
          </p>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Interactive Real-World Examples</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(examples).map(([key, example]) => {
            const Icon = example.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedExample === key
                    ? `border-${example.color}-500 bg-${example.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-1 text-${example.color}-600`} />
                <p className="text-sm font-medium">{example.title}</p>
              </button>
            );
          })}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            {React.createElement(examples[selectedExample].icon, { 
              className: `w-5 h-5 text-${examples[selectedExample].color}-600` 
            })}
            {examples[selectedExample].title}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded">
              <p className="text-sm font-medium mb-2">Input Features:</p>
              <ul className="space-y-1">
                {examples[selectedExample].features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded">
              <p className="text-sm font-medium mb-2">Output Classes:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm">Class 0: {examples[selectedExample].negative}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Class 1: {examples[selectedExample].positive}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm font-medium mb-2">Example Predictions:</p>
            <div className="space-y-2">
              {examples[selectedExample].samples.map((sample, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{sample.feature}</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    sample.result === 1 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {sample.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Process Flow */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">How Logistic Regression Works (Visual)</h3>
        
        <div className="relative">
          {/* Process Flow Diagram */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <p className="font-semibold mb-1">Step 1: Input</p>
                <p className="text-sm">Features (x)</p>
                <p className="text-xs text-gray-600 mt-1">e.g., spam words = 25</p>
              </div>
            </div>
            
            <div className="text-2xl">→</div>
            
            <div className="flex-1">
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <p className="font-semibold mb-1">Step 2: Calculate</p>
                <p className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>z = θ₀ + θ₁x</p>
                <p className="text-xs text-gray-600 mt-1">e.g., z = 2.5</p>
              </div>
            </div>
            
            <div className="text-2xl">→</div>
            
            <div className="flex-1">
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <p className="font-semibold mb-1">Step 3: Sigmoid</p>
                <p className="text-sm">Convert to 0-1</p>
                <p className="text-xs text-gray-600 mt-1">e.g., σ(2.5) = 0.92</p>
              </div>
            </div>
            
            <div className="text-2xl">→</div>
            
            <div className="flex-1">
              <div className="bg-yellow-100 p-4 rounded-lg text-center">
                <p className="font-semibold mb-1">Step 4: Decide</p>
                <p className="text-sm">≥ 0.5 → Class 1</p>
                <p className="text-xs text-gray-600 mt-1">0.92 ≥ 0.5 → Spam!</p>
              </div>
            </div>
          </div>
          
          {/* Visual representation of probability */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-3">Probability Visualization:</p>
            <div className="relative h-8 bg-gradient-to-r from-red-400 to-green-400 rounded-full">
              <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2">
                <span className="text-xs font-medium text-white">0 (No)</span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                <span className="text-xs font-medium text-white">1 (Yes)</span>
              </div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white"></div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
                <span className="text-xs font-medium">0.5 (Decision Point)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          মূল ধারণা (Key Concepts)
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-orange-200 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-medium">Linear Combination</p>
              <p className="text-sm text-gray-600">Input features থেকে একটি number তৈরি করা (z = θ₀ + θ₁x)</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-orange-200 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-medium">Sigmoid Transform</p>
              <p className="text-sm text-gray-600">Number কে probability তে convert করা (0 থেকে 1)</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-orange-200 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-medium">Classification</p>
              <p className="text-sm text-gray-600">Probability থেকে final decision (Yes/No)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicIntroduction;