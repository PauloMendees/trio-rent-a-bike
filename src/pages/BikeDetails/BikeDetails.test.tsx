import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockedBike } from 'mocks/Bike';
import { SERVICE_FEE_PERCENTAGE } from './BikeDetails.contants';
import { getServicesFee } from './BikeDetails.utils';
import BikeDetails from './BikeDetails.component';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('BikeDetails page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BikeDetails bike={mockedBike} />
      </BrowserRouter>,
    );
  });

  it('should has a header', () => {
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  it('should has breadcrumbs', () => {
    const breadcrumbsElement = screen.getByTestId('bike-details-breadcrumbs');
    expect(breadcrumbsElement).toBeInTheDocument();
  });

  it('should has the details container with the image selector, bike name, prices and a map', () => {
    const detailsContainerElement = screen.getByTestId('bike-details-container');
    expect(detailsContainerElement).toBeInTheDocument();

    const imageSelectorElement = screen.getByTestId('bike-image-selector');
    expect(imageSelectorElement).toBeInTheDocument();

    const nameElement = screen.getByTestId('bike-name-details');
    expect(nameElement).toBeInTheDocument();

    const pricesElement = screen.getByTestId('bike-prices-details');
    expect(pricesElement).toBeInTheDocument();

    const mapElement = screen.getByTestId('booking-address-map');
    expect(mapElement).toBeInTheDocument();
  });

  it('should has the overview container with the prices, total and booking button', () => {
    const overviewContainerElement = screen.getByTestId('bike-overview-container');
    expect(overviewContainerElement).toBeInTheDocument();

    const pricesElements = screen.getAllByTestId('bike-overview-single-price');
    expect(pricesElements).not.toBeNull();
    expect(pricesElements.length).toBe(2);

    const totalElement = screen.getByTestId('bike-overview-total');
    expect(totalElement).toBeInTheDocument();

    const bookingButtonElement = screen.getByTestId('bike-booking-button');
    expect(bookingButtonElement).toBeInTheDocument();
  });

  it('should render the calendar', () => {
    expect(screen.getByTestId('calendar-header')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-month')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-year')).toBeInTheDocument();
    expect(screen.getByTestId('change-month-buttons-container')).toBeInTheDocument();
  });

  it('should calculate price correctly', async () => {
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

    const subtotal = 6 * mockedBike.rate;
    const serviceFee = getServicesFee(subtotal);

    const total = subtotal + serviceFee;

    expect(screen.getByText(`${subtotal} €`)).toBeInTheDocument();
    expect(screen.getByText(`${serviceFee} €`)).toBeInTheDocument();
    expect(screen.getByText(`${total} €`)).toBeInTheDocument();
  });
});

describe('BikeDetails utils', () => {
  it('should gets the services fee properly', () => {
    const amount = 100;
    const expectedAmount = amount * SERVICE_FEE_PERCENTAGE;

    const result = getServicesFee(amount);
    expect(result).toEqual(expectedAmount);
  });
});
