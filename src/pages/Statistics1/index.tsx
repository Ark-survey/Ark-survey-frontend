import { Stack, Box } from '@mantine/core';

import StatisticsMainPage from './components/StatisticsMainPage';
import StatisticsInsidePage from './components/StatisticsInsidePage';
import { useState } from 'react';
import PageContainer from 'src/components/PageContainer';
import { useStatisticsKey } from './store';

export default function Index() {
  const [inside, setInside] = useState(false);

  const { setStatisticsKey } = useStatisticsKey();

  return (
    <PageContainer>
      <Stack>
        <StatisticsMainPage
          inside={inside}
          onInsideChange={(inside, key) => {
            setInside(inside);
            setStatisticsKey(key ?? '');
          }}
        />
        {inside && (
          <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <StatisticsInsidePage />
          </Box>
        )}
      </Stack>
    </PageContainer>
  );
}
