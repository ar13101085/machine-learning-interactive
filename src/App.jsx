import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LinearRegression from './components/LinearRegression';
import LogisticRegression from './components/LogisticRegression';
import Prerequisites from './components/Prerequisites';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('prerequisites-lr');

  const topics = [
    { 
      id: 'prerequisites-lr', 
      name: 'Prerequisites', 
      component: Prerequisites,
      category: 'Linear Regression',
      isPrerequisite: true
    },
    { 
      id: 'linear-regression', 
      name: 'Linear Regression', 
      component: LinearRegression,
      category: 'Linear Regression',
      requiresPrerequisite: 'prerequisites-lr'
    },
    { 
      id: 'logistic-regression', 
      name: 'Logistic Regression', 
      component: LogisticRegression,
      category: 'Linear Regression',
      requiresPrerequisite: 'linear-regression'
    }
  ];

  const SelectedComponent = topics.find(t => t.id === selectedTopic)?.component || Prerequisites;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        topics={topics} 
        selectedTopic={selectedTopic} 
        onSelectTopic={setSelectedTopic} 
      />
      <main className="flex-1 overflow-auto">
        <SelectedComponent />
      </main>
    </div>
  );
}

export default App;