export type ViolationType = 'tender' | 'cartel' | 'abuse' | 'unfair' | 'procurement';
export type Severity = 'high' | 'medium' | 'low';
export type EntityType = 'legal' | 'official';

export interface Violation {
  name: string;
  type: ViolationType;
  entity: EntityType;
  article: string;
  fineLegal: string;
  fineOfficial: string;
  severity: Severity;
  fineMax: number; // In thousands of rubles
}

export interface Stats {
  totalCases: number;
  avgFine: number;
  maxFine: number;
  totalFines: number;
}
