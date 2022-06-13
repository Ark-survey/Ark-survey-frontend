import { Accordion, Center, Container, Stack } from '@mantine/core';
import LangSelect from './components/LangSelect';
import MiniSwitch from './components/MiniSwitch';
import NameDisplaySwitch from './components/NameDisplaySwitch';

export default function Index() {
  return (
    <Container size={1200}>
      <Center py="lg">
        <Accordion sx={{ width: '100%' }} multiple initialItem={0}>
          <Accordion.Item label="显示">
            <Stack>
              <MiniSwitch />
              <NameDisplaySwitch />
            </Stack>
          </Accordion.Item>
          <Accordion.Item label="语言" aria-disabled>
            <LangSelect />
          </Accordion.Item>
        </Accordion>
      </Center>
    </Container>
  );
}
