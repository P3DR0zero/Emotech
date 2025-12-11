import mqtt from 'mqtt';
import { salvarDados } from './fileStorageAdapter.js';

/**
 * ComunicaAdapter: adapter MQTT que recebe mensagens e repassa ao TwinState.
 * Instancie passando a instância de TwinState no construtor.
 */
export class ComunicaAdapter {
  constructor(service, crachaState) {
    this.service = service;
    this.crachaState = crachaState;
    
    this.MAPA_HARDWARE = {
      0: TIPO_EMOCAO.FELIZ,
      1: TIPO_EMOCAO.NEUTRO,
      2: TIPO_EMOCAO.TRISTE
    }

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
        const dataBruta = JSON.parse(message.toString());

        // garantir campo id: 1) payload.id 2) derived from topic 3) fallback timestamp
        if (!dataBruta.id) {
          // tenta derivar do tópico (ex: sensors/mpu/01 => mpu-01)
          const parts = topic.split('/');
          if (parts.length >= 2) {
            dataBruta.id = parts.slice(-2).join('-'); // ajuste conforme seu padrão de tópico
          } else {
            dataBruta.id = `sensor-${Date.now()}`;
          }
        }
        if (this.crachaState && typeof this.crachaState.updateSensorState === 'function') {
          this.crachaState.updateSensorState(dataBruta);
        }

        const emocaoTraduzida = this.MAPA_HARDWARE[dataBruta.emocao];

        if (emocaoTraduzida) {
          const novoRegistro = new RegistroEmocao(
            dataBruta.id,
            emocaoTraduzida,
            new Date()
          );

          await this.service.processarNovoRegistro(novoRegistro);
        } else {
          console.warn("Emoção desconhecida ignorada no salvamento.")
        }

        
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
    if (this.client){
      this.client.end();
    }
  }
}
