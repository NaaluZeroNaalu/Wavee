import React, { useState } from 'react';

const HistoryPage = () => {
  const [expandedUser, setExpandedUser] = useState(null);
  const [activeTab, setActiveTab] = useState({});

  const historyData = [
    {
      id: 1,
      name: 'John',
      date: '2025-09-17 14:23',
      transcript: 'The patient reports chest pain and fatigue over the past week.',
      prescription: 'Paracetamol 500mg twice daily. ECG advised.',
    },
    {
      id: 2,
      name: 'Jane',
      date: '2025-09-16 10:45',
      transcript: 'Reports anxiety and insomnia.',
      prescription: 'Prescribed Diazepam 5mg once daily.',
    },
  ];

  const toggleExpand = (userId) => {
    setExpandedUser((prev) => (prev === userId ? null : userId));
    setActiveTab((prev) => ({ ...prev, [userId]: 'transcript' }));
  };

  const handleTabChange = (userId, tab) => {
    setActiveTab((prev) => ({ ...prev, [userId]: tab }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        Interaction History
      </h1>

      <div className="space-y-6">
        {historyData.map((entry) => {
          const isExpanded = expandedUser === entry.id;
          const active = activeTab[entry.id] || 'transcript';

          return (
            <div
              key={entry.id}
              className="bg-white border border-gray-300 rounded-xl shadow-md transition-all duration-300"
            >
              {/* Header */}
              <button
                onClick={() => toggleExpand(entry.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-100 rounded-t-xl"
              >
                <span className="font-semibold text-xl text-blue-700">{entry.name}</span>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </button>

              {/* Expandable Section */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {isExpanded && (
                  <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
                    {/* Tabs */}
                    <div className="flex space-x-3 mb-4">
                      <button
                        onClick={() => handleTabChange(entry.id, 'transcript')}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          active === 'transcript'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Transcript
                      </button>
                      <button
                        onClick={() => handleTabChange(entry.id, 'prescription')}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          active === 'prescription'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Prescription
                      </button>
                    </div>

                    {/* Content */}
                    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-inner text-gray-800 text-sm whitespace-pre-wrap">
                      {active === 'transcript' ? entry.transcript : entry.prescription}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
