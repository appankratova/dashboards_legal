import { Violation, ViolationType, Severity, EntityType } from './types';

export const VIOLATIONS_DATA: Violation[] = [
  {
    name: 'Картельный сговор при проведении торгов на event-услуги',
    type: 'cartel',
    entity: 'legal',
    article: 'ч. 2 ст. 14.32',
    fineLegal: '100-500 тыс. ₽',
    fineOfficial: '20-50 тыс. ₽',
    severity: 'high',
    fineMax: 500
  },
  {
    name: 'Злоупотребление доминирующим положением при организации мероприятий',
    type: 'abuse',
    entity: 'legal',
    article: 'ч. 1 ст. 14.31',
    fineLegal: '300 тыс. - 1 млн ₽',
    fineOfficial: '15-20 тыс. ₽',
    severity: 'high',
    fineMax: 1000
  },
  {
    name: 'Недобросовестная конкуренция при рекламе event-услуг',
    type: 'unfair',
    entity: 'legal',
    article: 'ч. 1 ст. 14.33',
    fineLegal: '100-500 тыс. ₽',
    fineOfficial: '20 тыс. ₽',
    severity: 'high',
    fineMax: 500
  },
  {
    name: 'Проведение закупки в бумажном виде вместо электронного (223-ФЗ)',
    type: 'procurement',
    entity: 'legal',
    article: 'ч. 4 ст. 7.32.3',
    fineLegal: '100-300 тыс. ₽',
    fineOfficial: '10-30 тыс. ₽',
    severity: 'high',
    fineMax: 300
  },
  {
    name: 'Не размещена информация о закупке event-услуг в ЕИС (223-ФЗ)',
    type: 'procurement',
    entity: 'legal',
    article: 'ч. 1 ст. 7.30',
    fineLegal: '100-300 тыс. ₽',
    fineOfficial: '30-50 тыс. ₽',
    severity: 'high',
    fineMax: 300
  },
  {
    name: 'Неисполнение предписания ФАС',
    type: 'unfair',
    entity: 'legal',
    article: 'ч. 10 ст. 19.5',
    fineLegal: '300-500 тыс. ₽',
    fineOfficial: '30-50 тыс. ₽',
    severity: 'high',
    fineMax: 500
  },
  {
    name: 'Заключение вертикального соглашения при организации выставки',
    type: 'cartel',
    entity: 'legal',
    article: 'ч. 3 ст. 14.32',
    fineLegal: '100-300 тыс. ₽',
    fineOfficial: '15-30 тыс. ₽',
    severity: 'high',
    fineMax: 300
  },
  {
    name: 'Необоснованное отклонение заявок участников торгов',
    type: 'tender',
    entity: 'legal',
    article: 'ч. 3 ст. 7.30',
    fineLegal: '50-100 тыс. ₽',
    fineOfficial: '2-3 тыс. ₽',
    severity: 'medium',
    fineMax: 100
  },
  {
    name: 'Нарушение сроков проведения конкурса/аукциона на event-услуги',
    type: 'procurement',
    entity: 'legal',
    article: 'ч. 4 ст. 7.30',
    fineLegal: '100 тыс. ₽',
    fineOfficial: '30 тыс. ₽',
    severity: 'medium',
    fineMax: 100
  },
  {
    name: 'Несвоевременное размещение информации о торгах в ЕИС',
    type: 'procurement',
    entity: 'legal',
    article: 'ч. 1 ст. 7.30',
    fineLegal: '10-30 тыс. ₽',
    fineOfficial: '2-5 тыс. ₽',
    severity: 'low',
    fineMax: 30
  },
  {
    name: 'Извещение не соответствует требованиям 223-ФЗ',
    type: 'procurement',
    entity: 'legal',
    article: 'ч. 5 ст. 7.30',
    fineLegal: '5-10 тыс. ₽',
    fineOfficial: '2-3 тыс. ₽',
    severity: 'low',
    fineMax: 10
  },
  {
    name: 'Использование других критериев оценки заявок',
    type: 'tender',
    entity: 'legal',
    article: 'ч. 3 ст. 7.30',
    fineLegal: '5-10 тыс. ₽',
    fineOfficial: '2-3 тыс. ₽',
    severity: 'low',
    fineMax: 10
  },
  {
    name: 'Создание препятствий для доступа на рынок event-услуг',
    type: 'abuse',
    entity: 'legal',
    article: 'ч. 2 ст. 14.31.1',
    fineLegal: '300 тыс. - 1 млн ₽',
    fineOfficial: '15-30 тыс. ₽',
    severity: 'high',
    fineMax: 1000
  },
  {
    name: 'Антиконкурентное соглашение органов власти с организатором мероприятия',
    type: 'cartel',
    entity: 'official',
    article: 'ч. 7 ст. 14.32',
    fineLegal: '—',
    fineOfficial: '20-50 тыс. ₽',
    severity: 'medium',
    fineMax: 50
  },
  {
    name: 'Несвоевременная оплата услуг event-подрядчику (СМСП)',
    type: 'procurement',
    entity: 'legal',
    article: 'ч. 3 ст. 7.32.5',
    fineLegal: '50-100 тыс. ₽',
    fineOfficial: '30-50 тыс. ₽',
    severity: 'medium',
    fineMax: 100
  },
  {
    name: 'Проведение закупки по 223-ФЗ вместо 44-ФЗ',
    type: 'procurement',
    entity: 'legal',
    article: 'ч. 4.1 ст. 7.30',
    fineLegal: '50-100 тыс. ₽',
    fineOfficial: '20-30 тыс. ₽',
    severity: 'medium',
    fineMax: 100
  },
  {
    name: 'Нарушение требований конфиденциальности при проведении торгов',
    type: 'tender',
    entity: 'legal',
    article: 'ч. 9 ст. 7.30',
    fineLegal: '30-50 тыс. ₽',
    fineOfficial: '30-50 тыс. ₽',
    severity: 'medium',
    fineMax: 50
  },
  {
    name: 'Действия должностных лиц, ограничивающие конкуренцию в event-сфере',
    type: 'unfair',
    entity: 'official',
    article: 'ч. 1 ст. 14.9',
    fineLegal: '—',
    fineOfficial: '15-50 тыс. ₽',
    severity: 'medium',
    fineMax: 50
  }
];

export const TYPE_LABELS: Record<ViolationType, string> = {
  tender: 'Нарушения при торгах',
  cartel: 'Картельные сговоры',
  abuse: 'Злоупотребление положением',
  unfair: 'Недобросовестная конкуренция',
  procurement: 'Закупки 44-ФЗ/223-ФЗ'
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  high: 'Высокая',
  medium: 'Средняя',
  low: 'Низкая'
};

export const ENTITY_LABELS: Record<EntityType, string> = {
  legal: 'Юр. лицо',
  official: 'Долж. лицо'
};
