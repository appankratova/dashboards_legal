import React from 'react';
import { Violation } from '../types';
import { TYPE_LABELS, ENTITY_LABELS, SEVERITY_LABELS } from '../constants';
import { AlertTriangle, User, Building2 } from 'lucide-react';

interface ViolationTableProps {
  data: Violation[];
}

const ViolationTable: React.FC<ViolationTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-12 text-center text-slate-500">
        Нарушения по заданным критериям не найдены
      </div>
    );
  }

  const getSeverityColor = (s: string) => {
    switch (s) {
      case 'high': return 'bg-red-50 text-red-700 border-red-100';
      case 'medium': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'low': return 'bg-teal-50 text-teal-700 border-teal-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col flex-1 min-h-0">
      <div className="p-5 border-b border-stone-200 bg-white sticky top-0 z-20">
        <h3 className="text-base font-semibold text-slate-800">Детальная таблица нарушений</h3>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-auto custom-scrollbar flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200">Нарушение</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200">Тип</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200">Субъект</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200">Статья КоАП</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200 text-right">Штраф (ЮЛ)</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200 text-right">Штраф (ДЛ)</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-stone-200">Степень</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-stone-50 transition-colors">
                <td className="px-5 py-4 text-sm text-slate-800 font-medium max-w-xs">{row.name}</td>
                <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{TYPE_LABELS[row.type]}</td>
                <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap flex items-center gap-2">
                   {row.entity === 'legal' ? <Building2 className="w-3 h-3 opacity-50"/> : <User className="w-3 h-3 opacity-50"/>}
                   {ENTITY_LABELS[row.entity]}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600 font-mono text-xs whitespace-nowrap">{row.article}</td>
                <td className="px-5 py-4 text-sm text-slate-600 text-right whitespace-nowrap">{row.fineLegal}</td>
                <td className="px-5 py-4 text-sm text-slate-600 text-right whitespace-nowrap">{row.fineOfficial}</td>
                <td className="px-5 py-4 text-sm whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(row.severity)}`}>
                    {SEVERITY_LABELS[row.severity]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-stone-100">
        {data.map((row, idx) => (
          <div key={idx} className="p-4 space-y-3">
            <div className="flex justify-between items-start gap-3">
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">{row.name}</h4>
              <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${getSeverityColor(row.severity)}`}>
                {SEVERITY_LABELS[row.severity]}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Тип нарушения</span>
                <span className="text-slate-700 font-medium">{TYPE_LABELS[row.type]}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Статья</span>
                <span className="text-slate-700 font-mono bg-stone-100 px-1.5 py-0.5 rounded">{row.article}</span>
              </div>
              
              <div className="col-span-2 pt-2 border-t border-stone-100 mt-1 flex flex-col gap-1">
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500">Субъект:</span>
                    <span className="text-slate-700 font-medium flex items-center gap-1">
                        {row.entity === 'legal' ? <Building2 className="w-3 h-3"/> : <User className="w-3 h-3"/>}
                        {ENTITY_LABELS[row.entity]}
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500">Штраф (ЮЛ):</span>
                    <span className="text-slate-800 font-medium">{row.fineLegal}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500">Штраф (ДЛ):</span>
                    <span className="text-slate-800 font-medium">{row.fineOfficial}</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViolationTable;
