import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node", args: ["dist/index.js"], env: { ...process.env, PROVIDER: "mock" },
});
const client = new Client({ name: "teste", version: "1.0.0" });
await client.connect(transport);
const { tools } = await client.listTools();
console.log("Ferramentas:", tools.map((t) => t.name).join(", "));
await client.close();
console.log("OK");
