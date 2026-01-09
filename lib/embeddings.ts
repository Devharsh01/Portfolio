/* eslint-disable */
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { characterContent } from "@/constants/character";

// ---------- Embeddings ----------
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY!,
  modelName: "text-embedding-004",
});

// ---------- Types ----------
type EmbeddedDoc = {
  content: string;
  embedding: number[];
};

// ---------- In-memory store ----------
let vectorStore: EmbeddedDoc[] | null = null;

// ---------- Helpers ----------
function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function splitTextIntoChunks(text: string, chunkSize = 500): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];

  let current = "";
  for (const sentence of sentences) {
    if ((current + sentence).length <= chunkSize) {
      current += (current ? " " : "") + sentence;
    } else {
      if (current) chunks.push(current);
      current = sentence;
    }
  }
  if (current) chunks.push(current);

  return chunks;
}

// ---------- Initialization (runs once) ----------
async function initializeStore() {
  if (vectorStore) return;

  console.log("Initializing in-memory semantic store...");

  const chunks = splitTextIntoChunks(characterContent, 500);
  const embeddingsArray = await embeddings.embedDocuments(chunks);

  vectorStore = chunks.map((chunk, i) => ({
    content: chunk,
    embedding: embeddingsArray[i],
  }));

  console.log(`In-memory semantic store ready (${vectorStore.length} chunks)`);
}

// ---------- Query function (DROP-IN REPLACEMENT) ----------
export async function queryVectorStore(query: string, k = 3): Promise<Document[]> {
  await initializeStore();

  if (!vectorStore || vectorStore.length === 0) return [];

  const queryEmbedding = await embeddings.embedQuery(query);

  const scored = vectorStore
    .map((doc) => ({
      content: doc.content,
      score: cosineSimilarity(queryEmbedding, doc.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return scored.map(
    (item, i) =>
      new Document({
        pageContent: item.content,
        metadata: { source: "in-memory", rank: i },
      })
  );
}
