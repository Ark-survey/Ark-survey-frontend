import { useEffect, useState } from 'react';
import { Popover, Button, Box, NumberInput, ActionIcon, TextInput, Space } from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { Tier } from 'src/service/TierListServer';
import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import useTierList from '../../useTierList';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';

export default function EditTierPopover({ tier }: { tier: Tier }) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { tierList } = useTierList();
  const { findTierIndexByValue, updateOneTier } = useOperateEditingTierList();

  const form = useForm({
    initialValues: {
      value: tier.value,
      name: tier.name,
    },
    validate: {
      value: (value: number) =>
        tier.value !== value && (tierList?.tiers ?? []).filter((v) => v.value === value).length > 0
          ? t('this-level-already-exists')
          : null,
      name: (value: string) => {
        return (value?.length ?? '') > 6 ? t('name-cannot-be-longer-than-6-characters') : null;
      },
    },
  });

  const handleConfirm = ({ value, name }: { value?: number; name?: string }) => {
    updateOneTier(findTierIndexByValue(tier.value ?? 0) ?? 0, {
      ...tier,
      value,
      name: name ?? '',
    });
    successNotice(t('modified-successfully'));
    setOpened(false);
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Popover
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      width={200}
      position="right"
      withArrow
    >
      <Popover.Target>
        <ActionIcon
          sx={{
            background: '#fff',
          }}
          size="xs"
          radius="xs"
          onClick={() => setOpened((o) => !o)}
        >
          <IconEdit />
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
              {t('confirm-update')}
            </Button>
          </Box>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}
