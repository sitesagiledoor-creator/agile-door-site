/**
 * Gera o pacote pronto para hospedagem: roda o build estático e compacta out/
 * num .zip datado na Área de Trabalho.
 *
 * O zip é criado com o `tar` do sistema (bsdtar) porque ele grava os caminhos
 * com barra normal. O Compress-Archive do PowerShell 5.1 grava "\", e o
 * servidor Linux extrai tudo como arquivo de nome esquisito na raiz.
 *
 * Uso: npm run package:static
 * Variáveis aceitas: NEXT_PUBLIC_SITE_URL, STATIC_BASE_PATH (ver LEIA-ME.txt)
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const saida = path.join(raiz, "out");

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const build = spawnSync(npm, ["run", "build:static"], {
  cwd: raiz,
  stdio: "inherit",
  shell: false,
});
if (build.status !== 0) process.exit(build.status ?? 1);

if (!existsSync(path.join(saida, "index.html"))) {
  console.error("Build terminou sem gerar out/index.html.");
  process.exit(1);
}

const hoje = new Date().toISOString().slice(0, 10);
const destinoDir = path.join(os.homedir(), "Desktop");
mkdirSync(destinoDir, { recursive: true });
const zip = path.join(destinoDir, `SITE-AGILE-DOOR-${hoje}.zip`);
rmSync(zip, { force: true });

// No Windows é preciso o bsdtar de System32: o `tar` que costuma estar no
// PATH vem do Git, é o GNU tar, e ele lê "C:\..." como host remoto
// ("Cannot connect to C") além de não criar zip.
const bsdtar =
  process.platform === "win32"
    ? path.join(process.env.SystemRoot ?? "C:\Windows", "System32", "tar.exe")
    : "tar";

// -a infere o formato pela extensão; -C entra na pasta para o zip não
// carregar o nível "out/" dentro dele
const tar = spawnSync(bsdtar, ["-a", "-c", "-f", zip, "-C", saida, "."], {
  stdio: "inherit",
  shell: false,
});
if (tar.status !== 0) {
  console.error(
    "Falha ao compactar. Compacte out/ manualmente com um programa que grave " +
      "caminhos com barra normal (o Compress-Archive do PowerShell não serve)."
  );
  process.exit(tar.status ?? 1);
}

console.log(`\nPacote pronto: ${zip}`);
console.log("Envie o conteúdo dele para a pasta pública do servidor.");
