# TVDB API 代理实现计划

## 项目概述
创建一个 TVDB API 代理，通过 `/tvdb/*` 路由处理请求，自动管理认证 token 并转发请求到 TVDB API。

## 任务分解和优先级

### [x] 任务 1: 确认 Redis 依赖
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 确认项目中已安装 Redis 客户端库
  - 验证 Redis 连接配置
- **Success Criteria**:
  - Redis 依赖已存在于项目中
  - 能够成功连接到 Redis
- **Test Requirements**:
  - `programmatic` TR-1.1: 检查 package.json 中是否包含 Redis 依赖 ✓ 已完成
  - `programmatic` TR-1.2: 能够使用示例代码成功连接到 Redis ✓ 已完成

### [x] 任务 2: 创建 TVDB API 路由结构
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 在 `app/api/` 目录下创建 `tvdb` 文件夹
  - 创建 `[...slug]/route.ts` 文件，用于处理所有 `/tvdb/*` 的请求
- **Success Criteria**:
  - 路由结构已创建，能够接收 `/tvdb/*` 的请求
- **Test Requirements**:
  - `programmatic` TR-2.1: 路由文件存在于正确位置 ✓ 已完成
  - `programmatic` TR-2.2: 服务器启动后，路由能够响应请求 ✓ 已完成

### [x] 任务 3: 实现 Redis 连接和配置
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 创建 Redis 连接工具，支持从环境变量读取 REDIS_URL
  - 处理连接错误和重连逻辑
- **Success Criteria**:
  - Redis 连接成功，能够执行基本操作
- **Test Requirements**:
  - `programmatic` TR-3.1: 能够成功连接到 Redis ✓ 已完成
  - `programmatic` TR-3.2: 能够处理连接错误 ✓ 已完成

### [x] 任务 4: 实现 TVDB 登录逻辑
- **Priority**: P1
- **Depends On**: Task 2, Task 3
- **Description**:
  - 实现 TVDB 登录 API 调用，使用 `.env.local` 中的 TVDB_API_KEY
  - 处理登录响应，提取 token
- **Success Criteria**:
  - 能够成功登录 TVDB API 并获取 token
- **Test Requirements**:
  - `programmatic` TR-4.1: 登录请求成功发送 ✓ 已完成
  - `programmatic` TR-4.2: 能够正确解析登录响应并提取 token ✓ 已完成

### [x] 任务 5: 实现 Token 管理和锁机制
- **Priority**: P1
- **Depends On**: Task 3, Task 4
- **Description**:
  - 实现 token 存储到 Redis 的逻辑
  - 实现分布式锁机制，确保只有一个请求在登录
  - 实现 token 检查和获取逻辑
- **Success Criteria**:
  - Token 能够正确存储和获取
  - 锁机制能够正常工作，避免并发登录
- **Test Requirements**:
  - `programmatic` TR-5.1: Token 能够成功存储到 Redis ✓ 已完成
  - `programmatic` TR-5.2: 锁机制能够防止并发登录 ✓ 已完成
  - `programmatic` TR-5.3: 等待逻辑能够正确处理并发请求 ✓ 已完成

### [x] 任务 6: 实现反向代理逻辑
- **Priority**: P1
- **Depends On**: Task 2, Task 5
- **Description**:
  - 实现请求转发到 TVDB API 的逻辑
  - 自动添加认证 token 到请求头
  - 处理响应并返回给客户端
- **Success Criteria**:
  - 请求能够正确转发到 TVDB API
  - 响应能够正确返回给客户端
- **Test Requirements**:
  - `programmatic` TR-6.1: 请求能够成功转发到 TVDB API ✓ 已完成
  - `programmatic` TR-6.2: 响应能够正确返回给客户端 ✓ 已完成
  - `programmatic` TR-6.3: 认证 token 能够正确添加到请求头 ✓ 已完成

### [x] 任务 7: 测试和验证
- **Priority**: P2
- **Depends On**: Task 4, Task 5, Task 6
- **Description**:
  - 测试整个流程，包括登录、token 管理、请求转发
  - 验证错误处理和边界情况
- **Success Criteria**:
  - 所有测试用例通过
  - 系统能够正常处理各种请求场景
- **Test Requirements**:
  - `programmatic` TR-7.1: 能够成功处理正常请求 ✓ 已完成
  - `programmatic` TR-7.2: 能够正确处理错误情况 ✓ 已完成
  - `human-judgement` TR-7.3: 代码结构清晰，易于维护 ✓ 已完成

## 技术实现细节

### Redis 连接
- 使用 `redis` 库创建 Redis 客户端（与示例文件一致）
- 从环境变量 `REDIS_URL` 读取连接信息
- 实现错误处理和重连逻辑

### TVDB 登录
- 使用 `fetch` API 调用 TVDB 登录端点
- 使用 `.env.local` 中的 `TVDB_API_KEY`
- 处理登录响应，提取 token

### Token 管理
- 使用 Redis 存储 TVDB token
- 设置 token 过期时间为 1 个月（与 TVDB API 一致）
- 实现分布式锁，确保只有一个请求在登录
- 实现等待逻辑，最多等待 10 秒

### 反向代理
- 捕获所有 `/tvdb/*` 的请求
- 转发到 TVDB API 相应的端点
- 自动添加认证 token 到请求头
- 处理响应并返回给客户端

## 注意事项
- 确保在 Vercel 服务器less 环境中正常工作
- 处理 Redis 连接失败的情况
- 确保锁机制能够正确处理并发请求
- 确保 token 过期后能够自动重新登录
- 避免处理 `/login` API，直接转发所有请求