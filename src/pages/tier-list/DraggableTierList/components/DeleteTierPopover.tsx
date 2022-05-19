import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { delTier } from 'src/store/slice/tierSlice';
import { updateCharacterPicked } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { successNotice } from '../../components/Notice';
import { useTranslation } from 'react-i18next';

export default function DeleteTierPopover({ tierValue }: { tierValue: number }) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(delTier({ tierValue }));

    const tierIndex = tiers.findIndex((item) => item.value === tierValue);
    Object.keys(charMap).forEach((key) => {
      if (tiers[tierIndex].characterKeys.includes(key)) {
        dispatch(updateCharacterPicked({ key, picked: false }));
      }
    });
    successNotice(t('level-del-successfully'));
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon
          sx={{
            background: '#fff',
          }}
          size="xs"
          radius="xs"
          onClick={() => setOpened((o) => !o)}
        >
          <Trash />
        </ActionIcon>
      }
      width={210}
      position="right"
      placement="center"
      withArrow
    >
      <Text size="sm">{t('del-tier-confirm')}</Text>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button sx={{ marginTop: '15px' }} radius="xl" color="red" onClick={handleConfirm}>
          {t('confirm-del')}
        </Button>
      </Box>
    </Popover>
  );
}
