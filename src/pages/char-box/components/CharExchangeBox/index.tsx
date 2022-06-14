import { Button, Stack, ScrollArea, Group, Divider, Paper, createStyles, ActionIcon, Indicator } from '@mantine/core';
import Header from 'src/components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import {
  IconChevronsDown,
  IconChevronsUp,
  IconDeviceFloppy,
  IconExchange,
  IconFilter,
  IconSquare,
  IconSquareCheck,
  IconSquareDot,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import CharList from './CharList';
import { updateCharBoxEditing } from 'src/store/slice/settingSlice';
import CharBoxList from './CharBoxList';
import { useMemo, useState } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { addCharToBox, delCharFromBox, updateCharInBox } from 'src/store/slice/charBoxSlice';
import { Character, CharBoxServer, Module, Skill } from 'src/api/CharBoxServer';
import { errorNotice, successNotice } from 'src/components/Notice';
import { filterChar } from 'src/store/slice/filterSlice';

export default function Index({ onClickFilter }: { onClickFilter: () => void }) {
  const filters = useSelector((state: RootState) => state.filters);
  const userId = useSelector((state: RootState) => state.user.userData?.id);
  const charData = useSelector((state: RootState) => mapToArray(state.user.charData));
  const { charInBox, charBoxId } = useSelector((state: RootState) => state.charBox);
  const charInBoxArray = useSelector((state: RootState) => mapToArray(state.charBox.charInBox));
  const filterCharFunc = useSelector((state: RootState) => filterChar(state));
  const { charBoxEditing } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [charSelectInBox, setCharSelectInBox] = useState<string[]>([]);
  const [charSelectOutBox, setCharSelectOutBox] = useState<string[]>([]);

  const charTypeInBox = useMemo(
    () =>
      charData.filter((it) => {
        return charInBoxArray.findIndex((i) => i.key === it.key) > -1 && filterCharFunc(it);
      }),
    [charData, charInBoxArray, filterCharFunc],
  );

  const charTypeOutBox = useMemo(
    () =>
      charData.filter((it) => {
        if (it.isNotObtainable) return false;
        return charTypeInBox.findIndex((i) => i.key === it.key) === -1 && filterCharFunc(it);
      }),
    [charData, charTypeInBox, filterCharFunc],
  );

  const selectMax = charTypeOutBox.length !== 0 && charTypeOutBox.length === charSelectOutBox.length;

  const handleChangeAllCharOutBoxSelect = () => {
    if (selectMax) setCharSelectOutBox([]);
    else setCharSelectOutBox(charTypeOutBox.map((it) => it.key));
  };

  const handleCharOut = () => {
    dispatch(delCharFromBox(charSelectInBox));
    setCharSelectInBox([]);
  };

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

  const handleCharIn = () => {
    const c = [...charTypeOutBox].filter((it) => charSelectOutBox.findIndex((i) => i === it.key) > -1);
    const obj: { [key: string]: Character } = {};
    c.forEach((it) => {
      const newSkills: { [key: string]: Skill } = {};
      Object.keys({ ...it.skills }).forEach((key) => {
        newSkills[key] = {
          level: 1,
          key,
        };
      });
      const newModule: { [key: string]: Module } = {};
      Object.keys({ ...it.equips }).forEach((key) => {
        newModule[key] = {
          level: 1,
          key,
        };
      });
      obj[it.key] = {
        key: it.key,
        moduleUse: '',
        skillUse: Object.keys(it.skills).find((i) => it.skills[i].index === 0) ?? '',
        skinUse: Object.keys(it.skins)[0],
        favorite: false,
        level: 1,
        elite: 0,
        trust: 200,
        potentialLevel: 0,
        skills: newSkills,
        modules: newModule,
      };
    });
    dispatch(addCharToBox(obj));
    setCharSelectOutBox([]);
  };

  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder sx={{ flex: '1' }}>
      <Stack>
        <Header title={charBoxEditing ? '干员盒' : '持有编辑'}>
          <Group position="right" spacing={10}>
            {!charBoxEditing && (
              <ActionIcon size="lg" radius="md" onClick={handleChangeAllCharOutBoxSelect}>
                {selectMax ? <IconSquareCheck /> : charSelectOutBox.length !== 0 ? <IconSquareDot /> : <IconSquare />}
              </ActionIcon>
            )}
            <ActionIcon size="lg" color="blue" radius="md" onClick={handleSaveCharBox}>
              <IconDeviceFloppy />
            </ActionIcon>
            <Indicator label={!charBoxEditing ? charTypeOutBox.length : charTypeInBox.length} size={16}>
              <ActionIcon size="lg" radius="md" onClick={onClickFilter}>
                <IconFilter />
              </ActionIcon>
            </Indicator>
          </Group>
        </Header>
        <Divider />
        {!charBoxEditing ? (
          <>
            <ScrollArea sx={{ height: '370px' }}>
              <CharList
                filterCharData={charTypeOutBox}
                selectKeys={charSelectOutBox}
                onSelect={(key) => setCharSelectOutBox([...charSelectOutBox, key])}
                onSelectCancel={(key) => setCharSelectOutBox((c) => c.filter((i) => i !== key))}
              />
            </ScrollArea>
            <Divider />
            <Group position="center">
              <Button leftIcon={<IconChevronsUp />} size="xs" color="red" variant="outline" onClick={handleCharOut}>
                移至未持有
              </Button>
              <Button leftIcon={<IconChevronsDown />} size="xs" variant="outline" onClick={handleCharIn}>
                移至已持有
              </Button>
            </Group>
            <Divider />
            <ScrollArea sx={{ height: !charBoxEditing ? '370px' : '' }}>
              <CharList
                filterCharData={charTypeInBox}
                selectKeys={charSelectInBox}
                onSelect={(key) => setCharSelectInBox([...charSelectInBox, key])}
                onSelectCancel={(key) => setCharSelectInBox((c) => c.filter((i) => i !== key))}
              />
            </ScrollArea>
          </>
        ) : (
          <ScrollArea sx={{ height: !charBoxEditing ? '370px' : '850px' }}>
            <CharBoxList />
          </ScrollArea>
        )}
        <Divider />
        <Group position="center">
          <Button
            variant={charBoxEditing ? 'outline' : 'filled'}
            color="indigo"
            leftIcon={<IconExchange />}
            onClick={() => dispatch(updateCharBoxEditing(!charBoxEditing))}
          >
            {charBoxEditing ? '练度编辑模式' : '持有编辑模式'}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
