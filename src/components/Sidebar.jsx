import React from 'react';

const Sidebar = ({ topics, selectedTopic, onSelectTopic }) => {
  // Group topics by category
  const categories = topics.reduce((acc, topic) => {
    const category = topic.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(topic);
    return acc;
  }, {});

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Machine Learning</h1>
        <p className="text-sm text-gray-600 mt-2">Interactive Tutorial</p>
      </div>
      <nav className="mt-4">
        {Object.entries(categories).map(([category, categoryTopics]) => (
          <div key={category}>
            <h3 className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {category}
            </h3>
            {categoryTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={`w-full text-left px-6 py-3 transition-colors flex items-center ${
                  selectedTopic === topic.id
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {topic.isPrerequisite && (
                  <span className="mr-2">📚</span>
                )}
                {topic.name}
                {topic.requiresPrerequisite && (
                  <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    Requires Prerequisites
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;