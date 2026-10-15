# Publicar — resumo (detalhes no PLAYBOOK)

1. `npm install && npm run build && PROVIDER=mock node test/client.mjs`
2. Implementar `src/provider.ts` (lógica real) e testar.
3. GitHub: `gh repo create FAVIOSENGER/cte-mdfe-mcp --public --source=. --push`
4. npm: `npm publish --access public` (autorizar 2FA no navegador)
5. Esperar ~2min a versão propagar no npm.
6. Registro MCP: `mcp-publisher login github` e `mcp-publisher publish`
7. Topics: `gh repo edit FAVIOSENGER/cte-mdfe-mcp --add-topic mcp,...`

⚠️ Namespace case-sensitive (io.github.FAVIOSENGER). mcpName = name do server.json.
