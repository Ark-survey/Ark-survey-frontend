import { Container, Stack } from '@mantine/core';
import DraggableTierList from './DraggableTierList';

import CharSelectBox from './CharSelectBox';

export default function Index() {
  return (
    <Container size={1500} p="xl">
      <Stack
        spacing={20}
        sx={{
          flexFlow: 'row wrap',
          alignItems: 'stretch',
        }}
      >
        <CharSelectBox />
        <DraggableTierList />
      </Stack>
    </Container>
  );
}
