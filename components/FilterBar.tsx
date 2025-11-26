import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
        <SlidersHorizontal className="w-4 h-4 text-teal-600" />
        <span className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Параметры фильтрации</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="group">
          <label htmlFor="violationType" className="block text-xs font-medium text-slate-500 mb-1.5 group-hover:text-teal-600 transition-colors">
            Тип нарушения
          </label>
          <div className="relative">
            <select
              id="violationType"
              value={type}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 hover:border-slate-300 transition-all appearance-none cursor-pointer"
            >
              <option value="all">Все нарушения</option>
              <option value="tender">Нарушения при торгах</option>
              <option value="cartel">Картельные сговоры</option>
              <option value="abuse">Злоупотребление</option>
              <option value="unfair">Недобросовестная конкуренция</option>
              <option value="procurement">Закупки 44-ФЗ/223-ФЗ</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="severity" className="block text-xs font-medium text-slate-500 mb-1.5 group-hover:text-teal-600 transition-colors">
            Степень тяжести
          </label>
          <div className="relative">
            <select
              id="severity"
              value={severity}
              onChange={(e) => onSeverityChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 hover:border-slate-300 transition-all appearance-none cursor-pointer"
            >
              <option value="all">Все уровни</option>
              <option value="high">Высокая (> 200 тыс. ₽)</option>
              <option value="medium">Средняя (50-200 тыс. ₽)</option>
              <option value="low">Низкая (&lt; 50 тыс. ₽)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="entity" className="block text-xs font-medium text-slate-500 mb-1.5 group-hover:text-teal-600 transition-colors">
            Субъект
          </label>
          <div className="relative">
            <select
              id="entity"
              value={entity}
              onChange={(e) => onEntityChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 hover:border-slate-300 transition-all appearance-none cursor-pointer"
            >
              <option value="all">Все субъекты</option>
              <option value="legal">Юридические лица</option>
              <option value="official">Должностные лица</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="search" className="block text-xs font-medium text-slate-500 mb-1.5 group-hover:text-teal-600 transition-colors">
            Поиск по описанию
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ключевое слово..."
              className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 hover:border-slate-300 transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 group-hover:text-teal-500 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
