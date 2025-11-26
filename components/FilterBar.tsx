import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  type: string;
  severity: string;
  entity: string;
  search: string;
  onTypeChange: (val: string) => void;
  onSeverityChange: (val: string) => void;
  onEntityChange: (val: string) => void;
  onSearchChange: (val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  type,
  severity,
  entity,
  search,
  onTypeChange,
  onSeverityChange,
  onEntityChange,
  onSearchChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4 text-slate-500">
        <Filter className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">Фильтры</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="violationType" className="text-xs font-medium text-slate-700">Тип нарушения</label>
          <select
            id="violationType"
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors cursor-pointer"
          >
            <option value="all">Все нарушения</option>
            <option value="tender">Нарушения при проведении торгов</option>
            <option value="cartel">Картельные сговоры</option>
            <option value="abuse">Злоупотребление доминирующим положением</option>
            <option value="unfair">Недобросовестная конкуренция</option>
            <option value="procurement">Закупки по 44-ФЗ/223-ФЗ</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="severity" className="text-xs font-medium text-slate-700">Степень тяжести</label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors cursor-pointer"
          >
            <option value="all">Все уровни</option>
            <option value="high">Высокая (&gt; 200 тыс. ₽)</option>
            <option value="medium">Средняя (50-200 тыс. ₽)</option>
            <option value="low">Низкая (&lt; 50 тыс. ₽)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="entity" className="text-xs font-medium text-slate-700">Субъект ответственности</label>
          <select
            id="entity"
            value={entity}
            onChange={(e) => onEntityChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors cursor-pointer"
          >
            <option value="all">Все субъекты</option>
            <option value="legal">Юридические лица</option>
            <option value="official">Должностные лица</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="search" className="text-xs font-medium text-slate-700">Поиск</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Поиск по описанию..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
