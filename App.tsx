import React, { useState, useCallback } from 'react';
import { generateStory } from './services/geminiService';
import SparklesIcon from './components/icons/SparklesIcon';

// --- Reusable UI Components (defined outside the main App component) ---

const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

interface StoryDisplayProps {
  story: string;
  isLoading: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading }) => {
  if (isLoading && !story) {
    return (
      <div className="w-full bg-slate-800/50 rounded-lg p-6 mt-8 flex justify-center items-center h-64 animate-pulse">
        <p className="text-slate-400">Generating your story...</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="w-full bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-6 mt-8 flex justify-center items-center h-64">
        <p className="text-slate-500 text-center">Your generated story will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-800/50 rounded-lg p-6 mt-8 prose prose-invert prose-p:text-slate-300">
      <p className="whitespace-pre-wrap">{story}</p>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateStory = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setStory(''); // Clear previous story

    try {
      const generatedStory = await generateStory(prompt);
      setStory(generatedStory);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)',
        }}
      ></div>
      
      <main className="w-full max-w-3xl mx-auto z-10 flex flex-col flex-grow">
        <header className="text-center my-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Gemini Story Generator
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Turn your ideas into captivating short stories with the power of AI.
          </p>
        </header>

        <div className="w-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-2xl shadow-indigo-900/20">
          <div className="flex flex-col">
            <label htmlFor="prompt" className="mb-2 font-medium text-slate-300">
              Enter your story prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A detective who solves crimes by talking to cats..."
              className="w-full h-28 p-3 bg-slate-900/70 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="mt-4">
            <button
              onClick={handleGenerateStory}
              disabled={isLoading || !prompt.trim()}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform duration-200"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Generate Story
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        
        <div className="flex-grow">
            <StoryDisplay story={story} isLoading={isLoading} />
        </div>

        <footer className="text-center py-8 mt-auto text-slate-500 text-sm">
            <p>Powered by Google Gemini. Built with React & Tailwind CSS.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
