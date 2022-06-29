import { Box, Overlay } from '@mantine/core';
import { ReactNode } from 'react';
import { useStyles } from './style';

export interface CharNameProps {
  mini?: boolean;
  children?: ReactNode;
}

export default function CharName({ children, mini }: CharNameProps) {
  const { classes } = useStyles({ mini });

  return (
    <Overlay opacity={0.6} color="#000" zIndex={5} className={classes.overlay}>
      {children}
    </Overlay>
  );
}
