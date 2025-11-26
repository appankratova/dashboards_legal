import React, { useState, useMemo } from 'react';
import { VIOLATIONS_DATA } from './constants';
import { Stats, Violation } from './types';
import FilterBar from './components/FilterBar';
import StatsGrid from './components/StatsGrid';
import DistributionChart from './components/DistributionChart';
import ViolationTable from './components/ViolationTable';
import { ShieldCheck, BarChart3, LayoutDashboard } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="p-2 bg-teal-600 rounded-lg shadow-lg shadow-teal-600/20 text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
                  Анализ штрафов ФАС
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  Event-индустрия
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-medium text-slate-500 w-full md:w-auto justify-end hidden sm:flex">
               <div className="flex items-center gap-2">
                 <LayoutDashboard className="w-4 h-4" />
                 <span>Мониторинг</span>
               </div>
               <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
                 <BarChart3 className="w-4 h-4" />
                 <span>Аналитика</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
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

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-4 w-full">
            <DistributionChart data={filteredViolations} />
          </div>
          
          <div className="xl:col-span-8 w-full">
            <ViolationTable data={filteredViolations} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
