import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 p-5 transition-all hover:shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-slate-100 p-1.5 rounded-md">
          <SlidersHorizontal className="w-4 h-4 text-slate-600" />
        </div>
        <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Параметры поиска</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectGroup label="Тип нарушения" id="violationType" value={type} onChange={onTypeChange}>
          <option value="all">Все нарушения</option>
          <option value="tender">Нарушения при торгах</option>
          <option value="cartel">Картельные сговоры</option>
          <option value="abuse">Злоупотребление</option>
          <option value="unfair">Недобросовестная конкуренция</option>
          <option value="procurement">Закупки 44-ФЗ/223-ФЗ</option>
        </SelectGroup>

        <SelectGroup label="Степень тяжести" id="severity" value={severity} onChange={onSeverityChange}>
          <option value="all">Все уровни</option>
          <option value="high">Высокая (> 200 тыс. ₽)</option>
          <option value="medium">Средняя (50-200 тыс. ₽)</option>
          <option value="low">Низкая (&lt; 50 тыс. ₽)</option>
        </SelectGroup>

        <SelectGroup label="Субъект" id="entity" value={entity} onChange={onEntityChange}>
          <option value="all">Все субъекты</option>
          <option value="legal">Юридические лица</option>
          <option value="official">Должностные лица</option>
        </SelectGroup>

        <div className="group">
          <label htmlFor="search" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
            Поиск
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ключевое слово..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 
                focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white
                hover:border-slate-300 transition-all placeholder:text-slate-400 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 transition-colors group-focus-within:text-teal-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectGroup: React.FC<{
  label: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  children: React.ReactNode;
}> = ({ label, id, value, onChange, children }) => (
  <div className="group">
    <label htmlFor={id} className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-3 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 
          focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white
          hover:border-slate-300 transition-all appearance-none cursor-pointer font-medium"
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  </div>
);

export default FilterBar;
