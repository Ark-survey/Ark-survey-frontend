import { Affix, Box, Paper, Divider, ActionIcon, Stack, Indicator } from '@mantine/core';
import { IconDeviceFloppy, IconExchange, IconFilter } from '@tabler/icons';
import CharBoxList from './CharExchangeBox/CharBoxList';
import { mapToArray } from 'src/utils/ObjectUtils';
import { useMemo } from 'react';
import { CharacterType, useDataMap, useSetting } from 'src/pages/store';
import useCharBox from '../useCharBox';

export default function Index({
  filterChar,
  onClickFilter,
}: {
  filterChar: (char: CharacterType) => boolean;
  onClickFilter: () => void;
}) {
  const { setting, setSettingKeyValue } = useSetting();
  const { charMap } = useDataMap();

  const { charBox } = useCharBox();
  const charInBox = useMemo(() => charBox?.characterKeys ?? {}, [charBox?.characterKeys]);

  const charTypeInBox = useMemo(() => {
    const charInBoxArray = mapToArray(charInBox);
    return mapToArray(charMap).filter((it) => {
      return charInBoxArray.findIndex((i) => i.key === it.key) > -1 && filterChar(it);
    });
  }, [charMap, charInBox, filterChar]);

  return (
    <Affix position={{ bottom: 0, right: 0 }} zIndex={100}>
      <Divider />
      <Paper radius={0} p="md" sx={{ width: '100vw', height: '200px', display: 'flex' }}>
        <Stack pr={10}>
          <ActionIcon size="lg" onClick={() => setSettingKeyValue('charBoxEditing', !setting.charBoxEditing)}>
            <IconExchange />
          </ActionIcon>
          <Indicator label={charTypeInBox.length} size={16}>
            <ActionIcon size="lg" onClick={onClickFilter}>
              <IconFilter />
            </ActionIcon>
          </Indicator>
          {/* <Title order={5} px={5}>
            干员盒
          </Title> */}
        </Stack>
        <Box sx={{ height: '100%', overflow: 'auto', flex: 1 }}>
          <CharBoxList filterChar={filterChar} />
        </Box>
      </Paper>
    </Affix>
  );
}
