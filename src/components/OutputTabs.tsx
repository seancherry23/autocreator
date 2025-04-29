'use client';
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';

type OutputTabsProps = {
  draft: string;
  edited: string;
  seo: string
};

export default function OutputTabs({ draft, edited, seo }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState<'draft' | 'edited'>('draft');
  const [isFading, setIsFading] = useState(false);

  const handleTabChange = (tab: 'draft' | 'edited' | 'seo') => {
    if (tab === activeTab) return; // no change
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsFading(false);
    }, 300); 
  };

  const markdownComponents = {
    h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-6 mb-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-base font-semibold mt-4 mb-1" {...props} />,
    p: ({ node, ...props }) => <p className="mb-3" {...props} />,
    li: ({ node, ...props }) => <li className="list-disc ml-6 mb-1" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
  };

  return (
    <div className="mt-8 p-6 bg-white rounded shadow max-w-2xl text-gray-800">
      {/* Tabs */}
      <div className="relative flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg flex relative overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          <button
            onClick={() => handleTabChange('draft')}
            className={`snap-start px-4 py-2 rounded-md font-semibold transition-transform duration-300 ease-in-out cursor-pointer ${
              activeTab === 'draft'
                ? 'text-blue-700 bg-blue-100 shadow-md scale-105'
                : 'text-gray-500 hover:text-blue-500 hover:scale-105'
            }`}
          >
            Writer Output
          </button>

          <button
            onClick={() => handleTabChange('edited')}
            className={`snap-start px-4 py-2 rounded-md font-semibold transition-transform duration-300 ease-in-out cursor-pointer ${
              activeTab === 'edited'
                ? 'text-blue-700 bg-blue-100 shadow-md scale-105'
                : 'text-gray-500 hover:text-blue-500 hover:scale-105'
            }`}
          >
            Editor Output
          </button>

          <button
            onClick={() => handleTabChange('seo')}
            className={`snap-start px-4 py-2 rounded-md font-semibold transition-transform duration-300 ease-in-out cursor-pointer ${
              activeTab === 'seo'
                ? 'text-blue-700 bg-blue-100 shadow-md scale-105'
                : 'text-gray-500 hover:text-blue-500 hover:scale-105'
            }`}
          >
            SEO Output
          </button>

          {/* Moving underline */}
          <div
            className="absolute bottom-0 left-0 h-1.5 bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: '33%',
              transform: activeTab === 'draft' ? 'translateX(0%)' : activeTab === 'edited' ? 'translateX(100%)' : 'translateX(200%)',
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-center">Generated Blog Versions</h2>

      {/* Blog content with smooth fade */}
      <div className={`transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="prose prose-blue max-w-none text-gray-800">
            <ReactMarkdown components={markdownComponents}>
              {activeTab === 'draft' ? draft : activeTab === 'edited' ? edited : seo}
            </ReactMarkdown>
          </div>
      </div>
    </div>
  );
}