import { render, screen } from '@testing-library/react';
import { BookedBike } from './BookedBike.component';
import { mockedBike } from 'mocks/Bike';

describe('BookedBike test', () => {
  beforeEach(() => {
    render(<BookedBike bike={mockedBike} />);
  });

  it('Should render all elements', () => {
    expect(screen.getByText('Thank you!')).toBeInTheDocument();
    expect(screen.getByText('Your bike is booked.')).toBeInTheDocument();
    expect(screen.getByText(mockedBike.name)).toBeInTheDocument();
    expect(screen.getByText(mockedBike.type)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
