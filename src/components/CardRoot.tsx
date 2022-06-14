import { Paper } from '@mantine/core';

interface CardRootProps {
  children?: any;
}

export default function Index({ children }: CardRootProps) {
  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder sx={{ flex: 1, minWidth: '320px' }}>
      {children}
    </Paper>
  );
}
