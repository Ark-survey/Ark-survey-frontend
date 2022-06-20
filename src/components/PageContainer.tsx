import { Container, LoadingOverlay } from '@mantine/core';
import { ReactNode } from 'react';

export default function Index({ loading, children }: { loading?: boolean; children?: ReactNode }) {
  return (
    <Container size={1200} p="xl" sx={{ userSelect: 'none' }}>
      <LoadingOverlay visible={loading ?? false} />
      {children}
    </Container>
  );
}
