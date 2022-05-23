import { useEffect, useState } from 'react';
import { Popover, Button, Box, NumberInput, InputWrapper, Space, TextInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { addTier } from 'src/store/slice/tierSlice';
import { RootState } from 'src/store';
import { useForm } from '@mantine/form';
import { successNotice } from '../../components/Notice';
import { useTranslation } from 'react-i18next';

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);
  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      value: 0,
      name: '',
    },

    validate: {
      value: (value) => (tiers.filter((v) => v.value === value).length > 0 ? t('this-level-already-exists') : null),
      name: (value) => {
        return value.length > 6 ? t('name-cannot-be-longer-than-6-characters') : null;
      },
    },
  });

  const handleConfirm = ({ value, name }: { value: number; name?: string }) => {
    if (tiers.filter((v) => v.value === value).length > 0) {
      return;
    }

    dispatch(
      addTier({
        value,
        name,
        characterKeys: [],
      }),
    );

    successNotice(t('level-added-successfully'));
    setOpened(false);
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button size="xs" radius="xl" variant="outline" color="green" onClick={() => setOpened((o) => !o)}>
          {t('add-tier')}
        </Button>
      }
      width={200}
      position="bottom"
      withArrow
    >
      <form onSubmit={form.onSubmit(handleConfirm)}>
        <InputWrapper label={t('tier-name')} description={t('optional-no-more-than-6-characters')}>
          <TextInput {...form.getInputProps('name')} placeholder={t('displays-the-T+grade-value-by-default')} />
        </InputWrapper>
        <Space h="sm" />
        <NumberInput
          label={t('grade-value')}
          description={t('range-[-9,9]-with-one-decimal-place')}
          placeholder={t('please-enter')}
          {...form.getInputProps('value')}
          precision={1}
          step={0.5}
          min={-9}
          max={9}
        />
        <Space h="lg" />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Button radius="xl" type="submit">
            {t('confirm-add')}
          </Button>
        </Box>
      </form>
    </Popover>
  );
}
