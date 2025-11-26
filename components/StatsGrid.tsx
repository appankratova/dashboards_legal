import React from 'react';
import { Stats } from '../types';

interface StatsGridProps {
  stats: Stats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">Всего случаев</div>
        <div className="stat-value">{stats.totalCases}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Средний штраф</div>
        <div className="stat-value">
          {stats.avgFine.toLocaleString('ru-RU')}
          <span className="stat-unit">тыс. ₽</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Максимальный штраф</div>
        <div className="stat-value">
          {stats.maxFine.toLocaleString('ru-RU')}
          <span className="stat-unit">тыс. ₽</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Общая сумма штрафов</div>
        <div className="stat-value">
          {stats.totalFines.toLocaleString('ru-RU')}
          <span className="stat-unit">тыс. ₽</span>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
