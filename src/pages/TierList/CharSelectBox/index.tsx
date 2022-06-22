import { ActionIcon, Divider, Group, Indicator, Stack } from '@mantine/core';
import Header from 'src/components/Header';
import { IconFilter } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import CharListBox from '../CharListBox';
import useCharFilterDrawer from 'src/components/@arksurvey/CharFilterDrawer/useCharFilterDrawer';
import CardRoot from 'src/components/CardRoot';
import { useMemo } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { useDataMap } from 'src/pages/store';

export default function Index() {
  const { setOpened, drawerContext, filterChar } = useCharFilterDrawer();
  const { charMap } = useDataMap();
  const { t } = useTranslation();

  const charsFilter = useMemo(
    () =>
      mapToArray(charMap).filter((it) => {
        if (it.isNotObtainable) return false;
        else if (!filterChar(it)) return false;
        return true;
      }),
    [charMap, filterChar],
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
        <CharListBox filterChar={filterChar} />
      </Stack>
      {drawerContext}
    </CardRoot>
  );
}
