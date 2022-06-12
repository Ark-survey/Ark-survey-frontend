import { Box, Group, Paper, Title } from '@mantine/core';
import { ReactNode } from 'react';
import CardRoot from './CardRoot';

interface PageHeaderProps {
  inside?: boolean;
  title: ReactNode;
  children?: any;
}

export default function Index({ inside, title, children }: PageHeaderProps) {
  return (
    <CardRoot>
      <Group position="apart" sx={{ flexFlow: inside ? 'row-reverse' : '', transition: 'all 0.5s' }}>
        <Title order={3}>{title}</Title>
        {inside && children}
      </Group>
    </CardRoot>
  );
}
