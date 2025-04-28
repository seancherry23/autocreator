'use client';
import React, { useState } from "react";

type OutputTabsProps = {
  draft: string;
  edited: string;
};

export default function OutputTabs({ draft, edited }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState<'draft' | 'edited'>('draft');
  const [isFading, setIsFading] = useState(false);

  const handleTabChange = (tab: 'draft' | 'edited') => {
    if (tab === activeTab) return; // no change
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsFading(false);
    }, 300); 
  };

  return (
    <div className="mt-8 p-6 bg-white rounded shadow max-w-2xl text-gray-800">
      {/* Tabs */}
      <div className="relative flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg flex relative overflow-hidden">
          <button
            onClick={() => handleTabChange('draft')}
            className={`px-4 py-2 rounded-md font-semibold transition-transform duration-300 ease-in-out cursor-pointer ${
              activeTab === 'draft'
                ? 'text-blue-700 bg-blue-100 shadow-md scale-105'
                : 'text-gray-500 hover:text-blue-500 hover:scale-105'
            }`}
          >
            Writer Output
          </button>
          <button
            onClick={() => handleTabChange('edited')}
            className={`px-4 py-2 rounded-md font-semibold transition-transform duration-300 ease-in-out cursor-pointer ${
              activeTab === 'edited'
                ? 'text-blue-700 bg-blue-100 shadow-md scale-105'
                : 'text-gray-500 hover:text-blue-500 hover:scale-105'
            }`}
          >
            Editor Output
          </button>

          {/* Moving underline */}
          <div
            className="absolute bottom-0 left-0 h-1.5 bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: '50%',
              transform: activeTab === 'draft' ? 'translateX(0%)' : 'translateX(100%)',
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-center">Generated Blog Versions</h2>

      {/* Blog content with smooth fade */}
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <pre className="whitespace-pre-line text-gray-800">
          {activeTab === 'draft' ? draft : edited}
        </pre>
      </div>
    </div>
  );
}