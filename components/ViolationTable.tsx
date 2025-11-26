import React from 'react';
import { Violation } from '../types';
import { TYPE_LABELS, ENTITY_LABELS, SEVERITY_LABELS } from '../constants';
import { User, Building2, List } from 'lucide-react';

interface ViolationTableProps {
  data: Violation[];
}

const ViolationTable: React.FC<ViolationTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center h-full">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <List className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">Ничего не найдено</h3>
        <p className="text-slate-500">Попробуйте изменить параметры фильтрации</p>
      </div>
    );
  }

  const getSeverityStyles = (s: string) => {
    switch (s) {
      case 'high': return 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/10';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/10';
      case 'low': return 'bg-teal-50 text-teal-700 border-teal-100 ring-teal-500/10';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-teal-600" />
          <h3 className="text-base font-semibold text-slate-800">Детальный реестр</h3>
        </div>
        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
          {data.length} записей
        </span>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/80 backdrop-blur sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-1/3">Нарушение</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Тип</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Субъект</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Штраф (ЮЛ)</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Степень</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900 font-medium leading-snug mb-1">{row.name}</div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-mono">
                    {row.article}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {TYPE_LABELS[row.type]}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                   <div className="flex items-center gap-2">
                     {row.entity === 'legal' ? <Building2 className="w-4 h-4 text-slate-400"/> : <User className="w-4 h-4 text-slate-400"/>}
                     {ENTITY_LABELS[row.entity]}
                   </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 font-medium text-right font-mono">
                  {row.fineLegal}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ring-1 ring-inset ${getSeverityStyles(row.severity)}`}>
                    {SEVERITY_LABELS[row.severity]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-100">
        {data.map((row, idx) => (
          <div key={idx} className="p-5 space-y-4 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start gap-3">
              <h4 className="text-sm font-semibold text-slate-900 leading-snug">{row.name}</h4>
              <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border tracking-wider ${getSeverityStyles(row.severity)}`}>
                {SEVERITY_LABELS[row.severity]}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Тип</span>
                <span className="text-slate-700 font-medium">{TYPE_LABELS[row.type]}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Статья</span>
                <span className="text-slate-600 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{row.article}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
               <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    {row.entity === 'legal' ? <Building2 className="w-3.5 h-3.5"/> : <User className="w-3.5 h-3.5"/>}
                    Субъект
                  </span>
                  <span className="text-slate-900 font-medium">{ENTITY_LABELS[row.entity]}</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Штраф (ЮЛ)</span>
                  <span className="text-slate-900 font-bold font-mono">{row.fineLegal}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViolationTable;
