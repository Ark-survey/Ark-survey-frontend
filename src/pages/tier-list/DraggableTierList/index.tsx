import {
  Text,
  Box,
  Button,
  Group,
  Select,
  Divider,
  Paper,
  Stack,
  createStyles,
  ActionIcon,
  ScrollArea,
} from '@mantine/core';
import Header from 'src/components/Header';

import { updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';

import { CharDragItem } from '../CharListBox/components/CharListItem';
import AddTierPopover from './components/AddTierPopover';
import ResetAllCharacterPopover from './components/ResetAllCharacterPopover';
import TierBox from './components/TierBox';
import UploadPopover from './components/UploadPopover';
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { capture } from 'src/utils/CaptureUtils';
import { format } from 'date-fns';
import { successNotice } from '../components/Notice';
import { useTranslation } from 'react-i18next';
import { treeToArray } from 'src/utils/TreeUtils';
import { editingTierList, updateEditKey1, updateEditKey2 } from 'src/store/slice/TierListSlice';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { Aperture } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: 686,
    width: '100%',
  },
}));

export default function Index() {
  const listTypeCollection = useSelector((state: RootState) => state.tierListType.collection);
  const tierListType = useSelector((state: RootState) => state.tierList);
  const tierList = useSelector(editingTierList);
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const tiersBox = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const [makingImg, setMakingImg] = useState(false);
  const { addTierChars, delTierOneChar, findTierIndexByValue, moveTierChars } = useOperateEditingTierList();

  const type1List = useMemo(() => {
    const list = listTypeCollection.map((it) => ({
      value: it.id,
      label: it.name,
    }));
    dispatch(updateEditKey1(list[0].value));
    return list;
  }, [dispatch, listTypeCollection]);

  const type2List = useMemo(() => {
    let list = [];
    if (tierListType.key1Select === 'AE') {
      list = treeToArray(listTypeCollection[0].children).map((it) => ({
        value: it.id,
        label: it.name,
        road: it.roadId,
        description: it.description,
      }));
    } else {
      list = treeToArray(listTypeCollection[1].children, [1, 2], (node, road, level) => {
        if (level === 0) {
          return node.id;
        } else if (level === 1) {
          return road + '#' + node.id + ' ' + node.name;
        } else {
          return road + ' ' + node.name;
        }
      }).map((it) => ({
        value: it.id,
        label: it.road,
        road: it.roadId,
        description: it.description,
      }));
    }
    dispatch(updateEditKey2({ key: list[0].value, road: list[0].road ?? '' }));
    return list;
  }, [dispatch, listTypeCollection, tierListType.key1Select]);

  const handleDropCharacterOnTier = useCallback(
    ({ charKey, type, fromTierValue }: CharDragItem, toTierValue: number) => {
      if (type === 'default' || (type === 'tier-list' && fromTierValue !== toTierValue)) {
        dispatch(updateCharacterPicked({ key: charKey ?? '', picked: true }));
        dispatch(updateCharacterSelecting({ key: charKey ?? '', selecting: false }));
        if (type === 'tier-list') {
          moveTierChars(
            findTierIndexByValue(fromTierValue ?? 0) ?? 0,
            findTierIndexByValue(toTierValue) ?? 0,
            charKey ?? '',
          );
        } else {
          addTierChars(findTierIndexByValue(toTierValue) ?? 0, [charKey ?? '']);
        }
      }
    },
    [addTierChars, dispatch, findTierIndexByValue, moveTierChars],
  );

  const makeTierImg = useCallback(() => {
    setMakingImg(true);
    setTimeout(async () => {
      if (tiersBox.current) {
        await capture(tiersBox.current.id, t('tier-list') + ' ' + format(new Date().getTime(), t('screenshot-time')));
        successNotice(t('downloaded-successfully'));
      }
      setMakingImg(false);
    });
  }, [t]);

  const handleType1Change = (value: string) => {
    dispatch(updateEditKey1(value));
  };

  const handleType2Change = (value: string) => {
    const typeItem = type2List.find((it) => it.value === value);
    dispatch(updateEditKey2({ key: value, road: typeItem?.road ?? '' }));
  };

  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder className={classes.root}>
      <Stack>
        <Header
          title={
            <>
              <Select
                sx={{ width: '75px' }}
                value={tierListType.key1Select}
                onChange={handleType1Change}
                data={type1List}
              />
              <Select
                sx={{ width: '220px' }}
                value={tierListType.key2Select}
                onChange={handleType2Change}
                itemComponent={SelectItem}
                searchable
                data={type2List}
              />
            </>
          }
        >
          <Group>
            <ResetAllCharacterPopover />
            <AddTierPopover />
            <ActionIcon disabled size="lg" radius="md" onClick={makeTierImg}>
              <Aperture />
            </ActionIcon>
            <UploadPopover />
          </Group>
        </Header>
        <Divider />
        <ScrollArea ref={tiersBox} id="tierList">
          <Stack>
            {tierList?.tiers?.map((tier) => (
              <TierBox
                key={tier.value}
                tier={tier}
                onDropCharacter={(item) => handleDropCharacterOnTier(item, tier.value ?? 0)}
                operationDisplay={!makingImg}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  </div>
));
