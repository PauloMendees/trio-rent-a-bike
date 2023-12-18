import dayjs from 'dayjs';

export type Period = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

export type CalendarComponentProps = {
  defaultPeriod?: Partial<Period>;
  onChangePeriod?: (period: Partial<Period>) => void;
};

export type StyledDayProps = {
  isselected?: 'true' | 'false';
  istoday?: 'true' | 'false';
};
