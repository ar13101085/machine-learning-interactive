import React, { useState, useCallback, useEffect } from 'react';
import PrerequisiteCheck from './LinearRegression/PrerequisiteCheck';
import BasicIntroduction from './LinearRegression/BasicIntroduction';
import MathematicalFoundation from './LinearRegression/MathematicalFoundation';
import CostFunction from './LinearRegression/CostFunction';
import GradientDescent from './LinearRegression/GradientDescent';
import InteractivePractice from './LinearRegression/InteractivePractice';
import CompleteVisualization from './LinearRegression/CompleteVisualization';

const LinearRegression = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [theta0, setTheta0] = useState(0);
  const [theta1, setTheta1] = useState(0);
  const [learningRate, setLearningRate] = useState(0.01);
  const [costHistory, setCostHistory] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [dataExample, setDataExample] = useState('house');
  const [userPoints, setUserPoints] = useState([]);

  const tabs = [
    { name: 'Prerequisites', component: PrerequisiteCheck },
    { name: 'Basic Introduction', component: BasicIntroduction },
    { name: 'Mathematical Foundation', component: MathematicalFoundation },
    { name: 'Cost Function', component: CostFunction },
    { name: 'Gradient Descent', component: GradientDescent },
    { name: 'Interactive Practice', component: InteractivePractice },
    { name: 'Complete Visualization', component: CompleteVisualization }
  ];

  const dataExamples = {
    house: [
      { x: 1000, y: 200, label: "১০০০ বর্গফুট বাড়ি → ২০০ লাখ টাকা" },
      { x: 1500, y: 320, label: "১৫০০ বর্গফুট বাড়ি → ৩২০ লাখ টাকা" },
      { x: 2000, y: 410, label: "২০০০ বর্গফুট বাড়ি → ৪১০ লাখ টাকা" },
      { x: 2500, y: 530, label: "২৫০০ বর্গফুট বাড়ি → ৫৩০ লাখ টাকা" },
      { x: 3000, y: 650, label: "৩০০০ বর্গফুট বাড়ি → ৬৫০ লাখ টাকা" }
    ],
    student: [
      { x: 2, y: 55, label: "২ ঘন্টা পড়াশোনা → ৫৫ নম্বর" },
      { x: 3, y: 65, label: "৩ ঘন্টা পড়াশোনা → ৬৫ নম্বর" },
      { x: 4, y: 72, label: "৪ ঘন্টা পড়াশোনা → ৭২ নম্বর" },
      { x: 5, y: 80, label: "৫ ঘন্টা পড়াশোনা → ৮০ নম্বর" },
      { x: 6, y: 88, label: "৬ ঘন্টা পড়াশোনা → ৮৮ নম্বর" }
    ],
    temperature: [
      { x: 10, y: 12, label: "১০°C temperature → ১২টি ice cream বিক্রি" },
      { x: 15, y: 25, label: "১৫°C temperature → ২৫টি ice cream বিক্রি" },
      { x: 20, y: 40, label: "২০°C temperature → ৪০টি ice cream বিক্রি" },
      { x: 25, y: 58, label: "২৫°C temperature → ৫৮টি ice cream বিক্রি" },
      { x: 30, y: 75, label: "৩০°C temperature → ৭৫টি ice cream বিক্রি" }
    ]
  };

  const getCurrentData = useCallback(() => {
    return userPoints.length > 0 ? userPoints : dataExamples[dataExample];
  }, [userPoints, dataExample]);

  const calculateCost = useCallback((data, t0, t1) => {
    const m = data.length;
    let sumSquaredErrors = 0;
    
    data.forEach(point => {
      const prediction = t0 + t1 * point.x;
      const error = prediction - point.y;
      sumSquaredErrors += error * error;
    });
    
    return sumSquaredErrors / (2 * m);
  }, []);

  const calculateGradients = useCallback((data, t0, t1) => {
    const m = data.length;
    let sumErrorTheta0 = 0;
    let sumErrorTheta1 = 0;
    
    data.forEach(point => {
      const prediction = t0 + t1 * point.x;
      const error = prediction - point.y;
      sumErrorTheta0 += error;
      sumErrorTheta1 += error * point.x;
    });
    
    const gradientTheta0 = sumErrorTheta0 / m;
    const gradientTheta1 = sumErrorTheta1 / m;
    
    return { gradientTheta0, gradientTheta1 };
  }, []);

  const performGradientDescentStep = useCallback(() => {
    const data = getCurrentData();
    const { gradientTheta0, gradientTheta1 } = calculateGradients(data, theta0, theta1);
    
    const newTheta0 = theta0 - learningRate * gradientTheta0;
    const newTheta1 = theta1 - learningRate * gradientTheta1;
    
    setTheta0(newTheta0);
    setTheta1(newTheta1);
    
    const cost = calculateCost(data, newTheta0, newTheta1);
    setCostHistory(prev => [...prev, { iteration: prev.length, cost }]);
  }, [theta0, theta1, learningRate, getCurrentData, calculateGradients, calculateCost]);

  const resetModel = () => {
    setTheta0(0);
    setTheta1(0);
    setCostHistory([]);
    setIsTraining(false);
  };

  const generateLineData = useCallback(() => {
    const data = getCurrentData();
    if (data.length === 0) return [];
    
    const minX = Math.min(...data.map(p => p.x));
    const maxX = Math.max(...data.map(p => p.x));
    
    return [
      { x: minX, y: theta0 + theta1 * minX },
      { x: maxX, y: theta0 + theta1 * maxX }
    ];
  }, [getCurrentData, theta0, theta1]);

  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        performGradientDescentStep();
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isTraining, performGradientDescentStep]);

  const TabComponent = tabs[activeTab].component;

  const commonProps = {
    theta0,
    theta1,
    setTheta0,
    setTheta1,
    learningRate,
    setLearningRate,
    costHistory,
    isTraining,
    setIsTraining,
    dataExample,
    setDataExample,
    dataExamples,
    userPoints,
    setUserPoints,
    getCurrentData,
    calculateCost,
    calculateGradients,
    performGradientDescentStep,
    resetModel,
    generateLineData
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Linear Regression</h2>
          <p className="text-gray-600 mt-1">Interactive Learning Tool</p>
        </div>
        <div className="flex overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 whitespace-nowrap transition-colors ${
                activeTab === index
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <TabComponent {...commonProps} />
      </div>
    </div>
  );
};

export default LinearRegression;