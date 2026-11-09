export type Sample = { t: number; temp: number; ph: number; co2: number };

const round = (n: number, d = 1) => +n.toFixed(d);

/** mulberry32 — быстрый детерминированный ПСЧ. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function simulateAt(ts: number): Sample {
  const rand = seeded(Math.floor(ts / 1000));
  const d = new Date(ts);
  const h = d.getHours() + d.getMinutes() / 60;

  // 0 — ночь, 1 — пик освещённости (горб с 06:00 до 18:00)
  const light = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI));

  // нагрев от лампы + суточный дрейф + шум датчика ±0.05 °C
  const temp = 24.5 + light * 0.9 + Math.sin((h / 24) * 2 * Math.PI) * 0.2 + (rand() - 0.5) * 0.1;

  // днём pH растёт (фотосинтез выедает CO2), ночью падает
  const ph = 6.8 + light * 0.22 - (1 - light) * 0.15 + (rand() - 0.5) * 0.04;

  // соленоид держит ~30 ppm днём; ночью подача закрыта, CO2 растёт от дыхания
  const injecting = h >= 9 && h < 17;
  const co2 = injecting
    ? 30 + (rand() - 0.5) * 2.5
    : 12 + (1 - light) * 6 + (rand() - 0.5) * 1.5;

  return { t: ts, temp: round(temp), ph: round(ph, 2), co2: Math.round(co2) };
}

/** История за последние `hours` часов с шагом `stepMin` минут. */
export function history(hours = 24, stepMin = 5, now = Date.now()): Sample[] {
  const step = stepMin * 60_000;
  const start = Math.floor((now - hours * 3_600_000) / step) * step;
  const out: Sample[] = [];
  for (let t = start; t <= now; t += step) out.push(simulateAt(t));
  return out;
}