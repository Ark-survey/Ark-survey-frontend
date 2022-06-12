import { Group, Divider, Paper, Stack, createStyles, ActionIcon, ScrollArea } from '@mantine/core';
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
import { successNotice } from '../components/Notice';
import { useTranslation } from 'react-i18next';
import { editingTierList } from 'src/store/slice/TierListSlice';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { Aperture } from 'tabler-icons-react';
import CardRoot from 'src/components/CardRoot';

export default function Index() {
  const tierList = useSelector(editingTierList);
  const dispatch = useDispatch();
  const tiersBox = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const [makingImg, setMakingImg] = useState(false);
  const { addTierChars, delTierOneChar, findTierIndexByValue, moveTierChars } = useOperateEditingTierList();

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
    </CardRoot>
  );
}
