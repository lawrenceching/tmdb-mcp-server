import { ConnectionStatus } from '@/components/connection-status'

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

      {/* HTTP proxies */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-2xl">
          <h3 className="mb-8 text-center text-3xl font-bold">HTTP API proxies</h3>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Layer-7 reverse proxies: local path prefix is stripped, credentials are injected on the server, and the upstream response is streamed back to the client.
          </p>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold">TMDB</h4>
                <ConnectionStatus checkUrl="/api/tmdb/tv/84666" />
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Requests to <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">/api/tmdb/*</code> are forwarded to{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">https://api.themoviedb.org/*</code>.
                The <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">/api/tmdb</code> prefix is removed; the server adds{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">Authorization: Bearer …</code> using{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">TMDB_ACCESS_TOKEN</code>.
                Responses include <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">Via</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">Server</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">X-Upstream-Response-Time</code>, and{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">X-Upstream-Status</code>.
              </p>
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Example</p>
                <div className="rounded-lg bg-muted p-4">
                  <code className="text-sm font-mono break-all">
                    GET /api/tmdb/tv/84666 → https://api.themoviedb.org/3/tv/84666
                  </code>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold">TVDB</h4>
                <ConnectionStatus checkUrl="/api/tvdb/series/421069" />
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Requests to <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">/api/tvdb/*</code> are forwarded to{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">https://api4.thetvdb.com/*</code>.
                The <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">/api/tvdb</code> prefix is removed; the server obtains a TVDB bearer token (via API key and Redis-backed caching) and sets{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">Authorization</code> on the outbound request.
              </p>
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Example</p>
                <div className="rounded-lg bg-muted p-4">
                  <code className="text-sm font-mono break-all">
                    GET /api/tvdb/series/421069 → https://api4.thetvdb.com/series/421069
                  </code>
                </div>
              </div>
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
