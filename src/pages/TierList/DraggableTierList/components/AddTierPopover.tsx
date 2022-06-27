import { useEffect, useState } from 'react';
import { Popover, Button, Box, NumberInput, Space, TextInput, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { IconPlus } from '@tabler/icons';
import { Tier } from 'src/service/TierListServer';

export default function UploadPopover({
  tierValueList,
  onSubmit,
}: {
  tierValueList: number[];
  onSubmit?: (tier: Tier) => void;
}) {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      value: 0,
      name: '',
    },

    validate: {
      value: (value) => (tierValueList.includes(value) ? t('this-level-already-exists') : null),
      name: (value) => {
        return value.length > 6 ? t('name-cannot-be-longer-than-6-characters') : null;
      },
    },
  });

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
        <form
          onSubmit={form.onSubmit((values) => {
            onSubmit?.({ value: values.value, name: values.name, characterKeys: [] });
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
              {t('confirm-add')}
            </Button>
          </Box>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}
