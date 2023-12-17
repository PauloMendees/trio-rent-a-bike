import { Period } from 'components/Calendar/types';
import Bike from 'models/Bike';
import { useMemo, useState } from 'react';
import { abreviatedMonths } from 'utils/calendar';

type Props = {
  bike?: Bike;
};

export const useBikeDetails = ({ bike }: Props) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>();
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);

  const toggleMobileDrawer = () => setOpenMobileDrawer((state) => !state);

  const onChangePeriod = (period: Period) => {
    setSelectedPeriod(period);
  };

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

  return { openMobileDrawer, mobileDataLabel, selectedPeriod, onChangePeriod, toggleMobileDrawer };
};
