import TwinState from './services/crachaState.js';
import { createServer } from './api/server.js';
import { ComunicaAdapter } from './adapters/comunicaAdapters.js';

const PORT = process.env.PORT || 3000;

const crachaState = new crachaState();

// inicializa MQTT adapter
const comunica = new ComunicaAdapter(crachaState, {
  brokerUrl: 'ws://mqtt.ect.ufrn.br:1884/mqtt',
  topic: 'emtch/cracha',
  clientOptions: {
    username: 'mqtt',
    password: 'lar_mqtt',
    clientId: 'CodigoNossoQueEstasEmC',
    clean: true,
  }
});
comunica.connect();

// inicializa API
const app = createServer(crachaState);
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});