import React, { useState, useMemo } from 'react';
import { VIOLATIONS_DATA } from './constants';
import { Stats, Violation } from './types';
import FilterBar from './components/FilterBar';
import StatsGrid from './components/StatsGrid';
import DistributionChart from './components/DistributionChart';
import ViolationTable from './components/ViolationTable';
import { ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  // State for filters
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterEntity, setFilterEntity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
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

  // Stats Calculation
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
    <div className="min-h-screen flex flex-col max-w-[1400px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-900">
      
      {/* Header */}
      <header className="mb-8 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-600 rounded-lg shadow-sm">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Анализ штрафов ФАС в event-сфере
          </h1>
        </div>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed pl-[52px]">
          Мониторинг и аналитика нарушений антимонопольного законодательства при организации мероприятий, проведении торгов и закупок.
        </p>
      </header>

      {/* Main Controls */}
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

      {/* Stats Dashboard */}
      <StatsGrid stats={stats} />

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 flex-1 min-h-0">
        {/* Chart Column */}
        <div className="lg:col-span-1">
          <DistributionChart data={filteredViolations} />
        </div>
        
        {/* Table Column */}
        <div className="lg:col-span-2 flex flex-col min-h-[500px] lg:min-h-0">
          <ViolationTable data={filteredViolations} />
        </div>
      </div>

    </div>
  );
};

export default App;
