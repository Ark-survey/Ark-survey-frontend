import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';

import { useTranslation } from 'react-i18next';
import { IconClearAll } from '@tabler/icons';

export default function ResetAllCharacterPopover({ onSubmit }: { onSubmit?: () => void }) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();

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
          <Button
            sx={{ marginTop: '15px' }}
            radius="xl"
            color="red"
            onClick={() => {
              setOpened(false);
              onSubmit?.();
            }}
          >
            {t('confirm-reset')}
          </Button>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}
