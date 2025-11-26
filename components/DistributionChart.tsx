import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { Violation, ViolationType } from '../types';
import { TYPE_LABELS } from '../constants';
import { BarChart3 } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-teal-600" />
        <h3 className="text-base font-semibold text-slate-800">Распределение нарушений</h3>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        {aggregated.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={aggregated}
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={150} 
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc', opacity: 0.8 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-slate-200 shadow-lg rounded-lg p-3">
                        <p className="text-sm font-medium text-slate-800">{payload[0].payload.name}</p>
                        <p className="text-teal-600 font-bold mt-1">
                          {payload[0].value} случаев
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
                {aggregated.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill="#0d9488" fillOpacity={0.8 + (index * 0.05)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            Нет данных для отображения
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionChart;
