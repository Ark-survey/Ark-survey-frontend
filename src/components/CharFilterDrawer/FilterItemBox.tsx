import { Box, Divider } from '@mantine/core';
import { ReactNode } from 'react';

interface FilterItemBoxProps {
  label?: string;
  children?: ReactNode;
}

export function FilterItemBox({ label, children }: FilterItemBoxProps) {
  return (
    <Box sx={{ width: '96%' }}>
      <Divider
        my="md"
        label={label}
        labelPosition="center"
        labelProps={{
          color: '#000',
        }}
      />
      {children}
    </Box>
  );
}
