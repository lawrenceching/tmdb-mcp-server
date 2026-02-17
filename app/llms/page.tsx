export const metadata = {
  title: 'TMDB MCP Server - AI Agent Documentation',
  description: 'Documentation index for AI agents to interact with TMDB data',
};

const markdownContent = `
# TMDB MCP Server - AI Agent Documentation

This project provides multiple API interfaces for AI agents to interact with The Movie Database (TMDB).

---

## Available APIs

### 1. GraphQL API
**Endpoint:** \`/api/graphql\`

A flexible query interface using GraphQL schema. Ideal for:
- Precise data fetching (select only needed fields)
- Single requests for related data (movies + credits + videos)
- Type-safe responses

**[View GraphQL Documentation →](/llms/graphql)**

---

### 2. REST API (TMDB v3)
**Endpoint:** \`/api/3\`

Direct proxy to TMDB's REST API v3. Ideal for:
- Direct access to TMDB endpoints
- Advanced filtering and sorting
- Batch operations

**[View REST API Documentation →](/llms/tmdb)**

---

### 3. MCP Server
**Endpoint:** \`/api/mcp\`

Model Context Protocol server with standardized tool definitions.

*(Documentation coming soon)*

---

## Quick Reference

| API | Best For | Endpoint |
|-----|----------|----------|
| GraphQL | Complex queries, nested data | \`/api/graphql\` |
| REST | Direct TMDB access | \`/api/3\` |
| MCP | AI agent tool integration | \`/api/mcp\` |

---

## Getting Started

Choose your preferred API:

- **For GraphQL queries:** See [GraphQL Documentation](/llms/graphql)
- **For REST endpoints:** See [REST API Documentation](/llls/tmdb)
- **For MCP tools:** See [MCP Documentation](/llms/mcp)

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`TMDB_ACCESS_TOKEN\` | TMDB API access token (required) |
| \`NEXT_PUBLIC_GRAPHQL_URL\` | GraphQL URL for MCP configuration |

---

## Image Base URL

All APIs return relative image paths. Use this base URL:

\`\`\`
https://image.tmdb.org/t/p/<size>/<file_path>
\`\`\`

**Common sizes:**
- Posters: \`w185\`, \`w342\`, \`w500\`
- Backdrops: \`w780\`, \`w1280\`
`;

export default function LLMsIndexPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <article className="prose prose-slate max-w-4xl mx-auto dark:prose-invert">
        <pre className="whitespace-pre-wrap font-sans text-sm">{markdownContent}</pre>
      </article>
    </main>
  );
}
