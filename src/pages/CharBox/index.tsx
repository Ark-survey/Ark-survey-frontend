import { useState } from 'react';
import { Container, Stack, Box } from '@mantine/core';

import CharBoxInsidePage from './components/CharBoxInsidePage';
import CharBoxMainPage from './components/CharBoxMainPage';
import SkinBoxInsidePage from './components/SkinBoxInsidePage';

export default function Index() {
  const [inside, setInside] = useState(false);
  const [pageKey, setPageKey] = useState('char');

  return (
    <Container size={1200} p="xl" sx={{ userSelect: 'none' }}>
      <Stack>
        <CharBoxMainPage
          inside={inside}
          onInside={(inside, key) => {
            setInside(inside);
            setPageKey(key ?? '');
          }}
        />
        {inside && (
          <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {pageKey === 'char' ? <CharBoxInsidePage /> : <SkinBoxInsidePage />}
          </Box>
        )}
      </Stack>
    </Container>
  );
}
