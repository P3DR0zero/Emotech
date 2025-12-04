import fs from 'fs/promises';
import path from 'path';

export class FileStorageAdapter {
  // Método que vai precisar estar dentro da classe, nele terá os métodos para salvar os dados.
  async salvarDados(dadosJSON){
    try {
      const diretorio = path.join(process.cwd(), 'dados_salvos');

      //Vai criar a pasta caso não exista:
      await fs.mkdir(diretorio, {recursive: true});

      //O nome do arquivo será baseado na data, mas deve ter cuidado, pois cria um arquivo por requisição. Acredito que seja possível melhorar:
      const nomeArquivo = `dados_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      const caminhoCompleto = path.join(diretorio, nomeArquivo);

      const dadosString = JSON.stringify(dadosJson, null, 2);
      await fs.writeFile(caminhoCompleto, dadosString);

      console.log(`[Adapter] Dados salvos em: ${caminhoCompleto}`);
    } catch (err) {
      console.error("Erro ao salvar dados:", err);
      throw err; //Tá jogando o erro pro Service saber que falhou.
    }
  }
}
