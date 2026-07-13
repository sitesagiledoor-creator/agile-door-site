/**
 * Build estático opcional para hospedagens sem Node.js (qualquer provedor).
 * O build padrão do Next (`npm run build`) continua sendo o caminho principal.
 *
 * Rotas de API não são suportadas no `output: "export"`. O site hoje não tem
 * rotas de API (contato é 100% via WhatsApp/tel/mailto), mas o script segue
 * defensivo: se app/api voltar a existir, é movida para fora do router
 * durante o build e restaurada em seguida.
 *
 * Uso: npm run build:static  →  resultado em out/
 */
import { existsSync, renameSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = path.join(root, "app", "api");
const parkedDir = path.join(root, "api.excluded-from-static-export");

// Tipos gerados pelo `next dev` referenciam a rota de API que será movida;
// removê-los evita erro de typecheck (são regenerados no próximo dev).
rmSync(path.join(root, ".next", "dev", "types"), {
  recursive: true,
  force: true,
});

if (existsSync(parkedDir)) {
  console.error(
    `Encontrado ${parkedDir} de um build anterior interrompido — ` +
      "restaure-o manualmente para app/api antes de continuar."
  );
  process.exit(1);
}

const hadApi = existsSync(apiDir);
if (hadApi) renameSync(apiDir, parkedDir);

let status = 1;
try {
  const result = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  status = result.status ?? 1;
} finally {
  if (hadApi && existsSync(parkedDir)) renameSync(parkedDir, apiDir);
}

process.exit(status);
