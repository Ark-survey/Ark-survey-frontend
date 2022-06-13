import { Container, Stack, Box } from '@mantine/core';

import StatisticsMainPage from './components/StatisticsMainPage';
import StatisticsInsidePage from './components/StatisticsInsidePage';
import { useState } from 'react';

export default function Index() {
  const [inside, setInside] = useState(false);

  return (
    <Container size={1200} p="xl" sx={{ userSelect: 'none' }}>
      <Stack>
        <StatisticsMainPage inside={inside} onInside={() => setInside((inside) => !inside)} />
        {inside && (
          <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <StatisticsInsidePage />
          </Box>
        )}
      </Stack>
    </Container>
  );
}
