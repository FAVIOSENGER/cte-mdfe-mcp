# cte-mdfe-mcp

[![npm version](https://img.shields.io/npm/v/cte-mdfe-mcp.svg)](https://www.npmjs.com/package/cte-mdfe-mcp)

Emissao e consulta de CT-e e MDF-e (documentos fiscais de transporte) no Brasil para agentes de IA, via Focus NFe.

## Instalação (Claude Desktop)

```json
{
  "mcpServers": {
    "cte-mdfe-mcp": {
      "command": "npx",
      "args": ["-y", "cte-mdfe-mcp"],
      "env": {
        "FOCUS_NFE_TOKEN": "...",
        "FOCUS_NFE_AMBIENTE": "..."
      }
    }
  }
}
```

Teste sem credencial: `"env": { "PROVIDER": "mock" }`.

## Ferramentas

- `emitir_cte` — Emite um CT-e (Conhecimento de Transporte eletronico)
- `consultar_cte` — Consulta status e downloads de um CT-e
- `cancelar_cte` — Cancela um CT-e autorizado
- `emitir_mdfe` — Emite um MDF-e (Manifesto de Documentos Fiscais eletronico)
- `consultar_mdfe` — Consulta status e downloads de um MDF-e
- `encerrar_mdfe` — Encerra um MDF-e autorizado

## Licença

MIT © Favio Senger
