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
        icon={FileText}
        color="teal"
        trend="+2"
      />
      <StatCard
        label="Средний штраф"
        value={stats.avgFine.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={Scale}
        color="blue"
      />
      <StatCard
        label="Макс. штраф"
        value={stats.maxFine.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={Gavel}
        color="orange"
      />
      <StatCard
        label="Общая сумма"
        value={stats.totalFines.toLocaleString('ru-RU')}
        unit="тыс. ₽"
        icon={Coins}
        color="emerald"
        isTotal
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: React.ElementType;
  color: 'teal' | 'blue' | 'orange' | 'emerald';
  trend?: string;
  isTotal?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, icon: Icon, color, trend, isTotal }) => {
  const styles = {
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', ring: 'ring-teal-500/10' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-500/10' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-500/10' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-500/10' },
  };

  const style = styles[color];

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 p-5 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      {isTotal && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-100/50 to-transparent -mr-4 -mt-4 rounded-bl-3xl" />
      )}
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} ring-1 ring-inset ${style.ring} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-1.5 relative z-10">
        <span className="text-3xl font-bold text-slate-900 tracking-tight leading-none">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-500">{unit}</span>}
      </div>
      
      {trend && (
        <div className="mt-2 text-xs font-medium text-teal-600 flex items-center gap-1">
          <span>↑ {trend} за последний месяц</span>
        </div>
      )}
    </div>
  );
};

export default StatsGrid;
