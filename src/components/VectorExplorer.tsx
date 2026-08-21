"use client";

import {
  ChevronDown,
  ChevronUp,
  Database,
  Layers,
  RefreshCw,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ChunkItem {
  id: string;
  passage_id: string;
  title: string;
  text: string;
  category: string;
  language: string;
  source: string;
  indexed_at: string;
  embedding_dim: number;
}

export function VectorExplorer() {
  const [chunks, setChunks] = useState<ChunkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDemoData, setIsDemoData] = useState(false);

  const fetchChunks = async (searchQuery = search, cat = selectedCategory) => {
    setIsRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (cat && cat !== "all") params.set("category", cat);

      const res = await fetch(`/api/chunks?${params.toString()}`);
      const data = await res.json();
      
      // Handle both success and error responses gracefully
      if (data.success === false || data.error) {
        setError(data.error || data.message || "Could not connect to MongoDB Atlas");
        setChunks([]);
        setTotalCount(0);
        setCategories(["all"]);
        setIsDemoData(false);
      } else {
        setChunks(data.chunks || []);
        setTotalCount(data.totalCount || 0);
        if (data.categories) setCategories(data.categories);
        setIsDemoData(data.isDemoData || false);
        setError(null);
      }
    } catch (err: any) {
      console.error(err);
      setError("Could not connect to MongoDB Atlas. Please check your configuration.");
      setChunks([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChunks("", "all");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchChunks(search, selectedCategory);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    fetchChunks(search, cat);
  };

  return (
    <div className="w-full space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-[#00ffaa] bg-[#00ffaa]/10 border border-[#00ffaa]/20 rounded-full">
              <Database className="w-3.5 h-3.5" /> Live Vector Database
            </span>
            {isDemoData ? (
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-pulse" />
                Demo Data (Add MongoDB for Live)
              </span>
            ) : (
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#00ffaa]/10 text-[#00ffaa] border border-[#00ffaa]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] animate-pulse" />
                {totalCount} Real Chunks in MongoDB
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2 font-sans">
            Vector Chunks Explorer{" "}
            <span className="text-xs font-mono font-normal text-[#94a89c]">
              ai_demo.chunks
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchChunks()}
            disabled={isRefreshing}
            className="px-3 py-1.5 rounded-lg border border-[#00ffaa]/20 bg-[#141a1c] hover:border-[#00ffaa]/40 hover:bg-[#00ffaa]/5 text-xs font-mono text-[#94a89c] hover:text-[#e0ffef] flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer hover:shadow-[0_0_10px_rgba(0,255,170,0.2)]"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#00ffaa]" : ""}`}
            />
            <span>Refresh</span>
          </button>
          <span className="text-xs font-mono text-[#576660] hidden sm:inline">
            Dataset: ai4bharat/MSMARCO-XI
          </span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#94a89c] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chunks by title, text, or passage ID..."
            className="w-full bg-[#141a1c]/90 border border-[#00ffaa]/20 focus:border-[#00ffaa] rounded-xl pl-9 pr-20 py-2 text-xs font-mono text-[#e0ffef] placeholder:text-[#576660] outline-none transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                fetchChunks("", selectedCategory);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#94a89c] hover:text-[#e0ffef]"
            >
              Clear
            </button>
          )}
        </form>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 font-mono text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#00ffaa]/15 border border-[#00ffaa]/40 text-[#00ffaa] font-bold shadow-[0_0_10px_rgba(0,255,170,0.2)]"
                  : "bg-[#141a1c] border border-[#00ffaa]/20 text-[#94a89c] hover:text-[#e0ffef] hover:border-[#00ffaa]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-5 rounded-xl bg-[#141a1c]/90 border border-[#00ffaa]/20 space-y-3 animate-pulse"
            >
              <div className="h-4 bg-[#00ffaa]/10 rounded w-1/3" />
              <div className="h-5 bg-[#00ffaa]/10 rounded w-3/4" />
              <div className="h-12 bg-[#0a0e0f] rounded w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Error Notice */}
      {!loading && error && (
        <div className="p-6 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35] font-mono text-sm space-y-3">
          <div className="font-bold flex items-center gap-2 text-base">
            <span>⚠️ Configuration Required</span>
          </div>
          <p className="text-[#e0ffef] leading-relaxed">
            {error.includes("not configured") 
              ? "MongoDB Atlas connection is not configured. To enable the Vector Database Explorer, please add your MongoDB connection string to the .env.local file."
              : error}
          </p>
          {error.includes("not configured") && (
            <div className="mt-4 p-4 bg-[#141a1c] rounded-lg border border-[#00ffaa]/20 text-xs">
              <p className="text-[#00ffaa] font-bold mb-2">Quick Setup:</p>
              <ol className="space-y-1 text-[#94a89c] list-decimal list-inside">
                <li>Create a MongoDB Atlas account at <a href="https://www.mongodb.com/cloud/atlas" target="_blank" className="text-[#00d9ff] underline">mongodb.com</a></li>
                <li>Create a cluster and get your connection string</li>
                <li>Add the connection string to <code className="text-[#00ffaa]">.env.local</code>: <code className="text-[#e0ffef]">MONGODB_URI="mongodb+srv://..."</code></li>
                <li>Restart the development server</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Chunk Cards Grid */}
      {!loading && !error && (
        <>
          {chunks.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[#141a1c]/80 border border-[#00ffaa]/20 text-[#94a89c] font-mono text-xs space-y-2">
              <p>No matching chunks found for query "{search}".</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  fetchChunks("", "all");
                }}
                className="text-[#00ffaa] underline cursor-pointer hover:text-[#00d9ff]"
              >
                Reset search & filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chunks.map((chunk) => {
                const isExpanded = expandedId === chunk.id;
                return (
                  <div
                    key={chunk.id}
                    className="p-5 rounded-xl bg-[#141a1c]/90 backdrop-blur-md border border-[#00ffaa]/20 hover:border-[#00ffaa]/40 hover:shadow-[0_0_15px_rgba(0,255,170,0.15)] transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2.5">
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#00ffaa] font-bold tracking-wide">
                          {chunk.passage_id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#0a0e0f] border border-[#00ffaa]/20 text-[#94a89c] capitalize">
                            {chunk.category}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00d9ff]/10 text-[#00d9ff] font-bold border border-[#00d9ff]/20 uppercase">
                            {chunk.language}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-[#e0ffef] text-sm group-hover:text-[#00ffaa] transition-colors leading-snug">
                        {chunk.title}
                      </h4>

                      {/* Text Excerpt / Full Text */}
                      <p
                        className={`text-xs text-[#94a89c] leading-relaxed font-mono ${
                          isExpanded ? "" : "line-clamp-3"
                        }`}
                      >
                        "{chunk.text}"
                      </p>
                    </div>

                    {/* Footer Details */}
                    <div className="pt-2 border-t border-[#00ffaa]/10 flex items-center justify-between font-mono text-[11px] text-[#94a89c]">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#00d9ff]" />
                        {chunk.embedding_dim}d vector
                      </span>

                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : chunk.id)
                        }
                        className="text-[#94a89c] hover:text-[#e0ffef] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Collapse" : "Full Text"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
