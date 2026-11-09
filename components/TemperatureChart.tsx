'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', temp: 24.2 },
  { time: '04:00', temp: 24.1 },
  { time: '08:00', temp: 24.4 },
  { time: '12:00', temp: 24.9 },
  { time: '16:00', temp: 25.2 },
  { time: '20:00', temp: 24.7 },
  { time: '23:00', temp: 24.3 },
];

export default function TemperatureChart() {
  return (
    <div className="h-full w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7A9B76" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#7A9B76" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222922" vertical={false} />
          <XAxis dataKey="time" stroke="#6B7365" fontSize={12} tickLine={false} axisLine={false} dy={10} />
          <YAxis stroke="#6B7365" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111511', border: '1px solid #222922', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
            labelStyle={{ color: '#E5E7E3', fontWeight: 'bold', marginBottom: '4px' }}
            itemStyle={{ color: '#7A9B76' }}
            cursor={{ stroke: '#222922', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area type="monotone" dataKey="temp" stroke="#7A9B76" strokeWidth={2.5} fill="url(#colorTemp)" activeDot={{ r: 5, fill: '#E5E7E3', stroke: '#7A9B76', strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}