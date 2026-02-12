# TMDB MCP Server

A free TMDB MCP Server served
Host: https://tmdb-mcp-server.imlc.me/api/mcp
Protocol: StreamableHTTP

## Install in Claude Code

### Project Scope (Recommended for Teams)

Project-scoped servers enable team collaboration by storing configurations in a `.mcp.json` file at your project's root directory. See [Claude Code MCP Project Scope documentation](https://code.claude.com/docs/en/mcp#project-scope) for more details.

```bash
claude mcp add tmdb --transport http --scope project https://tmdb-mcp-server.imlc.me/api/mcp
```

This creates a `.mcp.json` file in your project root that can be checked into version control, ensuring all team members have access to the same MCP tools and services.