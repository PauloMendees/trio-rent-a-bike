import { Period } from 'components/Calendar/types';
import Bike from 'models/Bike';
import { useMemo, useState } from 'react';
import { abreviatedMonths } from 'utils/calendar';
import { getServicesFee } from '../BikeDetails.utils';
import apiClient from 'services/api';
import { userDataKey } from 'config/localStorage';
import { User } from 'models/User';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useMediaQuery } from '@mui/material';
import theme from 'styles/theme';

type Props = {
  bike?: Bike;
};

export const useBikeDetails = ({ bike }: Props) => {
  const rateByDay = bike?.rate || 0;
  const rateByWeek = rateByDay * 7;

  const [selectedPeriod, setSelectedPeriod] = useState<Partial<Period>>({});
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openBookedModal, setOpenBookedModal] = useState<boolean>(false);

  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleBookedModal = () => setOpenBookedModal((state) => !state);
  const toggleBooked = () => setIsBooked((state) => !state);
  const toggleMobileDrawer = () => setOpenMobileDrawer((state) => !state);

  const onChangePeriod = (period: Partial<Period>) => {
    setSelectedPeriod(period);
  };

  const prices = useMemo(() => {
    if (!selectedPeriod || !selectedPeriod.startDate || !selectedPeriod.endDate)
      return {
        subtotal: 0,
        total: 0,
        servicesFee: 0,
      };

    const days = selectedPeriod.endDate.diff(selectedPeriod.startDate, 'days') + 1;
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    const subtotal = weeks * rateByWeek + remainingDays * rateByDay;
    const servicesFee = getServicesFee(subtotal);
    const total = subtotal + servicesFee;

    return {
      subtotal,
      total,
      servicesFee,
    };
  }, [selectedPeriod, rateByDay, rateByWeek]);

  const mobileDataLabel = useMemo(() => {
    return `From ${
      selectedPeriod.startDate ? abreviatedMonths[selectedPeriod.startDate.month()] : '--'
    }/${selectedPeriod.startDate ? selectedPeriod.startDate.date() : '--'} to ${
      selectedPeriod.endDate ? abreviatedMonths[selectedPeriod.endDate.month()] : '--'
    }/${selectedPeriod.endDate ? selectedPeriod.endDate.date() : '--'}`;
  }, [selectedPeriod]);

  const rent = async () => {
    try {
      setIsLoading(true);
      const userDataJson = window.localStorage.getItem(userDataKey);
      if (!userDataJson) return toast.error('You must sign up to rent a bike');
      const parsedUserData = JSON.parse(userDataJson || '{}') as User;

      if (!selectedPeriod.startDate || !selectedPeriod.endDate)
        return toast.error('You must select a period to rent a bike');

      await apiClient.post('/bikes/rent', {
        bikeId: bike?.id,
        userId: parsedUserData.id,
        dateFrom: selectedPeriod?.startDate.format('YYYY-MM-DD'),
        dateTo: selectedPeriod?.endDate.format('YYYY-MM-DD'),
      });

      if (isMobileScreen) {
        toggleBookedModal();
      } else {
        toggleBooked();
      }
    } catch (error) {
      if (error instanceof AxiosError)
        return toast.error(error.response?.data?.message || 'Error renting bike');
      toast.error('Error renting bike');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openBookedModal,
    toggleBookedModal,
    openMobileDrawer,
    mobileDataLabel,
    selectedPeriod,
    onChangePeriod,
    toggleMobileDrawer,
    rateByDay,
    rateByWeek,
    servicesFee: prices.servicesFee,
    prices,
    isBooked,
    rent,
    isLoading,
  };
};
