# Database Migrations Guide

This document explains how to work with D1 database migrations for the AI Compendium application.

## Quick Start

### Apply Migrations to Production
```bash
npm run db:migrate
```

### Apply Migrations Locally
```bash
npm run db:migrate:local
```

### List Migration Status
```bash
# Production
npm run db:list

# Local
npm run db:list:local
```

## Database Configuration

- **Database Name**: `ai-compendium-db`
- **Database ID**: `ea272715-09f3-447b-96e1-9c98812c066a`
- **Binding Name**: `DB` (accessible in workers as `c.env.DB`)
- **Migrations Directory**: `migrations/`

## Migration Files

Migrations are stored in the `migrations/` directory with the following naming convention:
```
XXXX_description.sql
```

Where:
- `XXXX` is a 4-digit sequential number (e.g., 0001, 0002, 0003)
- `description` is a brief description of what the migration does

### Current Migrations

#### 0001_create_papers_table.sql
Creates the `papers` table with the following schema:

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | UUID for the paper |
| `title` | TEXT | NOT NULL | Paper title |
| `source_url` | TEXT | NOT NULL | Original source URL |
| `filename` | TEXT | NOT NULL, UNIQUE | PDF filename in R2 |
| `authors` | TEXT | NULLABLE | Paper authors |
| `publish_date` | TEXT | NULLABLE | Publication date |
| `uploaded_at` | TEXT | NOT NULL | ISO timestamp of upload |
| `file_size` | INTEGER | NOT NULL | File size in bytes |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**Indexes:**
- `idx_papers_filename` - For fast duplicate checking during upload
- `idx_papers_uploaded_at` - For sorting papers by upload date

## Creating New Migrations

1. **Create the migration file:**
   ```bash
   # Create a new file in the migrations directory
   touch migrations/0002_your_migration_name.sql
   ```

2. **Write your SQL:**
   ```sql
   -- Migration: Brief description
   -- Created: YYYY-MM-DD
   -- Description: Detailed explanation
   
   -- Your SQL statements here
   ALTER TABLE papers ADD COLUMN new_field TEXT;
   ```

3. **Test locally first:**
   ```bash
   npm run db:migrate:local
   ```

4. **Apply to production:**
   ```bash
   npm run db:migrate
   ```

## Best Practices

### DO:
- ✅ Create small, focused migrations that do one thing
- ✅ Test migrations locally before applying to production
- ✅ Include comments explaining what the migration does
- ✅ Use sequential numbering for migration files
- ✅ Create indexes for columns used in WHERE clauses

### DON'T:
- ❌ Modify existing migration files after they've been applied
- ❌ Delete migration files
- ❌ Skip migration numbers
- ❌ Make destructive changes without backups
- ❌ Forget to test rollback strategies for critical changes

## Direct Database Commands

### Execute SQL Query
```bash
# Remote
npx wrangler d1 execute ai-compendium-db --remote --command "SELECT * FROM papers LIMIT 5;"

# Local
npx wrangler d1 execute ai-compendium-db --local --command "SELECT * FROM papers LIMIT 5;"
```

### Execute SQL File
```bash
npx wrangler d1 execute ai-compendium-db --remote --file=path/to/query.sql
```

### View Table Schema
```bash
npx wrangler d1 execute ai-compendium-db --remote --command "PRAGMA table_info(papers);"
```

### List All Tables
```bash
npx wrangler d1 execute ai-compendium-db --remote --command "SELECT name FROM sqlite_master WHERE type='table';"
```

## Helper Scripts

### Using the Migration Script
A bash script is provided for convenient migration management:

```bash
# List remote migrations
./scripts/migrate.sh remote list

# Apply remote migrations
./scripts/migrate.sh remote apply

# List local migrations
./scripts/migrate.sh local list

# Apply local migrations
./scripts/migrate.sh local apply
```

## Troubleshooting

### Migration Failed
If a migration fails:
1. Check the error message carefully
2. The database will automatically rollback to its previous state
3. Fix the migration file
4. Try applying again

### Reset Local Database
If you need to reset your local development database:
```bash
# Delete local database
rm -rf .wrangler/state/v3/d1

# Reapply all migrations
npm run db:migrate:local
```

### View Migration History
```bash
npx wrangler d1 execute ai-compendium-db --remote --command "SELECT * FROM d1_migrations ORDER BY id;"
```

## Production Workflow

1. **Development:**
   - Create migration file
   - Test locally: `npm run db:migrate:local`
   - Verify changes work with your code

2. **Staging/Testing:**
   - Commit migration file to git
   - Deploy to staging environment
   - Run tests

3. **Production:**
   - Apply migration: `npm run db:migrate`
   - Deploy code changes
   - Monitor for issues

## Resources

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [D1 Migrations Guide](https://developers.cloudflare.com/d1/learning/migrations/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
