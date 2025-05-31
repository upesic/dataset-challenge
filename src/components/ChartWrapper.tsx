import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useState, memo } from 'react';
import type { Transformer } from '../types';
import dayjs from 'dayjs';
import CheckboxField from './CheckboxField';

const randomColors = ['#FF0000', "#FFA500", "#4B0082", "#008000", "#0000FF"]

const ChartWrapper = memo(({ data }: { data: Transformer[] }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(data.map(t => t.assetId));

  const handleCheckboxToggle = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const allTimestamps = Array.from(
    new Set(
      data.flatMap(t =>
        t.lastTenVoltgageReadings.map(r => r.timestamp)
      )
    )
  ).sort();

  const chartData = allTimestamps.map((timestamp) => {
    const entry: { timestamp: string;[key: string]: number | string } = {
      timestamp: dayjs(timestamp).format('DD.MM.YYYY'),
    };

    data.forEach((t) => {
      const reading = t.lastTenVoltgageReadings.find(r => r.timestamp === timestamp);
      if (reading) {
        entry[t.name] = Number(reading.voltage);
      }
    });

    return entry;
  });

  return (
    <div>
      <h3 className='text-2xl font-bold mb-2'>Transformers chart</h3>
      <div className="flex flex-wrap gap-4 mb-4">
        {data.map(transformer => (
          <CheckboxField
            key={transformer.assetId}
            name={transformer.name}
            label={transformer.name}
            labelClassName={'text-[#449ed8]'}
            checked={selectedIds.includes(transformer.assetId)}
            onChange={() => handleCheckboxToggle(transformer.assetId)} />
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data
            .filter(t => selectedIds.includes(t.assetId))
            .map((t, index) => (
              <Line
                key={t.assetId}
                type="monotone"
                dataKey={t.name}
                stroke={randomColors[index]}
                dot={false}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default ChartWrapper;