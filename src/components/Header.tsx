import { Box } from '@mantine/core';
import { ReactNode } from 'react';

interface HeaderProps {
  title: ReactNode;
  children?: any;
}

export default function Index({ title, children }: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '2px #eee solid',
        padding: '5px 15px',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        boxSizing: 'border-box',
        alignItems: 'center',
        minHeight: '70px',
      }}
    >
      <Box
        sx={{
          fontSize: '20px',
          lineHeight: '45px',
          height: '45px',
          padding: 5,
          fontWeight: 900,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title}
      </Box>

      <Box
        sx={{
          flex: '1',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 5,
          marginLeft: '10px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
