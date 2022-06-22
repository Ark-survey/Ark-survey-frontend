import { Group, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface HeaderProps {
  title: ReactNode;
  children?: any;
}

export default function Index({ title, children }: HeaderProps) {
  return (
    <Group position="apart">
      <Title order={4}>{title}</Title>
      {children}
    </Group>
  );
}
