import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

export default function DeleteTierPopover({ onSubmit }: { onSubmit?: () => void }) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();

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
          <Button
            sx={{ marginTop: '15px' }}
            radius="xl"
            color="red"
            onClick={() => {
              setOpened(false);
              onSubmit?.();
            }}
          >
            {t('confirm-del')}
          </Button>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}
