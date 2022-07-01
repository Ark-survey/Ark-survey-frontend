import { Button, Stack, ScrollArea, Group, Divider, ActionIcon, Indicator } from '@mantine/core';
import Header from 'src/components/Header';
import {
  IconChevronsDown,
  IconChevronsUp,
  IconExchange,
  IconFilter,
  IconSquare,
  IconSquareCheck,
  IconSquareDot,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import CharBoxList from './CharBoxList';
import { useMemo, useState } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { Character, Module, Skill } from 'src/service/CharBoxServer';
import { CharacterType, useDataMap, useSetting } from 'src/pages/store';
import useCharBox from '../../useCharBox';
import CardRoot from 'src/components/CardRoot';
import AvatarList from 'src/components/@arksurvey/AvatarList';

export default function Index({
  filterChar,
  onClickFilter,
}: {
  filterChar: (char: CharacterType) => boolean;
  onClickFilter: () => void;
}) {
  const { charMap } = useDataMap();
  const { charBox, addCharToBox, delCharFromBox, isLoading } = useCharBox();
  const { setting, setSettingKeyValue } = useSetting();
  const { t } = useTranslation();

  const [charSelectInBox, setCharSelectInBox] = useState<string[]>([]);
  const [charSelectOutBox, setCharSelectOutBox] = useState<string[]>([]);

  const charTypeInBox = useMemo(() => {
    const charInBoxArray = mapToArray(charBox?.characterKeys ?? {});
    return mapToArray(charMap).filter((it) => {
      return charInBoxArray.findIndex((i) => i.key === it.key) > -1 && filterChar(it);
    });
  }, [charBox, charMap, filterChar]);

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
    delCharFromBox.mutate(charSelectInBox);
    setCharSelectInBox([]);
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
          level: 0,
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
    addCharToBox.mutate(obj);
    setCharSelectOutBox([]);
  };

  return (
    <CardRoot loading={isLoading}>
      <Stack>
        <Header title={setting.charBoxEditing ? '干员盒' : '持有编辑'}>
          <Group position="right" spacing={10}>
            {!setting.charBoxEditing && (
              <ActionIcon size="lg" radius="md" onClick={handleChangeAllCharOutBoxSelect}>
                {selectMax ? <IconSquareCheck /> : charSelectOutBox.length !== 0 ? <IconSquareDot /> : <IconSquare />}
              </ActionIcon>
            )}
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
              <AvatarList
                charDataList={charTypeOutBox}
                selectKeys={charSelectOutBox}
                onSelectChange={(key, changeTo) =>
                  setCharSelectOutBox((c) => (changeTo ? [...charSelectOutBox, key] : c.filter((i) => i !== key)))
                }
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
              <AvatarList
                charDataList={charTypeInBox}
                selectKeys={charSelectInBox}
                onSelectChange={(key, changeTo) =>
                  setCharSelectInBox((c) => (changeTo ? [...charSelectInBox, key] : c.filter((i) => i !== key)))
                }
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
    </CardRoot>
  );
}
