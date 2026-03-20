import { createClient } from "redis";
import { NextRequest, NextResponse } from "next/server";

// 创建 Redis 客户端
let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redisClient) {
    try {
      const redisUrl = process.env.REDIS_URL;
      if (!redisUrl) {
        throw new Error("REDIS_URL is not set");
      }
      
      console.log("Connecting to Redis:", redisUrl);
      redisClient = createClient({ url: redisUrl });
      redisClient.on("error", (err) => console.error("Redis Client Error", err));
      await redisClient.connect();
      console.log("Connected to Redis successfully");
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      throw error;
    }
  }
  return redisClient;
}

// TVDB API 基础 URL
const TVDB_API_BASE_URL = "https://api4.thetvdb.com";

// 登录到 TVDB API 获取 token
async function loginToTvdb() {
  const apiKey = process.env.TVDB_API_KEY;
  if (!apiKey) {
    throw new Error("TVDB_API_KEY is not set");
  }

  const response = await fetch(`${TVDB_API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apikey: apiKey }),
  });

  if (!response.ok) {
    throw new Error(`TVDB login failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.token;
}

// 获取 TVDB token，处理并发登录
async function getTvdbToken() {
  const redis = await getRedisClient();
  const tokenKey = "tvdb_token";
  const lockKey = "tvdb_login_lock";
  const lockExpiry = 10; // 锁过期时间（秒）
  const maxWaitTime = 10000; // 最大等待时间（毫秒）
  const startTime = Date.now();

  // 尝试获取 token
  console.log("Trying to get TVDB token from Redis");
  let token = await redis.get(tokenKey);
  if (token) {
    console.log("TVDB token found in Redis");
    return token;
  }
  console.log("TVDB token not found in Redis");

  // 尝试获取锁
  while (Date.now() - startTime < maxWaitTime) {
    console.log("Trying to acquire Redis lock for TVDB login");
    const lockAcquired = await redis.set(lockKey, "1", {
      EX: lockExpiry,
      NX: true,
    });

    if (lockAcquired) {
      console.log("Redis lock acquired for TVDB login");
      try {
        // 再次检查 token，可能在获取锁的过程中其他请求已经登录成功
        token = await redis.get(tokenKey);
        if (token) {
          console.log("TVDB token found in Redis after acquiring lock");
          return token;
        }

        // 登录获取新 token
        console.log("Logging in to TVDB API to get new token");
        token = await loginToTvdb();
        if (!token) {
          throw new Error("Failed to get TVDB token");
        }
        // 存储 token，设置过期时间为 30 天
        console.log("Storing TVDB token in Redis with 30-day expiry");
        await redis.set(tokenKey, token, { EX: 30 * 24 * 60 * 60 });
        console.log("TVDB token stored in Redis successfully");
        return token;
      } finally {
        // 释放锁
        console.log("Releasing Redis lock for TVDB login");
        await redis.del(lockKey);
        console.log("Redis lock released successfully");
      }
    } else {
      console.log("Redis lock not acquired, waiting...");
    }

    // 等待一段时间后重试
    await new Promise((resolve) => setTimeout(resolve, 100));
    // 再次检查 token
    token = await redis.get(tokenKey);
    if (token) {
      console.log("TVDB token found in Redis during waiting period");
      return token;
    }
  }

  throw new Error("Failed to get TVDB token within timeout");
}

// 处理所有 HTTP 方法
export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function PUT(request: NextRequest) {
  return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

// 处理请求的核心函数
async function handleRequest(request: NextRequest) {
  try {
    // 获取路径参数和查询参数
    const url = new URL(request.url);
    const pathname = url.pathname;
    const searchParams = url.search;
    const tvdbPath = pathname.replace(/^\/api\/tvdb/, "") || "/";

    // 获取 TVDB token
    const token = await getTvdbToken();

    // 构建 TVDB API URL
    const tvdbUrl = `${TVDB_API_BASE_URL}${tvdbPath}${searchParams}`;

    // 构建请求选项
    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${token}`);
    headers.delete("host");
    headers.delete("connection");
    
    const requestOptions: RequestInit = {
      method: request.method,
      headers: headers,
    };

    // 如果有请求体，添加到请求选项
    if (request.method !== "GET" && request.method !== "HEAD") {
      const body = await request.body;
      if (body) {
        requestOptions.body = body;
      }
    }

    // 转发请求到 TVDB API
    console.log(`Forwarding request to TVDB API: ${tvdbUrl}`);
    console.log(`Request headers: ${JSON.stringify(Object.fromEntries(headers.entries()))}`);
    
    const response = await fetch(tvdbUrl, requestOptions);
    
    console.log(`TVDB API response status: ${response.status} ${response.statusText}`);
    console.log(`TVDB API response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`);

    // 构建响应
    const responseHeaders = new Headers(response.headers);
    // 移除可能导致问题的头
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error handling TVDB request:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
