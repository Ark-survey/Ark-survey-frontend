import { Box, Container, Stack, Space } from '@mantine/core';
import { useSelector } from 'react-redux';
import useCharFilterDrawer from 'src/components/CharFilterDawer/useCharFilterDrawer';
import { useWindowSize } from 'src/hooks';
import { RootState } from 'src/store';
import CharDataUnit from '../../components/CharDataUnit';
import CharExchangeAffix from './components/CharExchangeAffix';
import CharExchangeBox from './components/CharExchangeBox';

export default function CharBox() {
  const setting = useSelector((state: RootState) => state.setting);
  const menuOpen = useSelector((state: RootState) => state.user.menuOpen);
  const { downSM } = useWindowSize();
  const { setOpened, drawerContext } = useCharFilterDrawer();

  return (
    <Box p="lg">
      <Container size="xl">
        <Stack align="center">
          {!(setting.charBoxEditing && downSM) ? (
            <CharExchangeBox onClickFilter={() => setOpened(true)} />
          ) : (
            !menuOpen && <CharExchangeAffix onClickFilter={() => setOpened(true)} />
          )}
          {setting.charBoxEditing && <CharDataUnit />}
          <Space h={50} />
        </Stack>
      </Container>
      {drawerContext}
    </Box>
  );
}
