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

      {/* Installation Instructions */}
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
        "url": "https://tmdb-mcp-server.imlc.me/api/mcp"
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
      "url": "https://tmdb-mcp-server.imlc.me/api/mcp"
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
Endpoint URL: https://tmdb-mcp-server.imlc.me/api/mcp`}</code>
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
        "url": "https://tmdb-mcp-server.imlc.me/api/mcp"
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
        "url": "https://tmdb-mcp-server.imlc.me/api/mcp"
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
                  <code>https://tmdb-mcp-server.imlc.me/api/mcp</code>
                </pre>
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
