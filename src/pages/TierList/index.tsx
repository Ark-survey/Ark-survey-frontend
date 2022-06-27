import { Stack, Box } from '@mantine/core';
import DraggableTierList from './DraggableTierList';

import CharSelectBox from './CharSelectBox';
import TierListMainPage from './TierListMainPage';
import { useState } from 'react';
import PageContainer from 'src/components/PageContainer';
import { useTierListKey } from './store';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useIsMobile } from 'src/hooks/useIsMobile';
import { DndProvider } from 'react-dnd';

export default function Index() {
  const [inside, setInside] = useState(false);
  const { setTierListKey } = useTierListKey();
  const isMobile = useIsMobile();

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <PageContainer>
        <Stack>
          <TierListMainPage
            inside={inside}
            onInsideChange={(inside, key) => {
              setInside(inside);
              setTierListKey(key ?? '');
            }}
          />
          {inside && (
            <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <CharSelectBox />
              <DraggableTierList />
            </Box>
          )}
        </Stack>
      </PageContainer>
    </DndProvider>
  );
}
