import { Group, Divider, Paper, Stack, createStyles, ActionIcon, ScrollArea, Space } from '@mantine/core';
import Header from 'src/components/Header';

import { updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';

import { CharDragItem } from '../CharListBox/components/CharListItem';
import AddTierPopover from './components/AddTierPopover';
import ResetAllCharacterPopover from './components/ResetAllCharacterPopover';
import TierBox from './components/TierBox';
import UploadPopover from './components/UploadPopover';
import { useCallback, useRef, useState } from 'react';
import { capture } from 'src/utils/CaptureUtils';
import { format } from 'date-fns';
import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { IconAperture } from '@tabler/icons';
import CardRoot from 'src/components/CardRoot';
import useTierList from '../useTierList';

export default function Index() {
  const dispatch = useDispatch();
  const tiersBox = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const [makingImg, setMakingImg] = useState(false);
  const { addTierChars, delTierOneChar, findTierIndexByValue, moveTierChars } = useOperateEditingTierList();

  const { tierList } = useTierList();

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

  return (
    <CardRoot>
      <Stack>
        <Header title="等级表编辑">
          <Group>
            <ResetAllCharacterPopover />
            <AddTierPopover />
            <ActionIcon disabled size="lg" radius="md" onClick={makeTierImg}>
              <IconAperture />
            </ActionIcon>
            <UploadPopover />
          </Group>
        </Header>
        <Divider />
        <ScrollArea ref={tiersBox} id="tierList">
          <Stack spacing={22} sx={{ maxHeight: '600px', height: '100%' }}>
            <Space />
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
    </CardRoot>
  );
}
