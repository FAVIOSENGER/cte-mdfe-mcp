/**
 * Adapter do provedor Focus NFe para documentos de transporte (CT-e e MDF-e).
 *
 * Autenticação: HTTP Basic, token como usuário e senha vazia.
 * Base homologação: https://homologacao.focusnfe.com.br
 * Base produção:    https://api.focusnfe.com.br
 * A "ref" é um identificador único que VOCÊ escolhe para o documento.
 *
 * Confirme os campos do payload na doc da sua conta: https://doc.focusnfe.com.br
 */
export interface Resposta { status: number; ok: boolean; body: unknown; }

const BASE: Record<string, string> = {
  homologacao: "https://homologacao.focusnfe.com.br",
  producao: "https://api.focusnfe.com.br",
};

export class Provider {
  private token: string;
  private baseUrl: string;

  constructor(config: Record<string, string>) {
    this.token = config.FOCUS_NFE_TOKEN || "";
    const amb = config.FOCUS_NFE_AMBIENTE === "producao" ? "producao" : "homologacao";
    this.baseUrl = BASE[amb];
    if (!this.token) throw new Error("FOCUS_NFE_TOKEN não configurado.");
  }

  private async req(method: string, path: string, body?: unknown): Promise<Resposta> {
    const auth = "Basic " + Buffer.from(`${this.token}:`).toString("base64");
    const resp = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await resp.text();
    let parsed: unknown;
    try { parsed = text ? JSON.parse(text) : null; } catch { parsed = text; }
    return { status: resp.status, ok: resp.ok, body: parsed };
  }

  private ref(args: Record<string, unknown>): string {
    return encodeURIComponent(String(args.ref ?? ""));
  }

  // ---- CT-e ----
  async emitir_cte(args: Record<string, unknown>): Promise<Resposta> {
    return this.req("POST", `/v2/cte?ref=${this.ref(args)}`, args.dados);
  }
  async consultar_cte(args: Record<string, unknown>): Promise<Resposta> {
    return this.req("GET", `/v2/cte/${this.ref(args)}?completa=1`);
  }
  async cancelar_cte(args: Record<string, unknown>): Promise<Resposta> {
    return this.req("DELETE", `/v2/cte/${this.ref(args)}`, { justificativa: args.justificativa });
  }

  // ---- MDF-e ----
  async emitir_mdfe(args: Record<string, unknown>): Promise<Resposta> {
    return this.req("POST", `/v2/mdfe?ref=${this.ref(args)}`, args.dados);
  }
  async consultar_mdfe(args: Record<string, unknown>): Promise<Resposta> {
    return this.req("GET", `/v2/mdfe/${this.ref(args)}?completa=1`);
  }
  async encerrar_mdfe(args: Record<string, unknown>): Promise<Resposta> {
    // Encerramento do MDF-e (confirmar endpoint exato na doc da conta).
    return this.req("POST", `/v2/mdfe/${this.ref(args)}/encerramento`, args.dados);
  }
}
