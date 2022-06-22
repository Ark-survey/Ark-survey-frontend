import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';

import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { IconClearAll } from '@tabler/icons';

export default function ResetAllCharacterPopover() {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { delAllTierChar } = useOperateEditingTierList();

  const handleConfirm = () => {
    delAllTierChar();
    successNotice(t('reset-successfully'));
    setOpened(false);
  };

  return (
    <Popover opened={opened} onClose={() => setOpened(false)} width={160} position="bottom" withArrow>
      <Popover.Target>
        <ActionIcon size="lg" color="red" radius="md" onClick={() => setOpened((o) => !o)}>
          <IconClearAll />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">{t('reset-confirm')}</Text>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Button sx={{ marginTop: '15px' }} radius="xl" color="red" onClick={handleConfirm}>
            {t('confirm-reset')}
          </Button>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}
