import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Violation, ViolationType } from '../types';
import { TYPE_LABELS } from '../constants';

interface DistributionChartProps {
  data: Violation[];
}

const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  // Aggregate data
  const aggregated = React.useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(v => {
      counts[v.type] = (counts[v.type] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([type, count]) => ({
        type: type as ViolationType,
        name: TYPE_LABELS[type as ViolationType],
        count
      }))
      .sort((a, b) => b.count - a.count);
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
      <h3 className="text-base font-semibold text-slate-800 mb-6">Распределение по типам нарушений</h3>
      
      <div className="h-[300px] w-full">
        {aggregated.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={aggregated}
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={200} 
                tick={{ fontSize: 12, fill: '#475569' }} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '8px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                {aggregated.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill="#0d9488" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            Нет данных для отображения
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionChart;
