import { useCallback, useState } from 'react';
import { Popover, Text, Button, Box, ActionIcon } from '@mantine/core';
import { IconCloudUpload, IconRefresh } from '@tabler/icons';
import { TierListServer } from 'src/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { successNotice } from '../../../../components/Notice';
import { useTranslation } from 'react-i18next';
import { editingTierList, updateEditingTierList } from 'src/store/slice/TierListSlice';

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const tierList = useSelector(editingTierList);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchCreateTierList = useCallback(async () => {
    return await new TierListServer().createOne({
      tierList: { ...tierList, userId: user?.userData?.id },
      userId: user?.userData?.id ?? '',
    });
  }, [tierList, user?.userData?.id]);

  const fetchUpdateTierList = useCallback(async () => {
    return await new TierListServer().updateOne({
      tierList: { ...tierList, userId: user?.userData?.id },
      userId: user?.userData?.id ?? '',
    });
  }, [tierList, user?.userData?.id]);

  const handleTierListSubmit = useCallback(async () => {
    setOpened(false);
    setLoading(true);
    try {
      if (!tierList.id) {
        const { data } = await fetchCreateTierList();
        dispatch(updateEditingTierList({ tierList: data }));
      } else {
        const { data } = await fetchUpdateTierList();
        dispatch(updateEditingTierList({ tierList: data }));
      }
      successNotice(t('upload-success'));
      // todo
    } finally {
      setLoading(false);
    }
  }, [dispatch, fetchCreateTierList, fetchUpdateTierList, t, tierList.id]);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      width={user.newTierList ? 200 : 300}
      position="left"
      withArrow
    >
      <Popover opened={opened} onClose={() => setOpened(false)} width={160} position="bottom" withArrow>
        <Popover.Target>
          <ActionIcon size="lg" color="blue" loading={loading} radius="md" onClick={() => setOpened((o) => !o)}>
            {tierList.id ? <IconRefresh /> : <IconCloudUpload />}
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm" sx={{ marginBottom: '15px' }}>
            {t('upload-confirm')}
          </Text>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Button radius="xl" onClick={handleTierListSubmit}>
              {!tierList.id ? t('continue-upload') : t('continue-update')}
            </Button>
          </Box>
        </Popover.Dropdown>
      </Popover>
    </Popover>
  );
}
