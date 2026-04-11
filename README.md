# Portfolio Labs

A standalone repo for shipping small portfolio apps often.

The goal is not to have one huge side project that takes months to explain. The goal is to build
small, presentable labs with a workflow that looks closer to real work:

- feature branches
- pull requests
- automated checks
- fast builds
- visible iteration in GitHub history

## Stack

- React 19
- TypeScript
- Vite
- Vitest
- GitHub Actions

## Commands

```sh
pnpm install
pnpm dev
pnpm lint
pnpm test:run
pnpm build
```

## Workflow

1. Create a branch like `feature/invoice-radar`.
2. Build or refine a small lab with a focused scope.
3. Open a PR and let CI run lint, tests, and build.
4. Merge when checks pass.
