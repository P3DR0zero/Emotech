//Importações (Note que crachaState é export default, sem chaves)
import crachaState from './services/crachaState.js'; 
import { createServer } from './api/server.js';
import { ComunicaAdapter } from './adapters/comunicaAdapters.js';
import { FileStorageAdapter } from './adapters/fileStorageAdapter.js';
import { ServiceParaRequisicao } from './services/ServiceParaRequisicao.js';

// --- CONFIGURAÇÃO DA MEMÓRIA COMPARTILHADA (Twin State) ---
// Criei a instância que vai guardar o estado atual dos sensores na RAM.
// Ela será passada tanto para o MQTT (quem escreve) quanto para a API (quem lê).
const estadoGlobal = new crachaState();


// --- CONFIGURAÇÃO DO BACKEND ---
const storage = new FileStorageAdapter();
const service = new ServiceParaRequisicao(storage);


// --- CONFIGURAÇÃO DA API (Express) ---
// Passei o 'estadoGlobal' para o server.js. 
// Lá dentro ele é recebido com o nome 'twinState'.
const app = createServer(estadoGlobal);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor API rodando na porta ${PORT}`);
});


// --- CONFIGURAÇÃO DO HARDWARE (MQTT) ---
// Injetei as duas dependências:
// 1. service: Para salvar histórico no arquivo.
// 2. estadoGlobal: Para atualizar a UI/API em tempo real.
const mqttAdapter = new ComunicaAdapter(service, estadoGlobal);

mqttAdapter.connect();
