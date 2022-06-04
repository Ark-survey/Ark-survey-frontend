import { useMemo, useState } from 'react';
import { Drawer, ScrollArea, Title } from '@mantine/core';
import CharFilterBox from '.';

export default function useCharFilterDrawer() {
  const [opened, setOpened] = useState(false);

  const drawerContext = useMemo(() => {
    return (
      <Drawer opened={opened} onClose={() => setOpened(false)} title={<Title order={4}>干员筛选器</Title>} padding="md">
        <CharFilterBox />
      </Drawer>
    );
  }, [opened]);

  return { setOpened, drawerContext };
}
