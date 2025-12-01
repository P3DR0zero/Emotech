export class ServiceParaRequisicao {
  constructor(storageAdapter) {
    if(!storageAdapter || typeof storageAdapter.salvarDados !== "function" ) {
      throw new Error("ServiceParaRequisicao precisa de um adapter com o método 'salvar()'")
    }
    this.storage = storageAdapter;
  }
  async processarNovoRegistro(registro) {
    try {
      if(!registro || !registro.emocao){
        throw new Error("Registro inválido recebido no Service.")
      }
      await this.storage.salvarDados(registro);

      return true;
    } catch (erro) {
      console.error("Erro no Service:", erro);
    }
  }
}
