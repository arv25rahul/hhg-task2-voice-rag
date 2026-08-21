import { env } from "@/lib/env";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    if (!env.MONGODB_URI) {
      // Return demo data for testing without MongoDB
      const demoChunks = [
        {
          id: "demo_1",
          passage_id: "hhg_demo_001",
          title: "Hacker House Goa - Voice RAG Overview",
          text: "Voice-enabled Retrieval-Augmented Generation (RAG) systems combine speech-to-text technology with vector databases to provide natural language interfaces for information retrieval. At Hacker House Goa, we build tropical tech with terminal speed.",
          category: "voice_ai",
          language: "en",
          source: "Demo Data - HHG Voice RAG",
          indexed_at: new Date().toISOString(),
          embedding_dim: 1536,
        },
        {
          id: "demo_2",
          passage_id: "hhg_demo_002",
          title: "MongoDB Atlas Vector Search Integration",
          text: "MongoDB Atlas provides native vector search capabilities using HNSW indexing. This enables fast similarity search across high-dimensional embeddings with sub-20ms latency for production workloads.",
          category: "database",
          language: "en",
          source: "Demo Data - HHG Voice RAG",
          indexed_at: new Date().toISOString(),
          embedding_dim: 1536,
        },
        {
          id: "demo_3",
          passage_id: "hhg_demo_003",
          title: "Matrix Rain Animation with Canvas",
          text: "The iconic falling code effect can be implemented using HTML5 Canvas with requestAnimationFrame for smooth 60fps animations. Each column drops characters with varying speeds and glows near the cursor.",
          category: "frontend",
          language: "en",
          source: "Demo Data - HHG Voice RAG",
          indexed_at: new Date().toISOString(),
          embedding_dim: 1536,
        },
        {
          id: "demo_4",
          passage_id: "hhg_demo_004",
          title: "OpenRouter LLM Streaming",
          text: "OpenRouter provides unified access to multiple LLM providers with streaming support. Server-Sent Events (SSE) enable real-time token streaming for responsive user experiences.",
          category: "ai_models",
          language: "en",
          source: "Demo Data - HHG Voice RAG",
          indexed_at: new Date().toISOString(),
          embedding_dim: 1536,
        },
        {
          id: "demo_5",
          passage_id: "hhg_demo_005",
          title: "Tailwind CSS v4 Configuration",
          text: "Tailwind CSS v4 introduces config-less setup with CSS-first configuration. Custom properties defined in globals.css enable dynamic theming without JavaScript.",
          category: "styling",
          language: "en",
          source: "Demo Data - HHG Voice RAG",
          indexed_at: new Date().toISOString(),
          embedding_dim: 1536,
        },
        {
          id: "demo_6",
          passage_id: "hhg_demo_006",
          title: "Next.js 16 App Router Features",
          text: "Next.js 16 brings enhanced server components, improved streaming, and Turbopack for faster development. The App Router provides file-system based routing with layouts and loading states.",
          category: "framework",
          language: "en",
          source: "Demo Data - HHG Voice RAG",
          indexed_at: new Date().toISOString(),
          embedding_dim: 1536,
        },
      ];

      // Filter demo data based on search and category
      let filteredChunks = demoChunks;
      
      if (category && category !== "all") {
        filteredChunks = filteredChunks.filter(chunk => chunk.category === category);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredChunks = filteredChunks.filter(chunk =>
          chunk.title.toLowerCase().includes(searchLower) ||
          chunk.text.toLowerCase().includes(searchLower) ||
          chunk.passage_id.toLowerCase().includes(searchLower)
        );
      }

      const categories = ["all", "voice_ai", "database", "frontend", "ai_models", "styling", "framework"];

      return NextResponse.json({
        success: true,
        totalCount: demoChunks.length,
        matchingCount: filteredChunks.length,
        categories,
        chunks: filteredChunks,
        isDemoData: true,
        message: "Using demo data. Add MongoDB URI to .env.local for live database access."
      });
    }

    const client = new MongoClient(env.MONGODB_URI);
    await client.connect();

    const db = client.db(process.env.MONGODB_DATABASE || "ai_demo");
    const collection = db.collection(process.env.MONGODB_COLLECTION || "chunks");

    // Build filter query
    const filter: any = {};
    if (category && category !== "all") {
      filter["metadata.category"] = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
        { passage_id: { $regex: search, $options: "i" } },
      ];
    }

    const totalCount = await collection.countDocuments({});
    const matchingCount = await collection.countDocuments(filter);

    // Fetch documents (projecting out large raw embedding arrays for UI efficiency)
    const docs = await collection
      .find(filter, {
        projection: {
          _id: 1,
          passage_id: 1,
          title: 1,
          text: 1,
          metadata: 1,
          indexed_at: 1,
          embedding_dim: { $size: { $ifNull: ["$embedding", []] } },
        },
      })
      .sort({ indexed_at: -1 })
      .limit(50)
      .toArray();

    // Fetch distinct categories for filters
    const categories = await collection.distinct("metadata.category");

    await client.close();

    return NextResponse.json({
      success: true,
      totalCount,
      matchingCount,
      categories: ["all", ...categories.filter(Boolean)],
      chunks: docs.map((doc) => ({
        id: doc._id.toString(),
        passage_id: doc.passage_id || `chunk_${doc._id.toString().slice(-4)}`,
        title: doc.title || "Indexed Document Chunk",
        text: doc.text || "",
        category: doc.metadata?.category || "general",
        language: doc.metadata?.language || "en",
        source: doc.metadata?.source || "ai4bharat/MSMARCO-XI",
        indexed_at: doc.indexed_at || new Date().toISOString(),
        embedding_dim: doc.embedding_dim || 1536,
      })),
      isDemoData: false,
    });
  } catch (error: any) {
    console.error("Error fetching chunks:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to fetch vector chunks from MongoDB",
        success: false,
        totalCount: 0,
        matchingCount: 0,
        categories: ["all"],
        chunks: [],
        message: "Could not connect to MongoDB Atlas. Please check your connection string in .env.local"
      },
      { status: 200 }
    );
  }
}
