import fs from 'fs/promises';
import path from 'path';

export async function salvarDados(dadosJson) {
  try {
    const diretorio = path.join(process.cwd(), 'dados_salvos');
    await fs.mkdir(diretorio, { recursive: true });

    const nomeArquivo = `dados_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const caminhoCompleto = path.join(diretorio, nomeArquivo);

    const dadosString = JSON.stringify(dadosJson, null, 2);
    await fs.writeFile(caminhoCompleto, dadosString);

    console.log(`💾 Dados salvos com sucesso em: ${caminhoCompleto}`);
  } catch (err) {
    console.error("Erro ao salvar dados:", err);
  }
}