-- Migration: Create papers table
-- Created: 2026-01-07
-- Description: Initial schema for storing research paper metadata

CREATE TABLE IF NOT EXISTS papers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    source_url TEXT NOT NULL,
    filename TEXT NOT NULL UNIQUE,
    authors TEXT,
    publish_date TEXT,
    uploaded_at TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups by filename (duplicate checking)
CREATE INDEX IF NOT EXISTS idx_papers_filename ON papers(filename);

-- Index for sorting by upload date (listing papers)
CREATE INDEX IF NOT EXISTS idx_papers_uploaded_at ON papers(uploaded_at);
