/** Provedor de SIMULAÇÃO (PROVIDER=mock). Mesmos métodos, respostas falsas. */
export class MockProvider {
  async emitir_cte(args: Record<string, unknown>) {
    return { status: 200, ok: true, body: { simulado: true, ferramenta: "emitir_cte", args } };
  }

  async consultar_cte(args: Record<string, unknown>) {
    return { status: 200, ok: true, body: { simulado: true, ferramenta: "consultar_cte", args } };
  }

  async cancelar_cte(args: Record<string, unknown>) {
    return { status: 200, ok: true, body: { simulado: true, ferramenta: "cancelar_cte", args } };
  }

  async emitir_mdfe(args: Record<string, unknown>) {
    return { status: 200, ok: true, body: { simulado: true, ferramenta: "emitir_mdfe", args } };
  }

  async consultar_mdfe(args: Record<string, unknown>) {
    return { status: 200, ok: true, body: { simulado: true, ferramenta: "consultar_mdfe", args } };
  }

  async encerrar_mdfe(args: Record<string, unknown>) {
    return { status: 200, ok: true, body: { simulado: true, ferramenta: "encerrar_mdfe", args } };
  }
}
