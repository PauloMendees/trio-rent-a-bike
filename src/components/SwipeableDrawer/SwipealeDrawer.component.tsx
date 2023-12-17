import { SwipeableDrawer as PrimitiveDrawer } from '@mui/material';
import { ReactNode } from 'react';
import { Puller, StyledDrawer } from './SwipeableDrawer.styles';

type Props = {
  open: boolean;
  toggleOpen: () => void;
  children: ReactNode;
};

const drawerBleeding = 56;

export const SwipeableDrawer = ({ toggleOpen, open, children }: Props) => {
  return (
    <PrimitiveDrawer
      swipeAreaWidth={drawerBleeding}
      onOpen={toggleOpen}
      onClose={toggleOpen}
      open={open}
      anchor="bottom"
      ModalProps={{
        keepMounted: false,
      }}
      sx={{
        ':root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <StyledDrawer>
        <Puller />
        {children}
      </StyledDrawer>
    </PrimitiveDrawer>
  );
};
