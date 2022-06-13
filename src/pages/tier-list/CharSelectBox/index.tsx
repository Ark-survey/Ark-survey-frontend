import { ActionIcon, Divider, Group, Stack } from '@mantine/core';
import Header from 'src/components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { IconFilter } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import CharListBox from '../CharListBox';
import useCharFilterDrawer from 'src/components/CharFilterDrawer/useCharFilterDrawer';
import CardRoot from 'src/components/CardRoot';

export default function Index() {
  const { setOpened, drawerContext } = useCharFilterDrawer();
  const filters = useSelector((state: RootState) => state.filters);
  const setting = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <CardRoot>
      <Stack>
        <Header title={t('charTitle')}>
          <Group position="right" spacing={10}>
            <ActionIcon size="lg" radius="md" onClick={() => setOpened(true)}>
              <IconFilter />
            </ActionIcon>
          </Group>
        </Header>
        <Divider />
        <CharListBox />
      </Stack>
      {drawerContext}
    </CardRoot>
  );
}
