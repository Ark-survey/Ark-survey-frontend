import { useCallback, useEffect, useState } from 'react';
import { Popover, Button, Box, NumberInput, Space, TextInput, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { IconPlus } from '@tabler/icons';
import useTierList from '../../useTierList';

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { addTier } = useOperateEditingTierList();
  const { tierList } = useTierList();

  const form = useForm({
    initialValues: {
      value: 0,
      name: '',
    },

    validate: {
      value: (value) =>
        (tierList?.tiers?.filter((v) => v.value === value).length ?? 0) > 0 ? t('this-level-already-exists') : null,
      name: (value) => {
        return value.length > 6 ? t('name-cannot-be-longer-than-6-characters') : null;
      },
    },
  });

  const handleConfirm = useCallback(
    ({ value, name }: { value: number; name?: string }) => {
      addTier({
        value,
        name,
        characterKeys: [],
      });

      successNotice(t('level-added-successfully'));
      setOpened(false);
    },
    [addTier, t],
  );

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Popover opened={opened} onClose={() => setOpened(false)} width={210} position="right" withArrow>
      <Popover.Target>
        <ActionIcon size="lg" color="green" radius="md" onClick={() => setOpened((o) => !o)}>
          <IconPlus />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <form onSubmit={form.onSubmit(handleConfirm)}>
          <TextInput
            label={t('tier-name')}
            description={t('optional-no-more-than-6-characters')}
            {...form.getInputProps('name')}
            placeholder={t('displays-the-T+grade-value-by-default')}
          />
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
      </Popover.Dropdown>
    </Popover>
  );
}
