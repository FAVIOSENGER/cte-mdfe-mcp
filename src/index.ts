#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Provider } from "./provider.js";
import { MockProvider } from "./mock.js";

const usarMock = process.env.PROVIDER === "mock";
const config: Record<string, string> = {
  FOCUS_NFE_TOKEN: process.env.FOCUS_NFE_TOKEN ?? "",
  FOCUS_NFE_AMBIENTE: process.env.FOCUS_NFE_AMBIENTE ?? "",
};
const provider: any = usarMock ? new MockProvider() : new Provider(config);

const server = new McpServer({ name: "cte-mdfe-mcp", version: "0.1.0" });

function resultado(titulo: string, resp: { status: number; ok: boolean; body: unknown }) {
  const corpo = typeof resp.body === "string" ? resp.body : JSON.stringify(resp.body, null, 2);
  return {
    content: [{ type: "text" as const, text: `${titulo}\nHTTP ${resp.status} (${resp.ok ? "ok" : "erro"})\n\n${corpo}` }],
    isError: !resp.ok,
  };
}

server.tool(
  "emitir_cte",
  "Emite um CT-e (Conhecimento de Transporte eletronico)",
  {
    ref: z.string().describe("Identificador unico do documento"),
    dados: z.record(z.any()).describe("Dados fiscais do CT-e no formato do provedor"),
  },
  async (args) => resultado("emitir_cte", await (provider as any).emitir_cte(args))
);

server.tool(
  "consultar_cte",
  "Consulta status e downloads de um CT-e",
  {
    ref: z.string().describe("A ref usada na emissao"),
  },
  async (args) => resultado("consultar_cte", await (provider as any).consultar_cte(args))
);

server.tool(
  "cancelar_cte",
  "Cancela um CT-e autorizado",
  {
    ref: z.string().describe("A ref do documento"),
    justificativa: z.string().describe("Motivo do cancelamento"),
  },
  async (args) => resultado("cancelar_cte", await (provider as any).cancelar_cte(args))
);

server.tool(
  "emitir_mdfe",
  "Emite um MDF-e (Manifesto de Documentos Fiscais eletronico)",
  {
    ref: z.string().describe("Identificador unico do documento"),
    dados: z.record(z.any()).describe("Dados fiscais do MDF-e no formato do provedor"),
  },
  async (args) => resultado("emitir_mdfe", await (provider as any).emitir_mdfe(args))
);

server.tool(
  "consultar_mdfe",
  "Consulta status e downloads de um MDF-e",
  {
    ref: z.string().describe("A ref usada na emissao"),
  },
  async (args) => resultado("consultar_mdfe", await (provider as any).consultar_mdfe(args))
);

server.tool(
  "encerrar_mdfe",
  "Encerra um MDF-e autorizado",
  {
    ref: z.string().describe("A ref do documento"),
    dados: z.record(z.any()).describe("Dados de encerramento (municipio, UF, data)"),
  },
  async (args) => resultado("encerrar_mdfe", await (provider as any).encerrar_mdfe(args))
);

async function main() {
  await server.connect(new StdioServerTransport());
  console.error("cte-mdfe-mcp" + " rodando" + (usarMock ? " (SIMULAÇÃO)" : "") + ".");
}
main().catch((e) => { console.error(e); process.exit(1); });
