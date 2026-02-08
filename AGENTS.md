# AGENTS.md

## 项目概述
本项目是一个 Next.js App Router 项目，采用以下技术栈：
- **框架**: Next.js 16.1.6 (App Router)
- **包管理器**: Bun
- **前端**: React 19.2.3 + TypeScript 5
- **样式**: Tailwind CSS 4 + Shadcn UI
- **代码规范**: ESLint 9

## 开发环境设置

### 前置要求
- Node.js 20+
- Bun (包管理器)

### 安装依赖
```bash
bun install
```

### 启动开发服务器
```bash
bun run dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
bun run build
```

### 运行生产服务器
```bash
bun run start
```

## 代码规范

### Lint 检查
```bash
bun run lint
```

### TypeScript 类型检查
```bash
npx tsc --noEmit
```

## 项目结构
```
├── app/              # Next.js App Router 页面
│   ├── globals.css   # 全局样式
│   ├── layout.tsx    # 根布局
│   └── page.tsx      # 首页
├── public/           # 静态资源
├── components/       # 可复用组件 (shadcn UI 组件)
└── lib/             # 工具函数和配置
```

## Shadcn UI 组件

### 添加新组件
```bash
bunx shadcn@latest add <component-name>
```

### 组件位置
- Shadcn UI 组件位于 `components/ui/` 目录
- 组件使用 Tailwind CSS 进行样式定制

## 测试说明
- 本项目使用 Vitest 进行测试（如需配置）
- 运行测试: `bun test` (待配置)
- 测试文件应与源文件同级，命名为 `*.test.ts` 或 `*.test.tsx`

## 提交规范
- 提交前必须通过 `bun run lint` 检查
- 提交前确保 TypeScript 类型检查通过
- 建议使用语义化提交信息