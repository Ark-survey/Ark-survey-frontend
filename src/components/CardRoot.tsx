import { LoadingOverlay, Paper } from '@mantine/core';

interface CardRootProps {
  loading?: boolean;
  children?: any;
}

export default function Index({ loading, children }: CardRootProps) {
  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder sx={{ flex: 1, minWidth: '320px' }}>
      <LoadingOverlay visible={loading ?? false} />
      {children}
    </Paper>
  );
}
