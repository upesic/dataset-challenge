import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useState, memo } from 'react';
import type { ChartProps } from '../types';
import dayjs from 'dayjs';
import CheckboxField from './CheckboxField';

const randomColors = ['#FF0000', "#FFA500", "#4B0082", "#008000", "#0000FF"]

const ChartWrapper: React.FC<ChartProps> = memo(({ data }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('selectedIds');
    return saved ? JSON.parse(saved) : data.map(t => t.assetId);
  });

  // Optional: Sync selection across tabs using localStorage 'storage' event
  // Commented out intentionally to preserve independent transformer selections per tab
  // Uncomment and import useEffect if consistent cross-tab state is preferred UX-wise

  /* useEffect(() => {
     const syncSelection = (e: StorageEvent) => {
       if (e.key === 'selectedIds') {
         const newVal = e.newValue ? JSON.parse(e.newValue) : [];
         setSelectedIds(newVal);
       }
     };
 
     window.addEventListener('storage', syncSelection);
     return () => window.removeEventListener('storage', syncSelection);
   }, []);
   */

  const handleCheckboxToggle = (id: number) => {
    setSelectedIds(prev => {
      const updated = prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id];

      localStorage.setItem('selectedIds', JSON.stringify(updated));
      return updated;
    });
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
    <div className='shadow-md rounded-[5px]'>
      <h3 className='text-2xl font-bold m-2'>Transformers chart</h3>
      <div className="flex flex-wrap gap-4 p-4">
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