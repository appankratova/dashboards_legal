import React from 'react';
import { Violation } from '../types';
import { TYPE_LABELS, ENTITY_LABELS, SEVERITY_LABELS } from '../constants';

interface ViolationTableProps {
  data: Violation[];
}

const ViolationTable: React.FC<ViolationTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="no-results">
        Нарушения по заданным критериям не найдены
      </div>
    );
  }

  return (
    <>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Нарушение</th>
              <th>Тип</th>
              <th>Субъект</th>
              <th>Статья КоАП</th>
              <th>Штраф (юр. лицо)</th>
              <th>Штраф (долж. лицо)</th>
              <th>Степень</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>{TYPE_LABELS[row.type]}</td>
                <td>{ENTITY_LABELS[row.entity]}</td>
                <td>{row.article}</td>
                <td>{row.fineLegal}</td>
                <td>{row.fineOfficial}</td>
                <td>
                  <span className={`severity-badge severity-${row.severity}`}>
                    {SEVERITY_LABELS[row.severity]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View (Styled via CSS display properties) */}
      <div id="mobileCardView">
          {data.map((row, idx) => (
              <div key={idx} className="mobile-card-row">
                  <div className="card-row-header">{row.name}</div>
                  <div className="card-row-item">
                      <span className="card-row-label">Тип:</span>
                      <span className="card-row-value">{TYPE_LABELS[row.type]}</span>
                  </div>
                  <div className="card-row-item">
                      <span className="card-row-label">Субъект:</span>
                      <span className="card-row-value">{ENTITY_LABELS[row.entity]}</span>
                  </div>
                  <div className="card-row-item">
                      <span className="card-row-label">Статья:</span>
                      <span className="card-row-value">{row.article}</span>
                  </div>
                  <div className="card-row-item">
                      <span className="card-row-label">Штраф (ЮЛ):</span>
                      <span className="card-row-value">{row.fineLegal}</span>
                  </div>
                  <div className="card-row-item">
                      <span className="card-row-label">Штраф (ДЛ):</span>
                      <span className="card-row-value">{row.fineOfficial}</span>
                  </div>
                  <div className="card-row-item">
                      <span className="card-row-label">Степень:</span>
                      <span className="card-row-value">
                        <span className={`severity-badge severity-${row.severity}`}>
                           {SEVERITY_LABELS[row.severity]}
                        </span>
                      </span>
                  </div>
              </div>
          ))}
      </div>
    </>
  );
};

export default ViolationTable;
