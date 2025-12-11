// Este serviço guarda o estado atual do crachá.
// Ele pode ser atualizado pelo adapter MQTT e consultado pela API.
import { RegistroEmocao, TIPO_EMOCAO } from '../model/modeloCracha.js';


export default class crachaState {
  constructor(modeloCracha = RegistroEmocao) {
    this.state = {};
    this.modeloCracha = modeloCracha;
  }

  //Atualiza o estado do crachá com novos dados 
  updateSensorState(sensorData) {
    if (!sensorData || !sensorData.id) return;
    try {
      // Valida usando o modelo
      const registro = new this.modeloCracha(
        sensorData.id,
        sensorData.emocao,
        sensorData.timestamp || new Date()
      );
      
      this.state[sensorData.id] = {
        ...registro.toJSON(),
        updatedAt: new Date().toISOString()
      };
    } catch (err) {
      console.error(`Dados inválidos para sensor ${sensorData.id}:`, err.message);
    }
  }

  // Retorna o estado de um crachá específico
  getSensorState(id) {
    return this.state[id] || null;
  }

  // Retorna o estado de todos os crachás
  getAllStates() {
    return Object.values(this.state);
  }
}