import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';

export default function DeleteTierPopover({ tierValue }: { tierValue: number }) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { delOneTier, findTierIndexByValue } = useOperateEditingTierList();

  const handleConfirm = () => {
    delOneTier(findTierIndexByValue(tierValue) ?? 0);
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
