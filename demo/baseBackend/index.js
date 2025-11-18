import TwinState from './services/twinState.js';
import { createServer } from './api/server.js';
import { ComunicaAdapter } from './adapters/comunicaAdapters.js';

const PORT = process.env.PORT || 3000;

const twinState = new TwinState();

// inicializa MQTT adapter
const comunica = new ComunicaAdapter(twinState, {
  brokerUrl: 'ws://mqtt.ect.ufrn.br:1884/mqtt',
  topic: 'R/IOT/CTRL',
  clientOptions: {
    username: 'mqtt',
    password: 'lar_mqtt',
    clientId: 'CodigoNossoQueEstasEmC',
    clean: true,
  }
});
comunica.connect();

// inicializa API
const app = createServer(twinState);
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});