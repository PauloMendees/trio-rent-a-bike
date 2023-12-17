import { Period } from 'components/Calendar/types';
import Bike from 'models/Bike';
import { useMemo, useState } from 'react';
import { abreviatedMonths } from 'utils/calendar';
import { getServicesFee } from '../BikeDetails.utils';

type Props = {
  bike?: Bike;
};

export const useBikeDetails = ({ bike }: Props) => {
  const rateByDay = bike?.rate || 0;
  const rateByWeek = rateByDay * 7;

  const servicesFee = getServicesFee(rateByDay);

  const [selectedPeriod, setSelectedPeriod] = useState<Period>();
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);

  const toggleMobileDrawer = () => setOpenMobileDrawer((state) => !state);

  const onChangePeriod = (period: Period) => {
    setSelectedPeriod(period);
  };

  const prices = useMemo(() => {
    if (!selectedPeriod)
      return {
        subtotal: 0,
        total: servicesFee,
      };

    const days = selectedPeriod.endDate.diff(selectedPeriod.startDate, 'days') + 1;
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    const subtotal = weeks * rateByWeek + remainingDays * rateByDay;
    const total = subtotal + servicesFee;

    return {
      subtotal,
      total,
    };
  }, [selectedPeriod, rateByDay, rateByWeek, servicesFee]);

  const mobileDataLabel = useMemo(() => {
    return `From ${
      selectedPeriod
        ? `${abreviatedMonths[selectedPeriod.startDate.month()]}/${selectedPeriod.startDate.date()}`
        : '--/--'
    } to ${
      selectedPeriod
        ? `${abreviatedMonths[selectedPeriod.endDate.month()]}/${selectedPeriod.endDate.date()}`
        : '--/--'
    }`;
  }, [selectedPeriod]);

  return {
    openMobileDrawer,
    mobileDataLabel,
    selectedPeriod,
    onChangePeriod,
    toggleMobileDrawer,
    rateByDay,
    rateByWeek,
    servicesFee,
    prices,
  };
};
