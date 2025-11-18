// Este serviço guarda o estado atual dos sensores.
// Ele pode ser atualizado pelo adapter MQTT e consultado pela API.

export default class TwinState {
  constructor() {
    // Guarda o estado dos sensores em memória
    this.state = {};
  }

  // Atualiza o estado de um sensor (chamado pelo adapter MQTT)
  // sensorData esperado: { id: string, ...outrosCampos }
  updateSensorState(sensorData) {
    if (!sensorData || !sensorData.id) return;
    this.state[sensorData.id] = {
      ...(this.state[sensorData.id] || {}),
      ...sensorData,
      updatedAt: new Date().toISOString()
    };
  }

  // Retorna o estado de um sensor específico
  getSensorState(id) {
    return this.state[id] || null;
  }

  // Retorna o estado de todos os sensores
  getAllStates() {
    return Object.values(this.state);
  }
}