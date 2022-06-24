import { useState } from 'react';
import { Stack, Box } from '@mantine/core';

import CharBoxInsidePage from './components/CharBoxInsidePage';
import CharBoxMainPage from './components/CharBoxMainPage';
import SkinBoxInsidePage from './components/SkinBoxInsidePage';
import PageContainer from 'src/components/PageContainer';
import useSkinBox from './useSkinBox';

export default function Index() {
  const [inside, setInside] = useState(false);
  const [pageKey, setPageKey] = useState('char');

  const { isLoading } = useSkinBox();

  return (
    <PageContainer loading={isLoading}>
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
    </PageContainer>
  );
}
