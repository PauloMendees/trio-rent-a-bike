import dayjs from 'dayjs';

export type Period = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

export type CalendarComponentProps = {
  onChangeDate?: (period: Period) => void;
};

export type StyledDayProps = {
  isselected?: 'true' | 'false';
  istoday?: 'true' | 'false';
};
