export interface KnowledgeBaseItem {
  id: string;
  title: string;
  category: string;
  content: string;
  metadata?: Record<string, any>;
  embedding: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SimilarDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  similarity: number;
}

export interface RAGResponse {
  question: string;
  answer: string;
  responseTime: string;
  sources: SimilarDocument[];
}
