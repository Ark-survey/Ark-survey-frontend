import { Center, Paper, InputWrapper, TextInput, Button, Space, Group, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UserServer } from 'src/api/UserServer';
import { updateUserData } from 'src/store/slice/userSlice';
import { errorNotice, successNotice } from '../../tier-list/components/Notice';

export default function Index() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const { data } = await new UserServer().createOne({});
      if (data.id) {
        dispatch(updateUserData({ id: data.id }));
        successNotice(t('loadUserPage.createSuccess'));
      } else {
        errorNotice(t('loadUserPage.networkError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async ({ id }: { id: string }) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const { data } = await new UserServer().getById({ id });
        if (data?.id) {
          dispatch(updateUserData({ id: data.id }));
          successNotice(t('loadUserPage.loadSuccess'));
        } else {
          setFieldError('id', t('no-corresponding-data-for-this-ID'));
        }
      } finally {
        setLoading(false);
      }
    }, 1000);
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

  // const handleConfirm = ({ id }: { id: string }) => {
  //   setLoading(true);
  //   setTimeout(async () => {
  //     try {
  //       const res = await fetchFindTierList({ id });
  //       if (!res?.data?.id) {
  //         setFieldError('id', t('no-corresponding-data-for-this-ID'));
  //         dispatch(resetUserTierList());
  //         dispatch(updateAllCharacterPicked(false));
  //       } else {
  //         res.data.tierList.forEach((item) => {
  //           item.characterKeys.forEach((key) => {
  //             dispatch(updateCharacterPicked({ key, picked: true }));
  //           });
  //         });
  //         dispatch(loadUserTierList(res.data));
  //
  //         successNotice(t('grade-table-data-loaded-successfully'));
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 1000);
  // };

  return (
    <Center style={{ width: '100%', maxHeight: '100%', height: '300px' }}>
      <Paper shadow="xs" p="md" radius="lg" sx={{ position: 'relative' }}>
        <form onSubmit={form.onSubmit(handleConfirm)}>
          <LoadingOverlay visible={loading} />
          <InputWrapper sx={{ width: '300px' }} label={t('ID-check')} description={t('ID-check-warning')}>
            <TextInput {...form.getInputProps('id')} placeholder={t('ID-check-placeholder')} />
          </InputWrapper>
          <Space h="sm" />
          <Group spacing="sm" position="right">
            <Button size="xs" variant="outline" radius="lg" onClick={handleCreateUser}>
              {t('new-form')}
            </Button>
            <Button size="xs" radius="lg" type="submit" color="green">
              {t('load-form')}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
