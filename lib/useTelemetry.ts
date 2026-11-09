'use client';

import { useEffect, useState } from 'react';
import { history, simulateAt, type Sample } from './telemetry';
import { telemetrySource } from './source';

const TICK_MS = 5000;

export function useTelemetry() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Бэкфилл только на клиенте: сервер не знает местное время
    telemetrySource.backfill(24).then((data) => {
      setSamples(data);
      setReady(true);
    });

    const id = setInterval(() => {
      setSamples((prev) => {
        const next = [...prev, simulateAt(Date.now())];
        return next.length > 288 ? next.slice(-288) : next;
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  return { samples, last: samples[samples.length - 1], ready };
}