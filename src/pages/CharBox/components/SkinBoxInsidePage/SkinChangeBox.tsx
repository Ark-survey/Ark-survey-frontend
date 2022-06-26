import { Button, Stack, ScrollArea, Group, Divider, Paper, ActionIcon, Indicator } from '@mantine/core';
import Header from 'src/components/Header';
import {
  IconChevronsDown,
  IconChevronsUp,
  IconFilter,
  IconSquare,
  IconSquareCheck,
  IconSquareDot,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { CharacterType, useDataMap } from 'src/pages/store';
import SkinList from './SkinList';
import useSkinBox from '../../useSkinBox';
import { errorNotice } from 'src/components/Notice';
import CardRoot from 'src/components/CardRoot';

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
  const { skinBox, updateLocalSkinBox, isLoading } = useSkinBox();

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
    () => charSkinList.filter((it) => skinBox?.charSkinKeys?.find((i) => i === it.skinKey) && filterChar(it)),
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
    if (skinSelectOutBox.length === 0) {
      errorNotice('请先至少选择一个未持有的皮肤！');
      return;
    }
    updateLocalSkinBox.mutate({
      ...skinBox,
      charSkinKeys: [...(skinBox?.charSkinKeys ?? []), ...skinSelectOutBox],
    });

    setSkinSelectOutBox([]);
  };

  const handleCharOut = () => {
    if (skinSelectInBox.length === 0) {
      errorNotice('请先至少选择一个已持有的皮肤！');
      return;
    }
    updateLocalSkinBox.mutate({
      ...skinBox,
      charSkinKeys: skinBox?.charSkinKeys?.filter((key) => !skinSelectInBox.includes(key)),
    });
    setSkinSelectInBox([]);
  };

  return (
    <CardRoot loading={isLoading}>
      <Stack>
        <Header title="持有编辑">
          <Group position="right" spacing={10}>
            <ActionIcon size="lg" radius="md" onClick={handleChangeAllCharOutBoxSelect}>
              {selectMax ? <IconSquareCheck /> : skinSelectOutBox.length !== 0 ? <IconSquareDot /> : <IconSquare />}
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
          <SkinList<SkinAvatar>
            filterData={skinInBox}
            selectKeys={skinSelectInBox}
            onSelect={(key) => setSkinSelectInBox([...skinSelectInBox, key])}
            onSelectCancel={(key) => setSkinSelectInBox((c) => c.filter((i) => i !== key))}
          />
        </ScrollArea>
      </Stack>
    </CardRoot>
  );
}
