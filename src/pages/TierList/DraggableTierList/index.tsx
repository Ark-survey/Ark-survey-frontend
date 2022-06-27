import { Group, Divider, Stack, ActionIcon, ScrollArea, Space, Box } from '@mantine/core';
import Header from 'src/components/Header';
import { CharDragItem } from '../CharListBox/components/CharListItem';
import AddTierPopover from './components/AddTierPopover';
import ResetAllCharacterPopover from './components/ResetAllCharacterPopover';
import TierBox from './components/TierBox';
import { useCallback, useRef, useState } from 'react';
import { capture } from 'src/utils/CaptureUtils';
import { format } from 'date-fns';
import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { IconAperture } from '@tabler/icons';
import CardRoot from 'src/components/CardRoot';
import { Tier } from 'src/service/TierListServer';

export default function Index() {
  const tiersBox = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const [makingImg, setMakingImg] = useState(false);
  const {
    tierList,
    addTier,
    addTierChars,
    findTierIndexByValue,
    moveTierChars,
    delAllTierChar,
    delOneTier,
    updateOneTier,
  } = useOperateEditingTierList();

  const handleDropCharacterOnTier = useCallback(
    ({ charKey, type, fromTierValue }: CharDragItem, toTierValue: number) => {
      if (type === 'default' || (type === 'tier-list' && fromTierValue !== toTierValue)) {
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
    [addTierChars, findTierIndexByValue, moveTierChars],
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

  const handleReset = () => {
    delAllTierChar();
    successNotice(t('reset-successfully'));
  };

  const handleAdd = (tier: Tier) => {
    addTier(tier);
  };

  const handleDel = (tierValue: number) => {
    delOneTier(findTierIndexByValue(tierValue) ?? 0);
  };

  const handleUpdateTier = (oldValue: number, newTier: Tier) => {
    updateOneTier(findTierIndexByValue(oldValue) ?? 0, {
      ...newTier,
    });
  };

  return (
    <CardRoot>
      <Stack>
        <Header title="等级表编辑">
          <Group>
            <ResetAllCharacterPopover onSubmit={handleReset} />
            <AddTierPopover tierValueList={tierList?.tiers?.map((it) => it.value ?? 0) ?? []} onSubmit={handleAdd} />
            <ActionIcon disabled size="lg" radius="md" onClick={makeTierImg}>
              <IconAperture />
            </ActionIcon>
          </Group>
        </Header>
        <Divider />
        <ScrollArea ref={tiersBox} id="tierList" style={{ height: 600 }}>
          <Stack spacing={22} sx={{ height: '100%' }}>
            <Space />
            {tierList?.tiers?.map((tier) => (
              <TierBox
                key={tier.value}
                tier={tier}
                onTierUpdate={(newTier) => handleUpdateTier(tier.value ?? 0, newTier)}
                onDeleteChar={() => handleDel(tier.value ?? 0)}
                onDropCharacter={(item) => handleDropCharacterOnTier(item, tier.value ?? 0)}
                tierValueList={tierList?.tiers?.map((it) => it.value ?? 0) ?? []}
                operationDisplay={!makingImg}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </CardRoot>
  );
}
