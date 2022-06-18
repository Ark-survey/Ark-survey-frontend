import { Affix, Box, Paper, Divider, Title, ActionIcon, Stack, Indicator } from '@mantine/core';
import { IconDeviceFloppy, IconExchange, IconFilter } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharBoxEditing } from 'src/store/slice/settingSlice';
import { RootState } from 'src/store';
import CharBoxList from './CharExchangeBox/CharBoxList';
import { Character, CharBoxServer } from 'src/service/CharBoxServer';
import { successNotice, errorNotice } from 'src/components/Notice';
import { mapToArray } from 'src/utils/ObjectUtils';
import { useMemo } from 'react';
import { filterChar } from 'src/store/slice/filterSlice';

export default function Index({ onClickFilter }: { onClickFilter: () => void }) {
  const { charInBox, charBoxId } = useSelector((state: RootState) => state.charBox);
  const { charBoxEditing } = useSelector((state: RootState) => state.setting);
  const userId = useSelector((state: RootState) => state.user.userData?.id);
  const charInBoxArray = useSelector((state: RootState) => mapToArray(state.charBox.charInBox));
  const charData = useSelector((state: RootState) => mapToArray(state.user.charData));
  const dispatch = useDispatch();
  const filterCharFunc = useSelector((state: RootState) => filterChar(state));

  const charTypeInBox = useMemo(
    () =>
      charData.filter((it) => {
        return charInBoxArray.findIndex((i) => i.key === it.key) > -1 && filterCharFunc(it);
      }),
    [charData, charInBoxArray, filterCharFunc],
  );

  const handleSaveCharBox = async () => {
    try {
      const characterKeys: { [key: string]: Character } = {};
      charTypeInBox.forEach((it) => {
        characterKeys[it.key] = charInBox[it.key];
      });
      const { data } = await new CharBoxServer().updateOne({
        charBox: {
          id: charBoxId,
          userId: userId ?? '',
          characterKeys,
        },
      });
      // dispatch(updateCharInBox(data.characterKeys));
      successNotice('保存成功');
    } catch {
      errorNotice('保存失败');
    }
  };

  return (
    <Affix position={{ bottom: 0, right: 0 }} zIndex={100}>
      <Divider />
      <Paper radius={0} p="md" sx={{ width: '100vw', height: '200px', display: 'flex' }}>
        <Stack pr={10}>
          <ActionIcon size="lg" color="blue" radius="md" onClick={handleSaveCharBox}>
            <IconDeviceFloppy />
          </ActionIcon>
          <ActionIcon size="lg" onClick={() => dispatch(updateCharBoxEditing(!charBoxEditing))}>
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
          <CharBoxList />
        </Box>
      </Paper>
    </Affix>
  );
}
