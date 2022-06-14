import { useEffect, useMemo, useState } from 'react';
import { Dialog, Group, Button, TextInput, Text, ScrollArea, Box, Title, Stack, List } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { VersionAnnouncement, VersionAnnouncementServer } from 'src/api/AnnouncementServer';

export default function useVersionDialog() {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState<VersionAnnouncement[]>([]);

  const fetchVersionAnnouncements = async () => {
    const { data } = await new VersionAnnouncementServer().getList();
    setAnnouncements(data);
  };

  useEffect(() => {
    const timeout = setTimeout(() => fetchVersionAnnouncements(), 100);
    return () => clearTimeout(timeout);
  }, []);

  const dialogContext = useMemo(() => {
    return (
      <Dialog
        opened={opened}
        withCloseButton
        position={{ bottom: 20, left: 20 }}
        onClose={() => setOpened(false)}
        transition="slide-up"
        size="md"
        radius="md"
      >
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          {t('versionDialog.title')}
        </Text>
        <ScrollArea style={{ height: 250 }}>
          <Stack>
            {announcements?.map((it, index) => {
              return (
                <Box key={index}>
                  <Title order={4}>{it.version + ' ' + it.overview}</Title>
                  <List>
                    {it.descriptions?.map((description, i) => (
                      <List.Item key={i}>{description}</List.Item>
                    ))}
                  </List>
                </Box>
              );
            })}
          </Stack>
        </ScrollArea>
      </Dialog>
    );
  }, [announcements, opened, t]);

  return { dialogContext, setOpened };
}
