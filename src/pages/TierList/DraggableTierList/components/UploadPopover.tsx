import { useState } from 'react';
import { Popover, Text, Button, Box, ActionIcon } from '@mantine/core';
import { IconCloudUpload, IconRefresh } from '@tabler/icons';
import useTierList from '../../useTierList';
import { useTranslation } from 'react-i18next';

export default function UploadPopover() {
  const { t } = useTranslation();

  // state
  const [opened, setOpened] = useState(false);
  const { tierList, uploadTierList } = useTierList();

  return (
    <Popover opened={opened} onClose={() => setOpened(false)} width={300} position="left" withArrow>
      <Popover opened={opened} onClose={() => setOpened(false)} width={160} position="bottom" withArrow>
        <Popover.Target>
          <ActionIcon
            size="lg"
            color="blue"
            radius="md"
            loading={uploadTierList.isLoading}
            onClick={() => setOpened((o) => !o)}
          >
            {tierList?.id ? <IconRefresh /> : <IconCloudUpload />}
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm" sx={{ marginBottom: '15px' }}>
            {t('upload-confirm')}
          </Text>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Button
              radius="xl"
              onClick={() => {
                setOpened(false);
                uploadTierList.mutate();
              }}
            >
              {tierList?.id ? t('continue-upload') : t('continue-update')}
            </Button>
          </Box>
        </Popover.Dropdown>
      </Popover>
    </Popover>
  );
}
