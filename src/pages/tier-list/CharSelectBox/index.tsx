import { ActionIcon, Divider, Group, Indicator, Stack } from '@mantine/core';
import Header from 'src/components/Header';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IconFilter } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import CharListBox from '../CharListBox';
import useCharFilterDrawer from 'src/components/CharFilterDrawer/useCharFilterDrawer';
import CardRoot from 'src/components/CardRoot';
import { useMemo } from 'react';
import { filterChar } from 'src/store/slice/filterSlice';
import { mapToArray } from 'src/utils/ObjectUtils';

export default function Index() {
  const { setOpened, drawerContext } = useCharFilterDrawer();
  const charData = useSelector((state: RootState) => mapToArray(state.user.charData));
  const filterCharFunc = useSelector((state: RootState) => filterChar(state));
  const { t } = useTranslation();

  const charsFilter = useMemo(
    () =>
      charData.filter((it) => {
        if (it.isNotObtainable || !filterCharFunc(it)) return false;
        return true;
      }),
    [charData, filterCharFunc],
  );

  return (
    <CardRoot>
      <Stack>
        <Header title={t('charTitle')}>
          <Group position="right" spacing={10}>
            <Indicator label={charsFilter.length} size={16}>
              <ActionIcon size="lg" radius="md" onClick={() => setOpened(true)}>
                <IconFilter />
              </ActionIcon>
            </Indicator>
          </Group>
        </Header>
        <Divider />
        <CharListBox />
      </Stack>
      {drawerContext}
    </CardRoot>
  );
}
