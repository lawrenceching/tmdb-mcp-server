export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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

      {/* MCP Configuration */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h3 className="mb-8 text-center text-3xl font-bold">Usage</h3>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-6">
              {/* Protocol */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Protocol</h4>
                <p className="text-lg font-mono">StreamableHTTP</p>
              </div>

              {/* URL */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">URL</h4>
                <div className="rounded-lg bg-muted p-4">
                  <code className="text-sm">https://tmdb-mcp-server.imlc.me/api/mcp</code>
                </div>
              </div>

              {/* Generic Config */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Configuration</h4>
                <div className="rounded-lg bg-muted p-4">
                  <pre className="overflow-x-auto text-xs">
                    <code>{`{
  "mcpServers": {
    "tmdb": {
      "transport": {
        "type": "streamable-http",
        "url": "https://tmdb-mcp-server.imlc.me/api/mcp"
      }
    }
  }
}`}</code>
                  </pre>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Replace <code>streamable-http</code> with <code>http</code> if your client does not support the former.
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
              <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                The Movie Database
              </a>
            </p>
            <p className="mb-2">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            <a href="/llms" className="text-primary hover:underline">AI Agent Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
