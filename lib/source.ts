import { history, simulateAt, type Sample } from './telemetry';

export interface TelemetrySource {
  backfill(hours: number): Promise<Sample[]>;
  subscribe(onSample: (s: Sample) => void): () => void;
}

export class MockSource implements TelemetrySource {
  constructor(private tickMs = 5000) {}
  async backfill(hours: number) { 
    return history(hours, 5); 
  }
  subscribe(onSample: (s: Sample) => void) {
    const id = setInterval(() => onSample(simulateAt(Date.now())), this.tickMs);
    return () => clearInterval(id);
  }
}

export class WebSocketSource implements TelemetrySource {
  constructor(private url: string) {}
  async backfill(hours: number) {
    // Заглушка для реального API
    const r = await fetch(`${this.url}/history?hours=${hours}`);
    return r.json();
  }
  subscribe(onSample: (s: Sample) => void) {
    const ws = new WebSocket(this.url);
    ws.onmessage = (e) => onSample(JSON.parse(e.data));
    return () => ws.close();
  }
}

// Глобальный экземпляр (в реальном проекте создаётся через Context)
export const telemetrySource = new MockSource(5000);