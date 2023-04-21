# HULL project replication

Based on the following rad project:
- https://hull.dev/
- https://github.com/ndimatteo/HULL

Add first dirs and files.

```bash
pnpm add next react react-dom
mkdir pages public
touch pages/index.tsx tsconfig.json
```


Setup basic dev server script.

```json
"name": "hull-replica",
"version": "0.1.0",
"private": true,
"scripts": {
  "dev": "next dev"
}
```

