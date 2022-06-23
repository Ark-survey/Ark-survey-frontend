import { Container, Stack, Box } from '@mantine/core';

import CharBoxInsidePage from './components/CharBoxInsidePage';
import CharBoxMainPage from './components/CharBoxMainPage';
import { useState } from 'react';

export default function Index() {
  const [inside, setInside] = useState(false);

  return (
    <Container size={1200} p="xl" sx={{ userSelect: 'none' }}>
      <Stack>
        <CharBoxMainPage inside={inside} onInside={() => setInside((inside) => !inside)} />
        {inside && (
          <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <CharBoxInsidePage />
          </Box>
        )}
      </Stack>
    </Container>
  );
}
