'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const handleCurl = async () => {
    setIsLoading(true);
    addLog('Starting curl request to TMDB API...');
    addLog('Endpoint: https://api.themoviedb.org/3/movie/popular');

    try {
      const response = await fetch('/api/debug/curl', {
        method: 'POST',
      });

      addLog(`Response Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const error = await response.text();
        addLog(`ERROR: ${error}`);
      } else {
        const data = await response.json();
        addLog('Request successful!');
        addLog(`Response Data: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      addLog(`Exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePing = async () => {
    setIsLoading(true);
    addLog('Starting ping request to TMDB API...');
    addLog('Endpoint: https://api.themoviedb.org/3');

    try {
      const response = await fetch('/api/debug/ping', {
        method: 'POST',
      });

      addLog(`Response Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const error = await response.text();
        addLog(`ERROR: ${error}`);
      } else {
        const data = await response.json();
        addLog('Ping successful!');
        addLog(`Response: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      addLog(`Exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

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
              <h1 className="text-xl font-bold">TMDB Debug Page</h1>
              <p className="text-sm text-muted-foreground">Test connectivity to TMDB API</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">TMDB API Connectivity Test</h2>
            <p className="mb-6 text-muted-foreground">
              Use the buttons below to test the connection to The Movie Database (TMDB) API server.
              Results will be displayed in the log area.
            </p>

            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-4">
              <Button
                onClick={handleCurl}
                disabled={isLoading}
                size="lg"
                className="min-w-[160px]"
              >
                {isLoading ? 'Testing...' : 'Curl TMDB API'}
              </Button>
              <Button
                onClick={handlePing}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="min-w-[160px]"
              >
                {isLoading ? 'Testing...' : 'Ping TMDB API'}
              </Button>
              <Button
                onClick={clearLogs}
                disabled={isLoading}
                variant="secondary"
                size="lg"
              >
                Clear Logs
              </Button>
            </div>

            {/* Logs Display */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Logs:</label>
              <textarea
                readOnly
                value={logs.join('\n')}
                placeholder="Logs will appear here..."
                className="min-h-[400px] w-full rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground"
              />
            </div>

            {/* Info Box */}
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <h3 className="mb-2 font-semibold">Test Details:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><strong>Curl:</strong> Makes a GET request to /movie/popular endpoint with authentication</li>
                <li><strong>Ping:</strong> Makes a simple GET request to the API base to test connectivity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
