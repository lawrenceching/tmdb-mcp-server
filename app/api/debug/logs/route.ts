import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

const LOG_FILE_PATH = '/tmp/app.log';

/**
 * GET /api/debug/logs
 * Returns raw logs from the /tmp/app.log file
 */
export async function GET(request: NextRequest) {
  try {
    // Check if log file exists
    if (!existsSync(LOG_FILE_PATH)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Log file not found',
          path: LOG_FILE_PATH,
        },
        { status: 404 }
      );
    }

    // Read the log file
    const logContent = await readFile(LOG_FILE_PATH, 'utf-8');

    // Return raw log content as plain text
    return new NextResponse(logContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to read log file',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
