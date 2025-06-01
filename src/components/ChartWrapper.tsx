import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { memo } from 'react';
import type { ChartProps } from '../types';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedIds } from '../store/slices/transformerSlice';
import { Checkbox } from "antd";

const randomColors = ['#FF0000', "#FFA500", "#4B0082", "#008000", "#0000FF"]

const ChartWrapper: React.FC<ChartProps> = memo(({ data }) => {
  const dispatch = useAppDispatch();
  const { selectedIds } = useAppSelector(state => state.transformers);

  const handleCheckboxToggle = (id: number) => {
    dispatch(setSelectedIds(id));
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
          <Checkbox
            key={transformer.assetId}
            name={transformer.name}
            checked={selectedIds?.includes(transformer.assetId)}
            onChange={() => handleCheckboxToggle(transformer.assetId)}
          >{transformer.name}
          </Checkbox>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data
            .filter(t => selectedIds?.includes(t.assetId))
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