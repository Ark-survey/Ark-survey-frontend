import { useMemo, useState } from 'react';
import { Drawer, Title } from '@mantine/core';
import { CharacterType } from 'src/store/slice/userSlice';
import CharFilterBox, { initialState } from '.';

export default function useCharFilterDrawer() {
  const [opened, setOpened] = useState(false);

  const [filters, setFilters] = useState(initialState);

  const filterChar = (char: CharacterType) => {
    return (
      (filters.chipGroup.rarity.length === 0 || filters.chipGroup.rarity.includes(char.rarity)) &&
      (filters.chipGroup.profession.length === 0 || filters.chipGroup.profession.includes(char.profession)) &&
      (filters.chipGroup.position.length === 0 || filters.chipGroup.position.includes(char.position))
    );
  };

  const drawerContext = useMemo(() => {
    return (
      <Drawer opened={opened} onClose={() => setOpened(false)} title={<Title order={4}>干员筛选器</Title>} padding="md">
        <CharFilterBox filters={filters} onFilterChange={setFilters} />
      </Drawer>
    );
  }, [filters, opened]);

  return { setOpened, filterChar, drawerContext };
}
