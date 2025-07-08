import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import NumberSystems from './Prerequisites/NumberSystems';
import CoordinateGeometry from './Prerequisites/CoordinateGeometry';
import Functions from './Prerequisites/Functions';
import Statistics from './Prerequisites/Statistics';
import Algebra from './Prerequisites/Algebra';
import GraphsAndLines from './Prerequisites/GraphsAndLines';

const Prerequisites = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Load progress from localStorage
  const loadProgress = () => {
    const savedProgress = localStorage.getItem('prerequisitesProgress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    return {
      numberSystems: { completed: false, score: 0 },
      coordinates: { completed: false, score: 0 },
      functions: { completed: false, score: 0 },
      statistics: { completed: false, score: 0 },
      algebra: { completed: false, score: 0 },
      graphs: { completed: false, score: 0 }
    };
  };
  
  const [progress, setProgress] = useState(loadProgress());
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('prerequisitesProgress', JSON.stringify(progress));
  }, [progress]);

  const tabs = [
    { 
      name: 'Overview', 
      id: 'overview',
      icon: '📊'
    },
    { 
      name: 'Number Systems', 
      id: 'numberSystems',
      bengaliName: 'সংখ্যা পদ্ধতি',
      icon: '🔢'
    },
    { 
      name: 'Coordinates', 
      id: 'coordinates',
      bengaliName: 'স্থানাঙ্ক',
      icon: '📍'
    },
    { 
      name: 'Functions', 
      id: 'functions',
      bengaliName: 'ফাংশন',
      icon: '🔄'
    },
    { 
      name: 'Statistics', 
      id: 'statistics',
      bengaliName: 'পরিসংখ্যান',
      icon: '📈'
    },
    { 
      name: 'Algebra', 
      id: 'algebra',
      bengaliName: 'বীজগণিত',
      icon: '➕'
    },
    { 
      name: 'Graphs & Lines', 
      id: 'graphs',
      bengaliName: 'গ্রাফ ও রেখা',
      icon: '📉'
    }
  ];

  const getReadinessScore = () => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    return Math.round((completed / 6) * 100);
  };

  const renderOverview = () => (
    <div className="p-8 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Prerequisites Overview</h3>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">আপনার প্রস্তুতি (Your Readiness)</h4>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-semibold">{getReadinessScore()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getReadinessScore()}%` }}
            />
          </div>
        </div>
        
        {getReadinessScore() < 100 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-yellow-700">
                Linear Regression শেখার আগে এই prerequisite গুলো complete করুন।
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-700">
                অভিনন্দন! আপনি Linear Regression শেখার জন্য প্রস্তুত।
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(progress).map(([key, value]) => {
          const tab = tabs.find(t => t.id === key);
          if (!tab) return null;
          
          return (
            <div 
              key={key}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveTab(tabs.findIndex(t => t.id === key))}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{tab.icon}</span>
                {value.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <h5 className="font-semibold text-gray-800 mb-1">{tab.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{tab.bengaliName}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    value.completed ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                  style={{ width: value.completed ? '100%' : '0%' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">কেন Prerequisites গুরুত্বপূর্ণ?</h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">
              <strong>Strong Foundation:</strong> Linear Regression বুঝতে mathematical concepts জানা জরুরি
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">
              <strong>Better Understanding:</strong> Prerequisites জানলে complex concepts সহজ মনে হবে
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">
              <strong>Faster Learning:</strong> Basics clear থাকলে advanced topics দ্রুত শিখতে পারবেন
            </span>
          </div>
        </div>
      </div>
    </div>
  );


  const handleTopicComplete = (topicId) => {
    setProgress({
      ...progress,
      [topicId]: { completed: true, score: 100 }
    });
  };

  const renderTabContent = () => {
    switch (tabs[activeTab].id) {
      case 'overview':
        return renderOverview();
      case 'numberSystems':
        return <NumberSystems onComplete={() => handleTopicComplete('numberSystems')} />;
      case 'coordinates':
        return <CoordinateGeometry onComplete={() => handleTopicComplete('coordinates')} />;
      case 'functions':
        return <Functions onComplete={() => handleTopicComplete('functions')} />;
      case 'statistics':
        return <Statistics onComplete={() => handleTopicComplete('statistics')} />;
      case 'algebra':
        return <Algebra onComplete={() => handleTopicComplete('algebra')} />;
      case 'graphs':
        return <GraphsAndLines onComplete={() => handleTopicComplete('graphs')} />;
      default:
        return (
          <div className="p-8 max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">{tabs[activeTab].name}</h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">
                This section is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Prerequisites for Linear Regression</h2>
          <p className="text-gray-600 mt-1">Master the basics before diving into machine learning</p>
        </div>
        <div className="flex overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 whitespace-nowrap transition-colors flex items-center ${
                activeTab === index
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
              {tab.id !== 'overview' && progress[tab.id]?.completed && (
                <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-50">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Prerequisites;