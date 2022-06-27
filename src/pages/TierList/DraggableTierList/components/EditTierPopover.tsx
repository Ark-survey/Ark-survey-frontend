import { useEffect, useState } from 'react';
import { Popover, Button, Box, NumberInput, ActionIcon, TextInput, Space } from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { Tier } from 'src/service/TierListServer';
import { useTranslation } from 'react-i18next';

export default function EditTierPopover({
  tier,
  tierValueList,
  onSubmit,
}: {
  tier: Tier;
  tierValueList: number[];
  onSubmit?: (tier: Tier) => void;
}) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      value: tier.value,
      name: tier.name,
    },
    validate: {
      value: (value: number) =>
        tier.value !== value && tierValueList.includes(value) ? t('this-level-already-exists') : null,
      name: (value: string) => {
        return (value?.length ?? '') > 6 ? t('name-cannot-be-longer-than-6-characters') : null;
      },
    },
  });

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
        <form
          onSubmit={form.onSubmit((values) => {
            onSubmit?.({ ...tier, value: values.value, name: values.name });
            setOpened(false);
          })}
        >
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
