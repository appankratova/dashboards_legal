import React, { useState, useMemo } from 'react';
import { VIOLATIONS_DATA } from './constants';
import { Stats, Violation } from './types';
import FilterBar from './components/FilterBar';
import StatsGrid from './components/StatsGrid';
import DistributionChart from './components/DistributionChart';
import ViolationTable from './components/ViolationTable';
import { ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header Section with Gradient Background */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-2.5 bg-teal-600 rounded-xl shadow-lg shadow-teal-600/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Анализ штрафов ФАС в event-сфере
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Мониторинг нарушений антимонопольного законодательства
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
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

        {/* Content Area - Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Chart Column - Takes 1/3 on large screens */}
          <div className="xl:col-span-1 w-full">
            <DistributionChart data={filteredViolations} />
          </div>
          
          {/* Table Column - Takes 2/3 on large screens */}
          <div className="xl:col-span-2 w-full">
            <ViolationTable data={filteredViolations} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default App;
