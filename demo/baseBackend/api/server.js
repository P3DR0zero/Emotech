// Esta API permite consultar o estado dos sensores via HTTP.

import express from 'express';
import cors from 'cors';

export function createServer(twinState) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Endpoint para consultar todos os sensores
  app.get('/sensors', (req, res) => {
    res.json(twinState.getAllStates());
  });

  // Endpoint para consultar um sensor específico
  app.get('/sensors/:id', (req, res) => {
    const sensor = twinState.getSensorState(req.params.id);
    if (sensor) return res.json(sensor);
    return res.status(404).json({ error: 'Sensor não encontrado' });
  });

  // health check
  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  return app;
}