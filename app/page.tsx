import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
              TM
            </div>
            <div>
              <h1 className="text-xl font-bold">TMDB MCP Server</h1>
              <p className="text-sm text-muted-foreground">Model Context Protocol Server</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-green-500"></span>
            Streamable HTTP Endpoint
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Access TMDB Data via
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}MCP
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            A powerful Model Context Protocol server that provides AI agents with seamless access to
            The Movie Database (TMDB) API for movies, TV shows, and trending content.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="min-w-[160px]">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="min-w-[160px]">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* MCP Endpoint Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">MCP Endpoint</h3>
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted p-4">
              <code className="flex-1 font-mono text-sm">http://localhost:3000/api/mcp</code>
              <Button size="sm" variant="secondary">
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This is a streamable HTTP endpoint that follows the Model Context Protocol specification.
              Configure your AI agent or IDE to connect to this endpoint to enable TMDB tools.
            </p>
          </div>
        </div>
      </section>

      {/* Available Tools Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-3xl font-bold">Available Tools</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "searchMovies",
                description: "Search for movies by title with language support",
                params: ["query", "language"],
              },
              {
                name: "getMovieDetails",
                description: "Get detailed information about a specific movie",
                params: ["movieId", "language"],
              },
              {
                name: "getTrending",
                description: "Get trending movies, TV shows, or people",
                params: ["mediaType", "timeWindow"],
              },
              {
                name: "discoverMovies",
                description: "Discover movies by various filters",
                params: ["genre", "year", "language", "sortBy"],
              },
              {
                name: "searchTVShows",
                description: "Search for TV shows by title with language support",
                params: ["query", "language"],
              },
              {
                name: "getTVShowDetails",
                description: "Get detailed information about a specific TV show",
                params: ["seriesId", "language"],
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h4 className="mb-2 font-mono text-sm font-semibold text-primary">
                  {tool.name}
                </h4>
                <p className="mb-3 text-sm text-muted-foreground">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.params.map((param) => (
                    <span
                      key={param}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {param}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-12 text-center text-3xl font-bold">Installation Instructions</h3>

          {/* Claude Desktop */}
          <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold">
                C
              </div>
              <div>
                <h4 className="text-lg font-semibold">Claude Desktop</h4>
                <p className="text-sm text-muted-foreground">Official Claude desktop app</p>
              </div>
            </div>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open Claude Desktop settings</li>
                <li>Navigate to <span className="font-mono rounded bg-muted px-1.5 py-0.5">Developer → MCP Servers</span></li>
                <li>Add a new server configuration:</li>
              </ol>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  <code>{`{
  "mcpServers": {
    "tmdb": {
      "transport": {
        "type": "http",
        "url": "http://localhost:3000/api/mcp"
      }
    }
  }
}`}</code>
                </pre>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground" start={4}>
                <li>Restart Claude Desktop to apply changes</li>
              </ol>
            </div>
          </div>

          {/* Cursor */}
          <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold">
                Cu
              </div>
              <div>
                <h4 className="text-lg font-semibold">Cursor</h4>
                <p className="text-sm text-muted-foreground">AI-powered code editor</p>
              </div>
            </div>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open Cursor settings (<span className="font-mono rounded bg-muted px-1.5 py-0.5">Ctrl/Cmd + ,</span>)</li>
                <li>Go to <span className="font-mono rounded bg-muted px-1.5 py-0.5">MCP Servers</span> section</li>
                <li>Add the following configuration:</li>
              </ol>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  <code>{`{
  "tmdb": {
    "transport": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp"
    }
  }
}`}</code>
                </pre>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground" start={4}>
                <li>Restart Cursor to activate the MCP server</li>
              </ol>
            </div>
          </div>

          {/* Windsurf */}
          <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-bold">
                W
              </div>
              <div>
                <h4 className="text-lg font-semibold">Windsurf</h4>
                <p className="text-sm text-muted-foreground">AI-first IDE by Codeium</p>
              </div>
            </div>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open Windsurf settings</li>
                <li>Navigate to <span className="font-mono rounded bg-muted px-1.5 py-0.5">Extensions → MCP Servers</span></li>
                <li>Add new HTTP MCP server:</li>
              </ol>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  <code>{`Server Name: tmdb
Transport Type: HTTP
Endpoint URL: http://localhost:3000/api/mcp`}</code>
                </pre>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground" start={4}>
                <li>Click <span className="font-semibold">Connect</span> to verify the connection</li>
              </ol>
            </div>
          </div>

          {/* Cline (VS Code) */}
          <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
                Cl
              </div>
              <div>
                <h4 className="text-lg font-semibold">Cline (VS Code Extension)</h4>
                <p className="text-sm text-muted-foreground">Autonomous coding agent for VS Code</p>
              </div>
            </div>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Install Cline extension from VS Code marketplace</li>
                <li>Open Cline settings (<span className="font-mono rounded bg-muted px-1.5 py-0.5">Settings → Extensions → Cline</span>)</li>
                <li>Configure MCP servers in your settings.json:</li>
              </ol>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  <code>{`{
  "cline.mcpServers": {
    "tmdb": {
      "transport": {
        "type": "http",
        "url": "http://localhost:3000/api/mcp"
      }
    }
  }
}`}</code>
                </pre>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground" start={4}>
                <li>Reload VS Code window to apply changes</li>
              </ol>
            </div>
          </div>

          {/* Continue.dev */}
          <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold">
                Co
              </div>
              <div>
                <h4 className="text-lg font-semibold">Continue.dev</h4>
                <p className="text-sm text-muted-foreground">Open-source AI autopilot for VS Code & JetBrains</p>
              </div>
            </div>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Install Continue extension for your IDE</li>
                <li>Open Continue config file (<span className="font-mono rounded bg-muted px-1.5 py-0.5">~/.continue/config.json</span>)</li>
                <li>Add MCP server configuration:</li>
              </ol>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  <code>{`{
  "mcpServers": [
    {
      "name": "tmdb",
      "transport": {
        "type": "http",
        "url": "http://localhost:3000/api/mcp"
      }
    }
  ]
}`}</code>
                </pre>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground" start={4}>
                <li>Restart the IDE to load the MCP server</li>
              </ol>
            </div>
          </div>

          {/* OpenAI ChatGPT */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white font-bold">
                GPT
              </div>
              <div>
                <h4 className="text-lg font-semibold">OpenAI ChatGPT</h4>
                <p className="text-sm text-muted-foreground">Configure custom MCP servers in ChatGPT</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  <strong>Note:</strong> ChatGPT MCP integration requires the desktop application and
                  may have specific requirements for HTTP endpoints.
                </p>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open ChatGPT Desktop settings</li>
                <li>Go to <span className="font-mono rounded bg-muted px-1.5 py-0.5">Model Context Protocol</span></li>
                <li>Add server via HTTP transport with URL:</li>
              </ol>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  <code>http://localhost:3000/api/mcp</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-3xl font-bold">Quick Start</h3>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Start the Server</h4>
                  <p className="text-sm text-muted-foreground">
                    Run the development server to make the MCP endpoint available:
                  </p>
                  <div className="mt-2 rounded-lg bg-muted p-3">
                    <code className="text-sm">bun run dev</code>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Configure Your AI Agent</h4>
                  <p className="text-sm text-muted-foreground">
                    Follow the installation instructions above for your preferred AI agent or IDE
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Start Querying TMDB</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the available tools to search movies, get details, discover content, and more!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-12 text-center text-3xl font-bold">Features</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold">Fast & Efficient</h4>
              <p className="text-sm text-muted-foreground">
                Streamable HTTP endpoint for real-time responses without state management overhead
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold">Multi-Language</h4>
              <p className="text-sm text-muted-foreground">
                Support for multiple languages with ISO 639-1 language codes
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold">Type-Safe</h4>
              <p className="text-sm text-muted-foreground">
                Built with TypeScript for reliable tool definitions and parameter validation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
            <p className="mb-2">
              TMDB MCP Server - Powered by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                The Movie Database
              </a>
            </p>
            <p>
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
