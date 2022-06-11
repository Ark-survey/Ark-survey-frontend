import { Container, Group, Stack } from '@mantine/core';
import DraggableTierList from './DraggableTierList';

import CharSelectBox from './CharSelectBox';

export default function Index() {
  return (
    <Container size={1500} p="xl" sx={{ userSelect: 'none' }}>
      <Group spacing={20} align="flex-start" position="center">
        <CharSelectBox />
        <DraggableTierList />
      </Group>
    </Container>
  );
}
