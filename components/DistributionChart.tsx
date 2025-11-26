import React from 'react';
import { Violation, ViolationType } from '../types';
import { TYPE_LABELS } from '../constants';

interface DistributionChartProps {
  data: Violation[];
}

const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  const chartData = React.useMemo(() => {
    const typeCount: Record<string, number> = {};
    data.forEach(v => {
      typeCount[v.type] = (typeCount[v.type] || 0) + 1;
    });

    const sortedTypes = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
    const maxCount = Math.max(...sortedTypes.map(t => t[1]), 1); // Avoid div by zero

    return sortedTypes.map(([type, count]) => ({
      type: type as ViolationType,
      count,
      percentage: (count / maxCount) * 100
    }));
  }, [data]);

  return (
    <div className="bar-chart">
      {chartData.length > 0 ? (
        chartData.map((item) => (
          <div key={item.type} className="bar-item">
            <div className="bar-label">{TYPE_LABELS[item.type]}</div>
            <div className="bar-wrapper">
              <div className="bar-fill" style={{ width: `${item.percentage}%` }}>
                <span className="bar-value">{item.count}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">Нет данных для отображения</div>
      )}
    </div>
  );
};

export default DistributionChart;
