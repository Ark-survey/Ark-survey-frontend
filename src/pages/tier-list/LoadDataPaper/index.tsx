import { Center, Paper, InputWrapper, TextInput, Button, Space, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      id: (id) => (id ? null : t('can-not-be-empty')),
    },
  });

  const { setFieldError } = form;

  const handleConfirm = ({ id }: { id: string }) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetchFindTierList({ id });
        if (!res?.data?.id) {
          setFieldError('id', t('no-corresponding-data-for-this-ID'));
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
          successNotice(t('grade-table-data-loaded-successfully'));
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
          <InputWrapper label={t('ID-check')} description={t('ID-check-warning')}>
            <TextInput {...form.getInputProps('id')} placeholder={t('ID-check-placeholder')} />
          </InputWrapper>
          <Space h="sm" />
          <Group spacing="sm" position="right">
            <Button size="xs" variant="outline" radius="lg" onClick={handleCreateTierList}>
              {t('new-form')}
            </Button>
            <Button size="xs" radius="lg" loading={loading} type="submit" color={userTierList.id && 'green'}>
              {t('load-form')}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
