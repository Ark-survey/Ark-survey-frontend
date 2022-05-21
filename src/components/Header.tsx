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
        padding: '15px',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          fontSize: '20px',
          lineHeight: '30px',
          paddingLeft: 5,
          fontWeight: 900,
          marginTop: '6px',
          marginBottom: '6px',
          whiteSpace: 'nowrap',
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
          margin: '6px 0',
          marginLeft: '10px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
