interface McpClientCardProps {
  id: string;
  initials: string;
  name: string;
  description: string;
  gradient: string;
  steps?: string[];
  command?: string;
  config?: string;
  showProjectNote?: boolean;
  docsLink?: string;
}

function McpClientCard({
  id,
  initials,
  name,
  description,
  gradient,
  steps = [],
  command,
  config,
  showProjectNote = false,
  docsLink = "",
}: McpClientCardProps) {
  const projectNoteHtml = showProjectNote ? (
    <>
      <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          <strong>Recommended:</strong> Use project scope to share MCP server configuration with your team.
          See{" "}
          <a
            href={docsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Claude Code MCP documentation
          </a>{" "}
          for more details.
        </p>
      </div>
      <div className="rounded-lg bg-muted/50 border border-border p-4">
        <p className="text-sm text-muted-foreground">
          Learn more about MCP in Claude Code at the{" "}
          <a
            href={docsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            official documentation
          </a>
          .
        </p>
      </div>
    </>
  ) : null;

  const commandHtml = command && steps[0] ? (
    <>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        <li>{steps[0]}</li>
      </ol>
      <div className="mt-4 rounded-lg bg-muted p-4">
        <pre className="overflow-x-auto text-xs">
          <code>{command}</code>
        </pre>
      </div>
    </>
  ) : null;

  const configHtml = config ? (
    <>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        {steps.slice(0, 3).map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="mt-4 rounded-lg bg-muted p-4">
        <pre className="overflow-x-auto text-xs">
          <code>{config}</code>
        </pre>
      </div>
    </>
  ) : null;

  const defaultStepsHtml = (
    <>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      {steps.length > 3 && (
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground" start={4}>
          <li>{steps[3]}</li>
        </ol>
      )}
    </>
  );

  return (
    <div id={id} className="mb-10 scroll-mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white font-bold`}
        >
          {initials}
        </div>
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {projectNoteHtml}
        {command || config ? (
          <>
            {commandHtml}
            {configHtml}
          </>
        ) : (
          defaultStepsHtml
        )}
      </div>
    </div>
  );
}

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
          <h3 className="mb-6 text-center text-3xl font-bold">Installation Instructions</h3>

          {/* Quick Nav Links */}
          <nav className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {[
              { id: "claude-code", label: "Claude Code", color: "from-red-500 to-red-600" },
              { id: "claude-desktop", label: "Claude Desktop", color: "from-orange-500 to-orange-600" },
              { id: "cursor", label: "Cursor", color: "from-purple-500 to-purple-600" },
              { id: "windsurf", label: "Windsurf", color: "from-cyan-500 to-cyan-600" },
              { id: "cline", label: "Cline", color: "from-blue-500 to-blue-600" },
              { id: "continue", label: "Continue.dev", color: "from-emerald-500 to-emerald-600" },
              { id: "chatgpt", label: "ChatGPT", color: "from-green-500 to-green-600" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
              >
                <span className={`inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br ${item.color}`} />
                {item.label}
              </a>
            ))}
          </nav>

          {/* Claude Code */}
          <McpClientCard
            id="claude-code"
            initials="CC"
            name="Claude Code"
            description="AI coding agent in the browser"
            gradient="from-red-500 to-red-600"
            steps={[
              "Run the following command in your terminal:",
              "This creates a .mcp.json file in your project root",
              "The configuration can be checked into version control for team collaboration",
            ]}
            command="claude mcp add tmdb --transport http --scope project https://tmdb-mcp-server.imlc.me/api/mcp"
            showProjectNote={true}
            docsLink="https://code.claude.com/docs/en/mcp"
          />

          {/* Cursor */}
          <McpClientCard
            id="cursor"
            initials="Cu"
            name="Cursor"
            description="AI-powered code editor"
            gradient="from-purple-500 to-purple-600"
            steps={[
              "Open Cursor settings (Ctrl/Cmd + ,)",
              "Go to MCP Servers section",
              "Add the following configuration:",
              "Restart Cursor to activate the MCP server",
            ]}
            config={JSON.stringify(
              {
                tmdb: {
                  transport: {
                    type: "http",
                    url: "https://tmdb-mcp-server.imlc.me/api/mcp",
                  },
                },
              },
              null,
              2
            )}
          />

          {/* Windsurf */}
          <McpClientCard
            id="windsurf"
            initials="W"
            name="Windsurf"
            description="AI-first IDE by Codeium"
            gradient="from-cyan-500 to-cyan-600"
            steps={[
              "Open Windsurf settings",
              "Navigate to Extensions → MCP Servers",
              "Add new HTTP MCP server:",
              "Click Connect to verify the connection",
            ]}
            config={`Server Name: tmdb
Transport Type: HTTP
Endpoint URL: https://tmdb-mcp-server.imlc.me/api/mcp`}
          />

          {/* Cline (VS Code) */}
          <div id="cline" className="mb-10 scroll-mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
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
                <li>Open Cline settings (Settings → Extensions → Cline)</li>
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
          <div id="continue" className="mb-10 scroll-mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
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
                <li>Open Continue config file (~/.continue/config.json)</li>
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
          <div id="chatgpt" className="scroll-mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
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
                  <strong>Note:</strong> ChatGPT MCP integration requires the desktop application and may have specific
                  requirements for HTTP endpoints.
                </p>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open ChatGPT Desktop settings</li>
                <li>Go to Model Context Protocol</li>
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
              <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                The Movie Database
              </a>
            </p>
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
