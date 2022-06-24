import { Button, Stack, ScrollArea, Group, Divider, Paper, ActionIcon, Indicator } from '@mantine/core';
import Header from 'src/components/Header';
import {
  IconChevronsDown,
  IconChevronsUp,
  IconDeviceFloppy,
  IconFilter,
  IconSquare,
  IconSquareCheck,
  IconSquareDot,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { CharacterType, useDataMap } from 'src/pages/store';
import CharList from '../CharExchangeBox/CharList';
import SkinList from './SkinList';
import useSkinBox from '../../useSkinBox';

interface SkinAvatar extends CharacterType {
  skinKey: string;
}

export default function Index({
  filterChar,
  onClickFilter,
}: {
  filterChar: (char: CharacterType) => boolean;
  onClickFilter: () => void;
}) {
  const { charMap } = useDataMap();
  const { t } = useTranslation();
  const { skinBox, updateLocalSkinBox, uploadSkinBox } = useSkinBox();

  const [skinSelectInBox, setSkinSelectInBox] = useState<string[]>([]);
  const [skinSelectOutBox, setSkinSelectOutBox] = useState<string[]>([]);

  const charSkinList = useMemo(() => {
    let skins: SkinAvatar[] = [];
    mapToArray(charMap).forEach((it, index) => {
      skins.push(
        ...Object.keys(it.skins)
          .map((key) => ({ skinKey: key, ...it }))
          .filter((i) => i.skinKey.includes('#')),
      );
    });
    return skins;
  }, [charMap]);

  const skinInBox = useMemo(
    () => charSkinList.filter((it) => skinBox?.charSkinKeys?.find((i) => i === it.key) && filterChar(it)),
    [charSkinList, filterChar, skinBox?.charSkinKeys],
  );

  const skinOutBox = useMemo(() => {
    return charSkinList.filter((it) => {
      return skinInBox.findIndex((i) => i.key === it.key) === -1 && filterChar(it);
    });
  }, [charSkinList, filterChar, skinInBox]);

  const selectMax = skinOutBox.length !== 0 && skinOutBox.length === skinSelectOutBox.length;

  const handleChangeAllCharOutBoxSelect = () => {
    if (selectMax) setSkinSelectOutBox([]);
    else setSkinSelectOutBox(skinOutBox.map((it) => it.skinKey));
  };

  const handleCharIn = () => {
    updateLocalSkinBox.mutate({
      ...skinBox,
      charSkinKeys: [...(skinBox?.charSkinKeys ?? []), ...skinSelectOutBox],
    });
    console.log([...(skinBox?.charSkinKeys ?? []), ...skinSelectOutBox]);

    setSkinSelectOutBox([]);
  };

  const handleCharOut = () => {
    updateLocalSkinBox.mutate({
      ...skinBox,
      charSkinKeys: skinBox?.charSkinKeys?.filter((key) => !skinSelectInBox.includes(key)),
    });
    setSkinSelectInBox([]);
  };

  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder sx={{ flex: '1' }}>
      <Stack>
        <Header title="持有编辑">
          <Group position="right" spacing={10}>
            <ActionIcon size="lg" radius="md" onClick={handleChangeAllCharOutBoxSelect}>
              {selectMax ? <IconSquareCheck /> : skinSelectOutBox.length !== 0 ? <IconSquareDot /> : <IconSquare />}
            </ActionIcon>
            <ActionIcon size="lg" color="blue" radius="md" onClick={() => uploadSkinBox.mutate()}>
              <IconDeviceFloppy />
            </ActionIcon>
            <Indicator label={skinOutBox.length} size={16}>
              <ActionIcon size="lg" radius="md" onClick={onClickFilter}>
                <IconFilter />
              </ActionIcon>
            </Indicator>
          </Group>
        </Header>
        <Divider />
        <ScrollArea sx={{ height: '370px' }}>
          <SkinList<SkinAvatar>
            filterData={skinOutBox}
            selectKeys={skinSelectOutBox}
            onSelect={(key) => setSkinSelectOutBox([...skinSelectOutBox, key])}
            onSelectCancel={(key) => setSkinSelectOutBox((c) => c.filter((i) => i !== key))}
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
        <ScrollArea sx={{ height: '370px' }}>
          <CharList
            filterCharData={skinInBox}
            selectKeys={skinSelectInBox}
            onSelect={(key) => setSkinSelectInBox([...skinSelectInBox, key])}
            onSelectCancel={(key) => setSkinSelectInBox((c) => c.filter((i) => i !== key))}
          />
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
