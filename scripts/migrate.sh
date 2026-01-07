#!/bin/bash

# D1 Migration Helper Script
# Usage: ./scripts/migrate.sh [local|remote] [apply|list]

set -e

DB_NAME="ai-compendium-db"

# Default to remote if no argument provided
LOCATION="${1:-remote}"
ACTION="${2:-list}"

if [ "$LOCATION" != "local" ] && [ "$LOCATION" != "remote" ]; then
    echo "Error: First argument must be 'local' or 'remote'"
    echo "Usage: $0 [local|remote] [apply|list]"
    exit 1
fi

if [ "$ACTION" != "apply" ] && [ "$ACTION" != "list" ]; then
    echo "Error: Second argument must be 'apply' or 'list'"
    echo "Usage: $0 [local|remote] [apply|list]"
    exit 1
fi

FLAG=""
if [ "$LOCATION" == "remote" ]; then
    FLAG="--remote"
elif [ "$LOCATION" == "local" ]; then
    FLAG="--local"
fi

echo "🗄️  D1 Migrations for $DB_NAME ($LOCATION)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$ACTION" == "list" ]; then
    echo "📋 Listing migrations..."
    npx wrangler d1 migrations list "$DB_NAME" $FLAG
elif [ "$ACTION" == "apply" ]; then
    echo "⚡ Applying migrations..."
    npx wrangler d1 migrations apply "$DB_NAME" $FLAG
fi
