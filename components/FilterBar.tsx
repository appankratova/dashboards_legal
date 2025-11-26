import React from 'react';

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
    <div className="filters">
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="violationType">Тип нарушения</label>
          <select id="violationType" value={type} onChange={(e) => onTypeChange(e.target.value)}>
            <option value="all">Все нарушения</option>
            <option value="tender">Нарушения при проведении торгов</option>
            <option value="cartel">Картельные сговоры</option>
            <option value="abuse">Злоупотребление доминирующим положением</option>
            <option value="unfair">Недобросовестная конкуренция</option>
            <option value="procurement">Закупки по 44-ФЗ/223-ФЗ</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="severity">Степень тяжести</label>
          <select id="severity" value={severity} onChange={(e) => onSeverityChange(e.target.value)}>
            <option value="all">Все уровни</option>
            <option value="high">Высокая (&gt; 200 тыс. ₽)</option>
            <option value="medium">Средняя (50-200 тыс. ₽)</option>
            <option value="low">Низкая (&lt; 50 тыс. ₽)</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="entity">Субъект ответственности</label>
          <select id="entity" value={entity} onChange={(e) => onEntityChange(e.target.value)}>
            <option value="all">Все субъекты</option>
            <option value="legal">Юридические лица</option>
            <option value="official">Должностные лица</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="searchInput">Поиск по описанию</label>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Введите ключевое слово..." 
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
