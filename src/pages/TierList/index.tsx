import { Stack, Box } from '@mantine/core';
import DraggableTierList from './DraggableTierList';

import CharSelectBox from './CharSelectBox';
import TierListMainPage from './TierListMainPage';
import { useState } from 'react';
import useTierList from './useTierList';
import PageContainer from 'src/components/PageContainer';
import { useTierListKey } from './store';

export default function Index() {
  const [inside, setInside] = useState(false);
  const { setTierListKey } = useTierListKey();

  const { isLoading } = useTierList();

  return (
    <PageContainer loading={isLoading}>
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
  );
}
