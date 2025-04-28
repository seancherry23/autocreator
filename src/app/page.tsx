'use client';
import React, { useState } from "react";
import OutputTabs from '@/components/OutputTabs'

export default function Home() {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState('');
  const [edited, setEdited] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("✍️ writerAgent drafting your doc...");
    setDraft('');
    setEdited('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setDraft(data.draft);
      setEdited(data.edited);
      setStatus("✅ Done!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-pink-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">AutoCreator 🧠</h1>
      <p className="text-gray-500 mb-6 italic text-sm">
        AI-powered content agents at your service.
      </p>
      <div className="bg-white p-6 rounded shadow w-full max-w-md transition-all hover:shadow-lg">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your blog topic..."
            className="w-full p-3 mb-4 border border-gray-300 rounded text-gray-800 placeholder-gray-500 bg-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Generate
          </button>
        </form>
      </div>

      {status && (
        <p className="mt-4 text-sm text-gray-700">{status}</p>
      )}

      {draft && edited && (
        // <div className="mt-8 p-6 bg-white rounded shadow max-w-2xl text-gray-800">
        //   <h2 className="text-xl font-semibold mb-2">Generated Blog</h2>
        //   <p className="whitespace-pre-line text-gray-800">{result}</p>
        // </div>
        <OutputTabs draft={draft} edited={edited} />
      )}
    </main>
  );
}