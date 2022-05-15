import { Center, Paper, InputWrapper, TextInput, Button, Space, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TierListServer } from 'src/api';
import { RootState } from 'src/store';
import { updateAllCharacterPicked, updateCharacterPicked } from 'src/store/slice/characterSlice';
import { loadUserTierList, resetUserTierList } from 'src/store/slice/tierSlice';
import { updateNewTierListStatus } from 'src/store/slice/userSlice';
import { successNotice } from '../components/Notice';

export default function Index() {
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const fetchFindTierList = useCallback(async ({ id }: { id: string }) => {
    return await new TierListServer().findById({ id });
  }, []);

  const handleCreateTierList = () => {
    dispatch(updateNewTierListStatus(true));
    dispatch(resetUserTierList());
    dispatch(updateAllCharacterPicked(false));
  };

  const form = useForm({
    initialValues: {
      id: '',
    },

    validate: {
      id: (id) => (id ? null : '不能为空'),
    },
  });

  const { setFieldError } = form;

  const handleConfirm = ({ id }: { id: string }) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetchFindTierList({ id });
        if (!res?.data?.id) {
          setFieldError('id', '未查询到该 ID 数据');
          dispatch(resetUserTierList());
          dispatch(updateAllCharacterPicked(false));
        } else {
          res.data.tierList.forEach((item) => {
            item.characterKeys.forEach((key) => {
              dispatch(updateCharacterPicked({ key, picked: true }));
            });
          });
          dispatch(loadUserTierList(res.data));
          dispatch(updateNewTierListStatus(false));
          successNotice('等级表数据加载成功');
        }
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Center style={{ width: '100%', maxHeight: '100%', height: '500px' }}>
      <Paper shadow="xs" p="md" radius="lg">
        <form onSubmit={form.onSubmit(handleConfirm)}>
          <InputWrapper
            label="调查表单 ID"
            description="如果您尚未提交过表单，请点击「新建表单」按钮。切勿重复创建同一类型的表单！"
          >
            <TextInput {...form.getInputProps('id')} placeholder="您上次提交的调查表单的ID" />
          </InputWrapper>
          <Space h="sm" />
          <Group spacing="sm" position="right">
            <Button size="xs" variant="outline" radius="lg" onClick={handleCreateTierList}>
              新建表单
            </Button>
            <Button size="xs" radius="lg" loading={loading} type="submit" color={userTierList.id && 'green'}>
              加载表单
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
