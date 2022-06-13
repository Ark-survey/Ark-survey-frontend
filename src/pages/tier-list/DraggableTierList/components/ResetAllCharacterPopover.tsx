import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';

import { updateAllCharacterPicked } from 'src/store/slice/characterSlice';
import { useDispatch } from 'react-redux';
import { successNotice } from '../../../../components/Notice';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { IconClearAll } from '@tabler/icons';

export default function ResetAllCharacterPopover() {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { delAllTierChar } = useOperateEditingTierList();

  const handleConfirm = () => {
    delAllTierChar();

    dispatch(updateAllCharacterPicked(false));
    successNotice(t('reset-successfully'));
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon size="lg" color="red" radius="md" onClick={() => setOpened((o) => !o)}>
          <IconClearAll />
        </ActionIcon>
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
