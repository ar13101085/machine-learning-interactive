import React from 'react';
import { CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';

const PrerequisiteCheck = () => {
  // Load progress from localStorage
  const savedProgress = localStorage.getItem('prerequisitesProgress');
  const progress = savedProgress ? JSON.parse(savedProgress) : {};
  
  const prerequisites = [
    {
      name: 'Number Systems',
      bengali: 'সংখ্যা পদ্ধতি',
      completed: progress.numberSystems?.completed || false,
      topics: ['Natural numbers', 'Integers', 'Decimals', 'Fractions'],
      importance: 'Understanding different types of numbers used in calculations'
    },
    {
      name: 'Coordinate Geometry',
      bengali: 'স্থানাঙ্ক জ্যামিতি',
      completed: progress.coordinates?.completed || false,
      topics: ['X-Y axes', 'Plotting points', 'Quadrants', 'Distance formula'],
      importance: 'Essential for understanding data visualization and graphs'
    },
    {
      name: 'Functions',
      bengali: 'ফাংশন',
      completed: progress.functions?.completed || false,
      topics: ['Input-output relationships', 'Function notation', 'Domain and range'],
      importance: 'Core concept for understanding how Linear Regression works'
    },
    {
      name: 'Basic Statistics',
      bengali: 'মৌলিক পরিসংখ্যান',
      completed: progress.statistics?.completed || false,
      topics: ['Mean/Average', 'Sum notation', 'Data collection', 'Variability'],
      importance: 'Needed to understand error measurement and cost functions'
    },
    {
      name: 'Algebra Fundamentals',
      bengali: 'বীজগণিত মৌলিক',
      completed: progress.algebra?.completed || false,
      topics: ['Variables', 'Linear equations', 'Substitution', 'Solving for unknowns'],
      importance: 'Required for understanding parameter updates and formulas'
    },
    {
      name: 'Graphs & Lines',
      bengali: 'গ্রাফ ও রেখা',
      completed: progress.graphs?.completed || false,
      topics: ['Slope concept', 'Y-intercept', 'Linear relationships', 'Graph reading'],
      importance: 'Direct foundation for Linear Regression concepts'
    }
  ];

  const completedCount = prerequisites.filter(p => p.completed).length;
  const completionPercentage = Math.round((completedCount / prerequisites.length) * 100);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Prerequisite Check</h3>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold text-gray-700">Your Readiness Score</h4>
          <span className="text-3xl font-bold text-blue-600">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        {completionPercentage < 100 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="text-yellow-700 font-semibold">
                  Prerequisites Incomplete!
                </p>
                <p className="text-yellow-600 text-sm mt-1">
                  Linear Regression ভালোভাবে বুঝতে হলে নিচের সব prerequisites complete করুন। 
                  Click on "Prerequisites" in the sidebar to learn these topics.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="text-green-700 font-semibold">
                  All Prerequisites Complete!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  অভিনন্দন! আপনি Linear Regression শেখার জন্য সম্পূর্ণ প্রস্তুত।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prerequisites.map((prereq, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              prereq.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-semibold text-gray-800">{prereq.name}</h5>
                <p className="text-sm text-gray-600">{prereq.bengali}</p>
              </div>
              {prereq.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-gray-300" />
              )}
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Key Topics:</p>
              <div className="flex flex-wrap gap-2">
                {prereq.topics.map((topic, i) => (
                  <span 
                    key={i}
                    className={`px-2 py-1 text-xs rounded ${
                      prereq.completed 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-500 italic">
              Why needed: {prereq.importance}
            </p>
            
            {!prereq.completed && (
              <button className="mt-3 flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                <BookOpen className="w-4 h-4 mr-1" />
                Learn this topic
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">
          Linear Regression এ কি কি শিখবেন?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <span className="text-blue-500 mr-2 mt-1">📊</span>
            <div>
              <p className="font-medium text-gray-700">Prediction Model</p>
              <p className="text-sm text-gray-600">
                Data থেকে pattern খুঁজে future prediction করা
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2 mt-1">📈</span>
            <div>
              <p className="font-medium text-gray-700">Cost Function</p>
              <p className="text-sm text-gray-600">
                Model এর accuracy measure করা
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2 mt-1">🎯</span>
            <div>
              <p className="font-medium text-gray-700">Gradient Descent</p>
              <p className="text-sm text-gray-600">
                Model কে automatically improve করা
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2 mt-1">🔧</span>
            <div>
              <p className="font-medium text-gray-700">Hands-on Practice</p>
              <p className="text-sm text-gray-600">
                Interactive tools দিয়ে নিজে experiment করা
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-2">
          💡 Pro Tip
        </h4>
        <p className="text-blue-700">
          Prerequisites clear না থাকলেও আপনি Linear Regression explore করতে পারেন, 
          কিন্তু mathematical concepts বুঝতে কষ্ট হতে পারে। আমরা recommend করি প্রথমে 
          prerequisites complete করে তারপর এই module start করার।
        </p>
      </div>
    </div>
  );
};

export default PrerequisiteCheck;