import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { updateCharacterPicked } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import useTierList from '../../useTierList';

export default function DeleteTierPopover({ tierValue }: { tierValue: number }) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { tierList } = useTierList();
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const dispatch = useDispatch();
  const { delOneTier, findTierIndexByValue } = useOperateEditingTierList();

  const handleConfirm = () => {
    delOneTier(findTierIndexByValue(tierValue) ?? 0);

    const tierIndex = tierList?.tiers?.findIndex((item) => item.value === tierValue) ?? 0;
    Object.keys(charMap).forEach((key) => {
      if (tierList?.tiers?.[tierIndex].characterKeys.includes(key)) {
        dispatch(updateCharacterPicked({ key, picked: false }));
      }
    });
    successNotice(t('level-del-successfully'));
    setOpened(false);
  };

  return (
    <Popover opened={opened} onClose={() => setOpened(false)} width={210} position="right" withArrow>
      <Popover.Target>
        <ActionIcon
          sx={{
            background: '#fff',
          }}
          size="xs"
          radius="xs"
          onClick={() => setOpened((o) => !o)}
        >
          <IconTrash />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">{t('del-tier-confirm')}</Text>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Button sx={{ marginTop: '15px' }} radius="xl" color="red" onClick={handleConfirm}>
            {t('confirm-del')}
          </Button>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}