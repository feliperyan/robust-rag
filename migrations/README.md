# D1 Database Migrations

This directory contains database migrations for the AI Compendium application.

## Database Information

- **Database Name**: ai-compendium-db
- **Database ID**: ea272715-09f3-447b-96e1-9c98812c066a
- **Binding**: DB

## Migrations

### 0001_create_papers_table.sql
Creates the initial `papers` table with the following schema:
- `id` (TEXT, PRIMARY KEY): UUID for the paper
- `title` (TEXT, NOT NULL): Paper title
- `source_url` (TEXT, NOT NULL): Original source URL
- `filename` (TEXT, NOT NULL, UNIQUE): PDF filename stored in R2
- `authors` (TEXT, NULLABLE): Paper authors
- `publish_date` (TEXT, NULLABLE): Publication date
- `uploaded_at` (TEXT, NOT NULL): ISO timestamp of upload
- `file_size` (INTEGER, NOT NULL): File size in bytes
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP): Record creation time

**Indexes:**
- `idx_papers_filename`: For fast duplicate checking
- `idx_papers_uploaded_at`: For sorting papers by upload date

## Running Migrations

### Local Development
```bash
# Apply migrations to local development database
npx wrangler d1 migrations apply ai-compendium-db --local
```

### Production
```bash
# Apply migrations to production database
npx wrangler d1 migrations apply ai-compendium-db --remote
```

### List Applied Migrations
```bash
# Local
npx wrangler d1 migrations list ai-compendium-db --local

# Remote
npx wrangler d1 migrations list ai-compendium-db --remote
```

## Creating New Migrations

1. Create a new SQL file in this directory with the naming pattern:
   ```
   XXXX_description.sql
   ```
   Where XXXX is the next sequential number (e.g., 0002, 0003, etc.)

2. Write your migration SQL in the file

3. Apply the migration using the commands above

## Notes

- Migrations are applied in numerical order
- Once applied to production, migrations should NOT be modified
- Always test migrations locally before applying to production
- Keep migrations small and focused on a single change
