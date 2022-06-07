import { Button, Stack, ScrollArea, Group, Divider, Paper, createStyles } from '@mantine/core';
import Header from 'src/components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { ChevronsDown, ChevronsUp, Exchange } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import CharList from './CharList';
import { updateCharBoxEditing } from 'src/store/slice/settingSlice';
import CharBoxList from './CharBoxList';
import { useMemo, useState } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { addCharToBox, delCharFromBox } from 'src/store/slice/charBoxSlice';
import { Character, Module, Skill } from 'src/api/CharBoxServer';

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: 686,
  },
}));

export default function Index({ onClickFilter }: { onClickFilter: () => void }) {
  const filters = useSelector((state: RootState) => state.filters);
  const charData = useSelector((state: RootState) => mapToArray(state.user.charData));
  const charInBox = useSelector((state: RootState) => mapToArray(state.charBox.charInBox));
  const { charBoxEditing } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { classes } = useStyles();

  const [charSelectInBox, setCharSelectInBox] = useState<string[]>([]);
  const [charSelectOutBox, setCharSelectOutBox] = useState<string[]>([]);

  const charTypeInBox = useMemo(
    () =>
      charData.filter((it) => {
        return charInBox.findIndex((i) => i.key === it.key) > -1;
      }),
    [charData, charInBox],
  );

  const charTypeOutBox = useMemo(
    () =>
      charData.filter((it) => {
        if (it.isNotObtainable) return false;
        return charTypeInBox.findIndex((i) => i.key === it.key) === -1;
      }),
    [charData, charTypeInBox],
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

  const handleCharIn = () => {
    const c = [...charTypeOutBox].filter((it) => charSelectOutBox.findIndex((i) => i === it.key) > -1);
    const obj: { [key: string]: Character } = {};
    c.forEach((it) => {
      const newSkills: { [key: string]: Skill } = {};
      Object.keys({ ...it.skills }).forEach((key) => {
        newSkills[key] = {
          ...it.skills[key],
          level: 1,
          key,
        };
      });
      const newModule: { [key: string]: Module } = {};
      Object.keys({ ...it.equips }).forEach((key) => {
        newModule[key] = {
          ...it.equips[key],
          level: 1,
          key,
        };
      });
      obj[it.key] = {
        key: it.key,
        name: it.name,
        isNotObtainable: it.isNotObtainable,
        moduleUse: '',
        skillUse: Object.keys(it.skills).find((i) => it.skills[i].index === 0) ?? '',
        skinUse: Object.keys(it.skins)[0],
        favorite: false,
        level: 1,
        elite: 0,
        trust: 200,
        potentialLevel: 0,
        skill: newSkills,
        module: newModule,
      };
    });
    dispatch(addCharToBox(obj));
    setCharSelectOutBox([]);
  };

  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder className={classes.root}>
      <Stack>
        <Header title={charBoxEditing ? '干员盒' : '持有编辑'}>
          <Group position="right" spacing={10}>
            {!charBoxEditing && (
              <Button
                size="xs"
                variant="outline"
                color={selectMax ? 'red' : 'green'}
                radius="xl"
                onClick={handleChangeAllCharOutBoxSelect}
              >
                {selectMax ? '取消全选' : '全选'}
              </Button>
            )}
            <Button size="xs" variant="outline" radius="xl" onClick={onClickFilter}>
              筛选器
            </Button>
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
              <Button leftIcon={<ChevronsUp />} size="xs" color="red" variant="outline" onClick={handleCharOut}>
                移至未持有
              </Button>
              <Button leftIcon={<ChevronsDown />} size="xs" variant="outline" onClick={handleCharIn}>
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
          <ScrollArea sx={{ height: !charBoxEditing ? '370px' : '370px' }}>
            <CharBoxList />
          </ScrollArea>
        )}
        <Divider />
        <Group position="center">
          <Button
            variant={charBoxEditing ? 'outline' : 'filled'}
            color="indigo"
            leftIcon={<Exchange />}
            onClick={() => dispatch(updateCharBoxEditing(!charBoxEditing))}
          >
            {charBoxEditing ? '练度编辑模式' : '持有编辑模式'}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
