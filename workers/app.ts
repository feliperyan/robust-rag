import { Hono } from "hono";
import { createRequestHandler } from "react-router";

const app = new Hono<{ Bindings: Env }>();

// API Routes

// Upload file to R2 and store metadata in D1
app.post("/api/upload", async (c) => {
	try {
		const formData = await c.req.formData();
		const file = formData.get("file") as File;
		const title = formData.get("title") as string;
		const sourceUrl = formData.get("sourceUrl") as string;
		const authors = formData.get("authors") as string;
		const publishDate = formData.get("publishDate") as string;

		// Validate required fields
		if (!file) {
			return c.json({ error: "No file provided" }, 400);
		}
		if (!title || !sourceUrl) {
			return c.json({ error: "Title and source URL are required" }, 400);
		}

		// Validate file type
		if (file.type !== "application/pdf") {
			return c.json({ error: "Only PDF files are allowed" }, 400);
		}

		// Validate file size (50MB max)
		const maxSize = 50 * 1024 * 1024; // 50MB in bytes
		if (file.size > maxSize) {
			return c.json({ error: "File size must be less than 50MB" }, 400);
		}

		// Check for duplicate filename in R2
		const existingFile = await c.env.RAG_BUCKET.head(file.name);
		if (existingFile) {
			return c.json({ error: "A file with this name already exists" }, 409);
		}

		// Upload to R2
		const arrayBuffer = await file.arrayBuffer();
		await c.env.RAG_BUCKET.put(file.name, arrayBuffer, {
			httpMetadata: {
				contentType: file.type,
			},
		});

		// Store metadata in D1
		const id = crypto.randomUUID();
		const uploadedAt = new Date().toISOString();
		
		await c.env.DB.prepare(
			`INSERT INTO papers (id, title, source_url, filename, authors, publish_date, uploaded_at, file_size)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
		).bind(id, title, sourceUrl, file.name, authors || null, publishDate || null, uploadedAt, file.size).run();

		return c.json({
			success: true,
			id,
			filename: file.name,
			size: file.size,
			uploadedAt,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return c.json({ error: "Upload failed" }, 500);
	}
});

// Get file from R2
app.get("/api/files/:filename", async (c) => {
	try {
		const filename = c.req.param("filename");
		
		const object = await c.env.RAG_BUCKET.get(filename);
		
		if (!object) {
			return c.json({ error: "File not found" }, 404);
		}

		const headers = new Headers();
		object.writeHttpMetadata(headers);
		headers.set("etag", object.httpEtag);

		return new Response(object.body, {
			headers,
		});
	} catch (error) {
		console.error("File retrieval error:", error);
		return c.json({ error: "Failed to retrieve file" }, 500);
	}
});

// List all papers from D1
app.get("/api/papers", async (c) => {
	try {
		const result = await c.env.DB.prepare(
			`SELECT id, title, source_url, filename, authors, publish_date, uploaded_at, file_size
			 FROM papers
			 ORDER BY uploaded_at DESC`
		).all();

		return c.json({
			papers: result.results,
			count: result.results?.length || 0,
		});
	} catch (error) {
		console.error("Papers list error:", error);
		return c.json({ error: "Failed to retrieve papers" }, 500);
	}
});

// AI Search endpoint
app.post("/api/ai-search", async (c) => {
	try {
		const body = await c.req.json();
		const { query } = body;

		if (!query || typeof query !== "string") {
			return c.json({ error: "Query is required" }, 400);
		}

		const answer = await c.env.AI.autorag("ai-compendium").aiSearch({
			query,
			rewrite_query: true,
			max_num_results: 10,
			ranking_options: {
				score_threshold: 0.3
			},
			reranking: {
				enabled: true,
				model: "@cf/baai/bge-reranker-base"
			},
			stream: false,
		});

		// Extract unique filenames from AI response
		const filenames = [...new Set(answer.data.map(item => item.filename))];

		// Query D1 for paper metadata if we have filenames
		let papers: any[] = [];
		if (filenames.length > 0) {
			const placeholders = filenames.map(() => "?").join(",");
			const result = await c.env.DB.prepare(
				`SELECT id, title, source_url as sourceUrl, filename, authors, publish_date as publishDate, uploaded_at as uploadedAt, file_size as fileSize
				 FROM papers 
				 WHERE filename IN (${placeholders})`
			).bind(...filenames).all();

			papers = result.results || [];
		}

		// Return enriched response with papers
		return c.json({
			...answer,
			papers,
		});
	} catch (error) {
		console.error("AI Search error:", error);
		return c.json({ 
			error: "AI Search failed", 
			details: error instanceof Error ? error.message : "Unknown error" 
		}, 500);
	}
});

// React Router handler (must be last)
app.get("*", (c) => {
	const requestHandler = createRequestHandler(
		() => import("virtual:react-router/server-build"),
		import.meta.env.MODE,
	);

	return requestHandler(c.req.raw, {
		cloudflare: { env: c.env, ctx: c.executionCtx },
	});
});

export default app;
