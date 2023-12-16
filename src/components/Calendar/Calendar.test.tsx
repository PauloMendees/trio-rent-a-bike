import { act, render, screen } from '@testing-library/react';
import Calendar from './Calendar.container';
import userEvent from '@testing-library/user-event';

const mockedChangeDate = jest.fn();

describe('Calendar component test', () => {
  beforeEach(() => {
    render(<Calendar onChangeDate={mockedChangeDate} />);
  });

  it('Should render the Calendar component', () => {
    const header = screen.getByTestId('calendar-header');
    const month = screen.getByTestId('calendar-month');
    const year = screen.getByTestId('calendar-year');
    const prevButton = screen.getByTestId('prev-month-button');
    const nextButton = screen.getByTestId('next-month-button');
    const daysOfTheWeek = screen.getAllByTestId('day-of-the-week');
    const allDays = screen.getAllByTestId('single-day-container');

    expect(header).toBeInTheDocument();
    expect(month).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(daysOfTheWeek.length).toBe(7);
    expect(allDays.length).toBe(42);
  });

  it('Should display selected date indicators and call onChangeDate function', async () => {
    const nextButton = screen.getByTestId('next-month-button');

    act(() => {
      userEvent.click(nextButton);
    });

    const startDate = screen.getByTestId('day-button-12');
    const endDate = screen.getByTestId('day-button-17');

    act(() => {
      userEvent.click(startDate);
    });
    act(() => {
      userEvent.click(endDate);
    });

    const selectedDateIndicators = screen.getAllByTestId('selected-day-indicator');
    const intervalIndicators = screen.getAllByTestId('day-interval-indicator');

    expect(selectedDateIndicators.length).toBe(2);
    expect(intervalIndicators.length).toBe(4);
    expect(mockedChangeDate).toBeCalled();
  });

  it('Should not display intervals and not call onChangeDate function', async () => {
    const nextButton = screen.getByTestId('next-month-button');

    act(() => {
      userEvent.click(nextButton);
    });

    const startDate = screen.getByTestId('day-button-12');
    const endDate = screen.getByTestId('day-button-11');

    act(() => {
      userEvent.click(startDate);
    });
    act(() => {
      userEvent.click(endDate);
    });

    const selectedDateIndicators = screen.getAllByTestId('selected-day-indicator');
    const intervalIndicators = screen.queryAllByTestId('day-interval-indicator');

    expect(selectedDateIndicators.length).toBe(1);
    expect(intervalIndicators.length).toBe(0);
    expect(mockedChangeDate).not.toBeCalled();
  });
});
