// JavaScript não possui Enums de forma nativa, vou "simular".
const TIPO_EMOCAO = {
  FELIZ: "feliz",
  NEUTRO: "neutro",
  TRISTE: "triste"
};

//Classe para representar o modelo lógico que fiz a anotação:
class RegistroEmocao {
  /**
   * @param {number} id -identificador único
   * @param {string} emocao - Valor da emoção
   * @param {Date|string} timestamp - Momemento que o dado foi recebido
   */
  constructor(id, emocao, timestamp = new Date()) {
    this.id = id;

    if(!Object.values(TIPO_EMOCAO).includes(emocao)) {
      throw new Error("Emoção inválida: ${emocao}. Esperado: ${Object.values(TIPO_EMOCAO).join(",")}");
    }
    this.emocao = emocao;
    this.timestamp = new Date(timestamp);
  }
  //Como foi comentado de usar arquivo JSON, vou deixar aqui um método útil para formatar dados para o dashboard (se não precisarem, so comentar o código)
  toJSON() {
    return {
      id: this.id,
      emocao: this.emocao.toUpperCase(),
      data_hora: this.timestamp.toISOString(),
      hora_legivel: this.timestamp.toLocaleTimeString("pt-BR")
    };
  }
}
