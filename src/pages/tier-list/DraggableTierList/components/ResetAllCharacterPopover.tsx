import { useState } from 'react';
import { Popover, Button, Box, Text } from '@mantine/core';

import { delAllCharacterByTier } from 'src/store/slice/tierSlice';
import { updateAllCharacterPicked } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { successNotice } from '../../components/Notice';
import { useTranslation } from 'react-i18next';

export default function ResetAllCharacterPopover() {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    tiers.forEach((tier) => {
      dispatch(delAllCharacterByTier({ tierValue: tier.value }));
    });

    dispatch(updateAllCharacterPicked(false));
    successNotice(t('reset-successfully'));
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button size="xs" variant="outline" color="red" radius="xl" onClick={() => setOpened((o) => !o)}>
          {t('reset')}
        </Button>
      }
      width={160}
      position="bottom"
      withArrow
    >
      <Text size="sm">{t('reset-confirm')}</Text>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button sx={{ marginTop: '15px' }} radius="xl" color="red" onClick={handleConfirm}>
          {t('confirm-reset')}
        </Button>
      </Box>
    </Popover>
  );
}
