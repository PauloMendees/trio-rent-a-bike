import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CalendarComponentProps, Period } from '../types';

export const useCalendar = ({ onChangePeriod, defaultPeriod }: CalendarComponentProps) => {
  const today = dayjs();
  const [selectedMonth, setSelectedMonth] = useState<number>(today.month());
  const [selectedYear, setSelectedYear] = useState<number>(today.year());
  const [period, setPeriod] = useState<Partial<Period>>(defaultPeriod || {});

  useEffect(() => {
    if (onChangePeriod) {
      onChangePeriod(period as Period);
    }
  }, [period]);

  const onNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
      return;
    }

    setSelectedMonth(selectedMonth + 1);
  };

  const onPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
      return;
    }

    setSelectedMonth(selectedMonth - 1);
  };

  const onDayClick = (date: dayjs.Dayjs) => {
    if (period.startDate && period.endDate) {
      setPeriod({
        startDate: date,
        endDate: undefined,
      });
      return;
    }

    if (period.startDate && date.isBefore(period.startDate, 'day')) {
      setPeriod({
        startDate: date,
        endDate: undefined,
      });
      return;
    }

    if (period.startDate && date.isAfter(period.startDate, 'day')) {
      setPeriod({
        startDate: period.startDate,
        endDate: date,
      });
      return;
    }

    setPeriod({
      startDate: date,
      endDate: undefined,
    });
  };

  return { today, selectedMonth, selectedYear, period, onNextMonth, onPrevMonth, onDayClick };
};
