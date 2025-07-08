import React, { useState, useCallback, useEffect } from 'react';
import BasicIntroduction from './LogisticRegression/BasicIntroduction';
import MathematicalFoundation from './LogisticRegression/MathematicalFoundation';
import SigmoidFunction from './LogisticRegression/SigmoidFunction';
import CostFunction from './LogisticRegression/CostFunction';
import GradientDescent from './LogisticRegression/GradientDescent';
import InteractivePractice from './LogisticRegression/InteractivePractice';
import CompleteVisualization from './LogisticRegression/CompleteVisualization';

const LogisticRegression = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [theta0, setTheta0] = useState(0);
  const [theta1, setTheta1] = useState(0);
  const [learningRate, setLearningRate] = useState(0.01);
  const [costHistory, setCostHistory] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [dataExample, setDataExample] = useState('exam');
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [confusionMatrix, setConfusionMatrix] = useState(null);
  const [userPoints, setUserPoints] = useState([]);

  const tabs = [
    { name: 'Basic Introduction', component: BasicIntroduction },
    { name: 'Mathematical Foundation', component: MathematicalFoundation },
    { name: 'Sigmoid Function', component: SigmoidFunction },
    { name: 'Cost Function', component: CostFunction },
    { name: 'Gradient Descent', component: GradientDescent },
    { name: 'Interactive Practice', component: InteractivePractice },
    { name: 'Complete Visualization', component: CompleteVisualization }
  ];

  // Comprehensive real-world datasets with actual values
  const dataExamples = {
    email: [
      // Normal emails (y=0)
      { x: 2, y: 0, label: "2 spam words → Normal (Newsletter)" },
      { x: 5, y: 0, label: "5 spam words → Normal (Work email)" },
      { x: 8, y: 0, label: "8 spam words → Normal (Personal)" },
      { x: 10, y: 0, label: "10 spam words → Normal (Promotional)" },
      { x: 12, y: 0, label: "12 spam words → Normal (Update)" },
      { x: 15, y: 0, label: "15 spam words → Normal (Newsletter)" },
      // Borderline cases
      { x: 18, y: 0, label: "18 spam words → Normal (Marketing)" },
      { x: 20, y: 1, label: "20 spam words → Spam (Suspicious)" },
      { x: 22, y: 1, label: "22 spam words → Spam (Phishing)" },
      // Spam emails (y=1)
      { x: 25, y: 1, label: "25 spam words → Spam (Scam)" },
      { x: 30, y: 1, label: "30 spam words → Spam (Fake lottery)" },
      { x: 35, y: 1, label: "35 spam words → Spam (Nigerian prince)" },
      { x: 40, y: 1, label: "40 spam words → Spam (Fake pharmacy)" },
      { x: 45, y: 1, label: "45 spam words → Spam (Money scam)" },
      { x: 50, y: 1, label: "50 spam words → Spam (Malware)" }
    ],
    exam: [
      // Failed students (y=0)
      { x: 5, y: 0, label: "5 hrs study → Fail (No preparation)" },
      { x: 10, y: 0, label: "10 hrs study → Fail (Minimal effort)" },
      { x: 15, y: 0, label: "15 hrs study → Fail (Below average)" },
      { x: 20, y: 0, label: "20 hrs study → Fail (Insufficient)" },
      { x: 25, y: 0, label: "25 hrs study → Fail (Nearly there)" },
      { x: 28, y: 0, label: "28 hrs study → Fail (Close)" },
      // Borderline cases
      { x: 30, y: 0, label: "30 hrs study → Fail (Borderline)" },
      { x: 32, y: 1, label: "32 hrs study → Pass (Just passed)" },
      { x: 35, y: 1, label: "35 hrs study → Pass (Adequate)" },
      // Passed students (y=1)
      { x: 40, y: 1, label: "40 hrs study → Pass (Good)" },
      { x: 45, y: 1, label: "45 hrs study → Pass (Very good)" },
      { x: 50, y: 1, label: "50 hrs study → Pass (Excellent)" },
      { x: 55, y: 1, label: "55 hrs study → Pass (Outstanding)" },
      { x: 60, y: 1, label: "60 hrs study → Pass (Top performer)" },
      { x: 65, y: 1, label: "65 hrs study → Pass (Dedicated)" }
    ],
    disease: [
      // Healthy patients (y=0)
      { x: 20, y: 0, label: "Age 20 → Healthy (Young adult)" },
      { x: 25, y: 0, label: "Age 25 → Healthy (Active)" },
      { x: 30, y: 0, label: "Age 30 → Healthy (Prime age)" },
      { x: 35, y: 0, label: "Age 35 → Healthy (Good health)" },
      { x: 40, y: 0, label: "Age 40 → Healthy (Preventive care)" },
      { x: 42, y: 0, label: "Age 42 → Healthy (Regular checkup)" },
      // Risk zone
      { x: 45, y: 0, label: "Age 45 → Healthy (Risk factors)" },
      { x: 48, y: 1, label: "Age 48 → Disease (Early signs)" },
      { x: 50, y: 1, label: "Age 50 → Disease (Diagnosed)" },
      // Disease patients (y=1)
      { x: 55, y: 1, label: "Age 55 → Disease (Treatment)" },
      { x: 60, y: 1, label: "Age 60 → Disease (Managing)" },
      { x: 65, y: 1, label: "Age 65 → Disease (Chronic)" },
      { x: 70, y: 1, label: "Age 70 → Disease (Advanced)" },
      { x: 75, y: 1, label: "Age 75 → Disease (Multiple conditions)" },
      { x: 80, y: 1, label: "Age 80 → Disease (Elderly care)" }
    ],
    creditScore: [
      // Loan rejected (y=0)
      { x: 300, y: 0, label: "Score 300 → Rejected (Very poor)" },
      { x: 400, y: 0, label: "Score 400 → Rejected (Poor)" },
      { x: 500, y: 0, label: "Score 500 → Rejected (Below average)" },
      { x: 550, y: 0, label: "Score 550 → Rejected (Risky)" },
      { x: 580, y: 0, label: "Score 580 → Rejected (Insufficient)" },
      { x: 600, y: 0, label: "Score 600 → Rejected (Borderline)" },
      // Decision boundary area
      { x: 620, y: 0, label: "Score 620 → Rejected (Close)" },
      { x: 640, y: 1, label: "Score 640 → Approved (Fair)" },
      { x: 660, y: 1, label: "Score 660 → Approved (Acceptable)" },
      // Loan approved (y=1)
      { x: 680, y: 1, label: "Score 680 → Approved (Good)" },
      { x: 700, y: 1, label: "Score 700 → Approved (Very good)" },
      { x: 720, y: 1, label: "Score 720 → Approved (Excellent)" },
      { x: 750, y: 1, label: "Score 750 → Approved (Premium)" },
      { x: 780, y: 1, label: "Score 780 → Approved (Elite)" },
      { x: 800, y: 1, label: "Score 800 → Approved (Perfect)" }
    ]
  };

  const data = userPoints.length > 0 ? userPoints : dataExamples[dataExample];

  const normalizeX = (x) => {
    const maxX = Math.max(...data.map(d => d.x));
    const minX = Math.min(...data.map(d => d.x));
    return (x - minX) / (maxX - minX);
  };
  
  // Denormalize for display purposes
  const denormalizeX = (xNorm) => {
    const maxX = Math.max(...data.map(d => d.x));
    const minX = Math.min(...data.map(d => d.x));
    return xNorm * (maxX - minX) + minX;
  };
  
  // Calculate statistics
  const calculateStatistics = () => {
    const predictions = data.map(point => ({
      actual: point.y,
      predicted: predict(point.x) >= 0.5 ? 1 : 0,
      probability: predict(point.x)
    }));
    
    // Confusion matrix
    let truePositive = 0, trueNegative = 0, falsePositive = 0, falseNegative = 0;
    
    predictions.forEach(p => {
      if (p.actual === 1 && p.predicted === 1) truePositive++;
      else if (p.actual === 0 && p.predicted === 0) trueNegative++;
      else if (p.actual === 0 && p.predicted === 1) falsePositive++;
      else if (p.actual === 1 && p.predicted === 0) falseNegative++;
    });
    
    const accuracy = (truePositive + trueNegative) / predictions.length;
    const precision = truePositive / (truePositive + falsePositive) || 0;
    const recall = truePositive / (truePositive + falseNegative) || 0;
    const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
    
    return {
      confusionMatrix: { truePositive, trueNegative, falsePositive, falseNegative },
      accuracy,
      precision,
      recall,
      f1Score,
      predictions
    };
  };

  const sigmoid = (z) => {
    return 1 / (1 + Math.exp(-z));
  };

  const predict = (x) => {
    const z = theta0 + theta1 * normalizeX(x);
    return sigmoid(z);
  };

  const calculateCost = useCallback((t0, t1) => {
    const m = data.length;
    let totalCost = 0;
    
    for (let i = 0; i < m; i++) {
      const x = normalizeX(data[i].x);
      const y = data[i].y;
      const h = sigmoid(t0 + t1 * x);
      
      if (h === 0 && y === 1) {
        totalCost += 1000;
      } else if (h === 1 && y === 0) {
        totalCost += 1000;
      } else {
        totalCost += -y * Math.log(h) - (1 - y) * Math.log(1 - h);
      }
    }
    
    return totalCost / m;
  }, [data]);

  const trainModel = useCallback(() => {
    if (isTraining) return;
    
    setIsTraining(true);
    setCostHistory([]);
    
    let currentTheta0 = theta0;
    let currentTheta1 = theta1;
    let iteration = 0;
    
    const train = () => {
      const m = data.length;
      let sum0 = 0;
      let sum1 = 0;
      
      for (let i = 0; i < m; i++) {
        const x = normalizeX(data[i].x);
        const y = data[i].y;
        const h = sigmoid(currentTheta0 + currentTheta1 * x);
        
        sum0 += (h - y);
        sum1 += (h - y) * x;
      }
      
      currentTheta0 -= learningRate * (sum0 / m);
      currentTheta1 -= learningRate * (sum1 / m);
      
      const cost = calculateCost(currentTheta0, currentTheta1);
      
      setTheta0(currentTheta0);
      setTheta1(currentTheta1);
      setCostHistory(prev => [...prev, cost]);
      
      iteration++;
      
      if (iteration < 100 && cost > 0.01) {
        requestAnimationFrame(train);
      } else {
        setIsTraining(false);
      }
    };
    
    requestAnimationFrame(train);
  }, [theta0, theta1, learningRate, data, calculateCost, isTraining]);

  const resetModel = () => {
    setTheta0(0);
    setTheta1(0);
    setCostHistory([]);
    setIsTraining(false);
  };

  useEffect(() => {
    resetModel();
  }, [dataExample]);

  const TabComponent = tabs[activeTab].component;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Logistic Regression</h1>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    py-2 px-1 border-b-2 font-medium text-sm
                    ${activeTab === index
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <TabComponent
            theta0={theta0}
            theta1={theta1}
            setTheta0={setTheta0}
            setTheta1={setTheta1}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
            data={data}
            predict={predict}
            costHistory={costHistory}
            isTraining={isTraining}
            trainModel={trainModel}
            resetModel={resetModel}
            dataExample={dataExample}
            setDataExample={setDataExample}
            dataExamples={dataExamples}
            userPoints={userPoints}
            setUserPoints={setUserPoints}
            calculateCost={calculateCost}
            normalizeX={normalizeX}
            denormalizeX={denormalizeX}
            sigmoid={sigmoid}
            calculateStatistics={calculateStatistics}
            showDetailedStats={showDetailedStats}
            setShowDetailedStats={setShowDetailedStats}
          />
        </div>
      </div>
    </div>
  );
};

export default LogisticRegression;