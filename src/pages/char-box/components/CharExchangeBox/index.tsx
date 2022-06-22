import { Button, Stack, ScrollArea, Group, Divider, Paper, ActionIcon, Indicator } from '@mantine/core';
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
import CharBoxList from './CharBoxList';
import { useMemo, useState } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { addCharToBox, delCharFromBox } from 'src/store/slice/charBoxSlice';
import { Character, CharBoxServer, Module, Skill } from 'src/service/CharBoxServer';
import { errorNotice, successNotice } from 'src/components/Notice';
import { CharacterType, useDataMap, useMeta, useSetting } from 'src/pages/store';

export default function Index({
  filterChar,
  onClickFilter,
}: {
  filterChar: (char: CharacterType) => boolean;
  onClickFilter: () => void;
}) {
  const { user } = useMeta();
  const { charMap } = useDataMap();
  const { charInBox, charBoxId } = useSelector((state: RootState) => state.charBox);
  const charInBoxArray = useSelector((state: RootState) => mapToArray(state.charBox.charInBox));
  const { setting, setSettingKeyValue } = useSetting();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [charSelectInBox, setCharSelectInBox] = useState<string[]>([]);
  const [charSelectOutBox, setCharSelectOutBox] = useState<string[]>([]);

  const charTypeInBox = useMemo(
    () =>
      mapToArray(charMap).filter((it) => {
        return charInBoxArray.findIndex((i) => i.key === it.key) > -1 && filterChar(it);
      }),
    [charMap, charInBoxArray, filterChar],
  );

  const charTypeOutBox = useMemo(
    () =>
      mapToArray(charMap).filter((it) => {
        if (it.isNotObtainable) return false;
        return charTypeInBox.findIndex((i) => i.key === it.key) === -1 && filterChar(it);
      }),
    [charMap, charTypeInBox, filterChar],
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
          userId: user.id,
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
        <Header title={setting.charBoxEditing ? '干员盒' : '持有编辑'}>
          <Group position="right" spacing={10}>
            {!setting.charBoxEditing && (
              <ActionIcon size="lg" radius="md" onClick={handleChangeAllCharOutBoxSelect}>
                {selectMax ? <IconSquareCheck /> : charSelectOutBox.length !== 0 ? <IconSquareDot /> : <IconSquare />}
              </ActionIcon>
            )}
            <ActionIcon size="lg" color="blue" radius="md" onClick={handleSaveCharBox}>
              <IconDeviceFloppy />
            </ActionIcon>
            <Indicator label={!setting.charBoxEditing ? charTypeOutBox.length : charTypeInBox.length} size={16}>
              <ActionIcon size="lg" radius="md" onClick={onClickFilter}>
                <IconFilter />
              </ActionIcon>
            </Indicator>
          </Group>
        </Header>
        <Divider />
        {!setting.charBoxEditing ? (
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
            <ScrollArea sx={{ height: !setting.charBoxEditing ? '370px' : '' }}>
              <CharList
                filterCharData={charTypeInBox}
                selectKeys={charSelectInBox}
                onSelect={(key) => setCharSelectInBox([...charSelectInBox, key])}
                onSelectCancel={(key) => setCharSelectInBox((c) => c.filter((i) => i !== key))}
              />
            </ScrollArea>
          </>
        ) : (
          <ScrollArea sx={{ height: !setting.charBoxEditing ? '370px' : '850px' }}>
            <CharBoxList filterChar={filterChar} />
          </ScrollArea>
        )}
        <Divider />
        <Group position="center">
          <Button
            variant={setting.charBoxEditing ? 'outline' : 'filled'}
            color="indigo"
            leftIcon={<IconExchange />}
            onClick={() => setSettingKeyValue('charBoxEditing', !setting.charBoxEditing)}
          >
            {setting.charBoxEditing ? '练度编辑模式' : '持有编辑模式'}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
