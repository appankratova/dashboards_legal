import React, { useState, useMemo } from 'react';
import { VIOLATIONS_DATA } from './constants';
import { Stats, Violation } from './types';
import FilterBar from './components/FilterBar';
import StatsGrid from './components/StatsGrid';
import DistributionChart from './components/DistributionChart';
import ViolationTable from './components/ViolationTable';

const App: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterEntity, setFilterEntity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredViolations: Violation[] = useMemo(() => {
    return VIOLATIONS_DATA.filter((v) => {
      const matchType = filterType === 'all' || v.type === filterType;
      const matchSeverity = filterSeverity === 'all' || v.severity === filterSeverity;
      const matchEntity = filterEntity === 'all' || v.entity === filterEntity;
      
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = searchQuery === '' || 
        v.name.toLowerCase().includes(searchLower) ||
        v.article.toLowerCase().includes(searchLower);

      return matchType && matchSeverity && matchEntity && matchSearch;
    });
  }, [filterType, filterSeverity, filterEntity, searchQuery]);

  const stats: Stats = useMemo(() => {
    const totalCases = filteredViolations.length;
    if (totalCases === 0) {
      return { totalCases: 0, avgFine: 0, maxFine: 0, totalFines: 0 };
    }

    const fineValues = filteredViolations.map(v => v.fineMax);
    const totalFines = fineValues.reduce((sum, val) => sum + val, 0);
    const maxFine = Math.max(...fineValues);
    const avgFine = Math.round(totalFines / totalCases);

    return { totalCases, avgFine, maxFine, totalFines };
  }, [filteredViolations]);

  return (
    <div className="container">
      <header>
        <h1>Анализ штрафов ФАС в event-сфере</h1>
        <p className="subtitle">Мониторинг нарушений антимонопольного законодательства при организации мероприятий</p>
      </header>

      <FilterBar 
        type={filterType}
        severity={filterSeverity}
        entity={filterEntity}
        search={searchQuery}
        onTypeChange={setFilterType}
        onSeverityChange={setFilterSeverity}
        onEntityChange={setFilterEntity}
        onSearchChange={setSearchQuery}
      />

      <StatsGrid stats={stats} />

      <div className="chart-container">
        <h3 className="chart-title">Распределение по типам нарушений</h3>
        <DistributionChart data={filteredViolations} />
      </div>

      <div className="table-container">
        <h3 className="chart-title">Детальная таблица нарушений</h3>
        <ViolationTable data={filteredViolations} />
      </div>
    </div>
  );
};

export default App;
