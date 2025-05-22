import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateResponse } from "../features/openai/openaiSlice";
import { X, MessageSquareText, Sparkles, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ClipLoader } from "react-spinners";

const LOCAL_STORAGE_KEY = "openai_prompt_history";

function OpenAIPrompt() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const dispatch = useDispatch();
  const { response, loading } = useSelector((state) => state.openai);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setHistory(JSON.parse(saved));
    }
    setHistoryLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      dispatch(generateResponse(prompt)).then((action) => {
        if (action.payload) {
          const newEntry = { prompt, response: action.payload };
          setHistory((prev) => [newEntry, ...prev]);
          setPrompt("");
        }
      });
    }
  };

  const handleClear = () => {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Prompt Playground
      </h1>

      <form onSubmit={handleSubmit} className="relative mb-4">
        <input
          className="p-3 border border-gray-300 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask me anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        {prompt && !loading && (
          <X
            size={20}
            className="absolute top-[25%] right-3 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
            onClick={() => setPrompt("")}
          />
        )}
        <div className="flex gap-3 mt-4 items-center">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading && <ClipLoader size={18} color="#fff" />}
            {loading ? "Generating..." : "Generate"}
          </button>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              disabled={loading}
            >
              Clear All
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4 mt-6">
        {historyLoading ? (
          <div className="flex justify-center items-center min-h-[150px]">
            <ClipLoader size={30} color="#3B82F6" />
          </div>
        ) : (
          history.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded p-4 border border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <MessageSquareText size={18} />
                <span>Prompt:</span>
              </div>
              <p className="mb-3 text-gray-900">{item.prompt}</p>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <Sparkles size={18} />
                  <span>Response:</span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.response, idx)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  title="Copy Response"
                  type="button"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={16} className="text-blue-800" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="text-gray-800 whitespace-pre-line prose prose-sm max-w-none">
                <ReactMarkdown>{item.response}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OpenAIPrompt;