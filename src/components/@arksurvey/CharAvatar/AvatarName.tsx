import { Box } from '@mantine/core';
import { ReactNode } from 'react';
import { useStyles } from './style';

export interface CharNameProps {
  mini?: boolean;
  children?: ReactNode;
}

export default function CharName({ children, mini }: CharNameProps) {
  const { classes } = useStyles({ mini });

  return <Box className={classes.name}>{children}</Box>;
}
