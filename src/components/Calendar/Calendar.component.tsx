import { ArrowRightIcon } from 'assets/icons/ArrowRight';
import {
  ArrowButtons,
  ArrowsContainer,
  Container,
  Day,
  DayContainer,
  DayOfTheWeek,
  DaysContainer,
  Header,
  IntervalBackground,
  SelectedDayCircle,
  SelectedDayCircleContainer,
} from './Calendar.styles';
import { Box, Typography } from '@mui/material';
import { ArrowLeftIcon } from 'assets/icons/ArrowLeft';
import { daysOfTheWeek, generateDate, months } from 'utils/calendar';
import dayjs from 'dayjs';
import { useCalendar } from './hooks/useCalendar';
import theme from 'styles/theme';
import { CalendarComponentProps } from './types';

const Calendar = (props: CalendarComponentProps) => {
  const { selectedMonth, today, selectedYear, onNextMonth, onPrevMonth, onDayClick, period } =
    useCalendar(props);

  return (
    <Container>
      <Header data-testid="calendar-header">
        <Box>
          <Typography
            data-testid="calendar-month"
            fontSize={34}
            fontWeight={800}
            lineHeight={'39px'}
          >
            {months[selectedMonth]}
          </Typography>
          <Typography
            data-testid="calendar-year"
            fontSize={16}
            fontWeight={600}
            sx={{ opacity: 0.5 }}
          >
            {selectedYear}
          </Typography>
        </Box>
        <ArrowsContainer data-testid="change-month-buttons-container">
          <ArrowButtons
            data-testid="prev-month-button"
            onClick={onPrevMonth}
            disabled={today.month() === selectedMonth && selectedYear === today.year()}
          >
            <ArrowLeftIcon />
          </ArrowButtons>
          <ArrowButtons data-testid="next-month-button" onClick={onNextMonth}>
            <ArrowRightIcon />
          </ArrowButtons>
        </ArrowsContainer>
      </Header>
      <DaysContainer>
        {daysOfTheWeek.map((day) => (
          <DayOfTheWeek data-testid="day-of-the-week" key={day}>
            {day}
          </DayOfTheWeek>
        ))}
        {generateDate(selectedMonth, selectedYear).map((day) => {
          const isSelected =
            period.startDate?.toDate().toISOString() === day.date.toDate().toISOString() ||
            period.endDate?.toDate().toISOString() === day.date.toDate().toISOString();

          const isInterval =
            day.date.isBefore(period.endDate) && day.date.isAfter(period.startDate);

          return (
            <DayContainer data-testid="single-day-container" key={day.date.toString()}>
              {isInterval && <IntervalBackground data-testid="day-interval-indicator" />}
              {isSelected && (
                <>
                  {period.endDate && period.startDate && (
                    <SelectedDayCircleContainer
                      startdate={
                        period.startDate?.toDate().toISOString() === day.date.toDate().toISOString()
                          ? 'true'
                          : 'false'
                      }
                    />
                  )}
                  <SelectedDayCircle data-testid="selected-day-indicator" />
                </>
              )}
              <Day
                data-testid={`day-button-${dayjs(day.date).format('D')}`}
                disabled={!day.currentMonth || day.date.isBefore(today, 'day')}
                istoday={day.today ? 'true' : 'false'}
                isselected={isSelected ? 'true' : 'false'}
                onClick={() => {
                  onDayClick(day.date);
                }}
              >
                <Typography
                  color={isSelected ? theme.palette.primary.main : theme.palette.common.white}
                >
                  {dayjs(day.date).format('D')}
                </Typography>
              </Day>
            </DayContainer>
          );
        })}
      </DaysContainer>
    </Container>
  );
};

export default Calendar;
