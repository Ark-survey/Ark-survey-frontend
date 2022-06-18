import { Container, Stack, Box } from '@mantine/core';
import DraggableTierList from './DraggableTierList';

import CharSelectBox from './CharSelectBox';
import TierListMainPage from './TierListMainPage';
import { useState } from 'react';

export default function Index() {
  const [inside, setInside] = useState(false);

  return (
    <Container size={1200} p="xl" sx={{ userSelect: 'none' }}>
      <Stack>
        <TierListMainPage inside={inside} onInside={() => setInside((inside) => !inside)} />
        {inside && (
          <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <CharSelectBox />
            <DraggableTierList />
          </Box>
        )}
      </Stack>
    </Container>
  );
}
