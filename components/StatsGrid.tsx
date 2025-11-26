import React from 'react';
import { Stats } from '../types';
import { AlertCircle, Scale, Gavel, Wallet } from 'lucide-react';

interface StatsGridProps {
  stats: Stats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Всего случаев"
        value={stats.totalCases.toString()}
        icon={<AlertCircle className="w-5 h-5 text-teal-600" />}
      />
      <StatCard
        label="Средний штраф"
        value={stats.avgFine.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={<Scale className="w-5 h-5 text-teal-600" />}
      />
      <StatCard
        label="Максимальный штраф"
        value={stats.maxFine.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={<Gavel className="w-5 h-5 text-teal-600" />}
      />
      <StatCard
        label="Общая сумма"
        value={stats.totalFines.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={<Wallet className="w-5 h-5 text-teal-600" />}
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
      <div className="p-2 bg-teal-50 rounded-lg">{icon}</div>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold text-slate-800">{value}</span>
      {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
    </div>
  </div>
);

export default StatsGrid;
