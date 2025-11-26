import React from 'react';
import { Stats } from '../types';
import { FileText, Scale, Gavel, Coins } from 'lucide-react';

interface StatsGridProps {
  stats: Stats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Всего случаев"
        value={stats.totalCases.toString()}
        icon={<FileText className="w-5 h-5 text-teal-600" />}
        color="teal"
      />
      <StatCard
        label="Средний штраф"
        value={stats.avgFine.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={<Scale className="w-5 h-5 text-blue-600" />}
        color="blue"
      />
      <StatCard
        label="Макс. штраф"
        value={stats.maxFine.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={<Gavel className="w-5 h-5 text-orange-600" />}
        color="orange"
      />
      <StatCard
        label="Общая сумма"
        value={stats.totalFines.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={<Coins className="w-5 h-5 text-emerald-600" />}
        color="emerald"
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
  color: 'teal' | 'blue' | 'orange' | 'emerald';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, icon, color }) => {
  const bgColors = {
    teal: 'bg-teal-50',
    blue: 'bg-blue-50',
    orange: 'bg-orange-50',
    emerald: 'bg-emerald-50',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">
          {label}
        </span>
        <div className={`p-2.5 rounded-lg ${bgColors[color]} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
      </div>
    </div>
  );
};

export default StatsGrid;
