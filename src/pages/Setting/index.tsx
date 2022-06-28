import { Accordion, Center, Container, Stack } from '@mantine/core';
import LangSelect from './components/LangSelect';
import MiniSwitch from './components/MiniSwitch';
import NameDisplaySwitch from './components/NameDisplaySwitch';

export default function Index() {
  return (
    <Container size={1200}>
      <Center py="lg">
        <Accordion sx={{ width: '100%' }} multiple defaultValue={['display', 'lang']}>
          <Accordion.Item value="display">
            <Accordion.Control>显示</Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <MiniSwitch />
                <NameDisplaySwitch />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="lang">
            <Accordion.Control>语言</Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <LangSelect />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Center>
    </Container>
  );
}
