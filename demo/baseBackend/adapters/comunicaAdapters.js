import mqtt from 'mqtt';
import { salvarDados } from './fileStorageAdapter.js';

/**
 * ComunicaAdapter: adapter MQTT que recebe mensagens e repassa ao TwinState.
 * Instancie passando a instância de TwinState no construtor.
 */
export class ComunicaAdapter {
  constructor(crachaState, options = {}) {
    this.crachaState = crachaState;
    this.brokerUrl = options.brokerUrl || 'ws://mqtt.ect.ufrn.br:1884/mqtt';
    this.topic = options.topic || 'emtch/cracha';
    this.clientOptions = options.clientOptions || {
      username: 'mqtt',
      password: 'lar_mqtt',
      clientId: 'CodigoNossoQueEstasEmC',
      clean: true,
    };
    this.client = null;
  }

  connect() {
    this.client = mqtt.connect(this.brokerUrl, this.clientOptions);
    this.client.on('connect', () => {
      console.log('✅ Conectado ao MQTT');
      this.client.subscribe(this.topic, (err) => {
        if (err) console.error('Erro ao assinar tópico MQTT:', err);
      });
    });
    this.client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        // garantir campo id: 1) payload.id 2) derived from topic 3) fallback timestamp
        if (!data.id) {
          // tenta derivar do tópico (ex: sensors/mpu/01 => mpu-01)
          const parts = topic.split('/');
          if (parts.length >= 2) {
            data.id = parts.slice(-2).join('-'); // ajuste conforme seu padrão de tópico
          } else {
            data.id = `sensor-${Date.now()}`;
          }
        }
        if (this.crachaState && typeof this.crachaState.updateSensorState === 'function') {
          this.crachaState.updateSensorState(data);
        }
        salvarDados(data).catch((e) => console.error('Erro salvarDados:', e));
        console.log('📦 Recebido:', data);
      } catch (err) {
        console.error('Erro ao processar mensagem MQTT:', err);
      }
    });
    this.client.on('error', (err) => {
      console.error('MQTT error:', err);
    });
  }
  // opcional: método para desconectar
  disconnect() {
    if (this.client) this.client.end();
  }
}