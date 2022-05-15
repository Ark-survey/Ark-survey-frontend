import { useCallback, useState } from 'react';
import { Popover, Text, Button, Box } from '@mantine/core';
import { CloudUpload } from 'tabler-icons-react';
import { TierListServer } from 'src/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { loadUserTierList } from 'src/store/slice/tierSlice';
import { updateNewTierListStatus } from 'src/store/slice/userSlice';
import { successNotice } from '../../components/Notice';

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const useTierList = useSelector((state: RootState) => state.userTierList);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const fetchCreateTierList = useCallback(async () => {
    return await new TierListServer().createOne(useTierList);
  }, [useTierList]);

  const fetchUpdateTierList = useCallback(async () => {
    return await new TierListServer().updateOne(useTierList);
  }, [useTierList]);

  const handleCopyText = useCallback(async () => {
    if (useTierList.id) {
      navigator.clipboard.writeText(useTierList.id);
      successNotice('已复制到剪贴板');
    }
  }, [useTierList.id]);

  const handleTierListSubmit = useCallback(async () => {
    setOpened(false);
    setLoading(true);
    try {
      if (user.newTierList) {
        const res = await fetchCreateTierList();
        dispatch(loadUserTierList(res.data));
        dispatch(updateNewTierListStatus(false));
      } else {
        const res = await fetchUpdateTierList();
        dispatch(loadUserTierList(res.data));
      }
      successNotice('等级表数据上传成功');
      // todo
    } finally {
      setLoading(false);
    }
  }, [dispatch, fetchCreateTierList, fetchUpdateTierList, user.newTierList]);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          radius="xl"
          size="xs"
          loading={loading}
          leftIcon={<CloudUpload size={14} />}
          onClick={() => setOpened((o) => !o)}
        >
          {user.newTierList ? '提交' : '更新'}
        </Button>
      }
      width={user.newTierList ? 220 : 300}
      position="left"
      withArrow
    >
      {user.newTierList ? (
        <Text size="sm" sx={{ marginBottom: '15px' }}>
          注意：提交之后页面会显示您的唯一 ID，下次进入本页面时输入您的 ID 即可获取之前提交的数据。
        </Text>
      ) : (
        <Text
          size="sm"
          align="center"
          sx={{ marginBottom: '15px', fontSize: '10px', cursor: 'pointer' }}
          onClick={handleCopyText}
        >
          点击复制您的表单 ID 至剪贴板
          <br />
          {useTierList.id}
        </Text>
      )}
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button radius="xl" onClick={handleTierListSubmit}>
          {user.newTierList ? '了解，继续提交' : '确认更新数据'}
        </Button>
      </Box>
    </Popover>
  );
}
