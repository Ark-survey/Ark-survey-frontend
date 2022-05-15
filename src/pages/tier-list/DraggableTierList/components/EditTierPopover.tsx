import { useEffect, useState } from 'react';
import { Popover, Button, Box, NumberInput, ActionIcon, InputWrapper, TextInput, Space } from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import { updateTierName, updateTierValue } from 'src/store/slice/tierSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { useForm } from '@mantine/form';
import { Tier } from 'src/api/TierListServer';
import { successNotice } from '../../components/Notice';

export default function EditTierPopover({ tier }: { tier: Tier }) {
  const [opened, setOpened] = useState(false);

  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      value: tier.value,
      name: tier.name,
    },

    validate: {
      value: (value) =>
        tier.value !== value && tiers.filter((v) => v.value === value).length > 0 ? '该等级已经存在' : null,
      name: (value) => {
        return (value?.length ?? '') > 6 ? '名称不能大于 6 字' : null;
      },
    },
  });

  const handleConfirm = ({ value, name }: { value: number; name?: string }) => {
    dispatch(
      updateTierValue({
        tierValue: tier.value,
        value,
      }),
    );
    dispatch(
      updateTierName({
        tierValue: tier.value,
        value: name ?? '',
      }),
    );
    successNotice('等级修改成功');
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
      target={
        <ActionIcon
          sx={{
            background: '#fff',
          }}
          size="xs"
          radius="xs"
          onClick={() => setOpened((o) => !o)}
        >
          <Edit />
        </ActionIcon>
      }
      width={200}
      position="right"
      placement="center"
      withArrow
    >
      <form onSubmit={form.onSubmit(handleConfirm)}>
        <InputWrapper label="等级名称" description="选填，不超过 6 字">
          <TextInput {...form.getInputProps('name')} placeholder="默认显示 T + 等级数值" />
        </InputWrapper>
        <Space h="sm" />
        <NumberInput
          label="等级数值"
          description="范围[-9,9]，保留一位小数"
          placeholder="请输入"
          {...form.getInputProps('value')}
          precision={1}
          step={0.5}
          min={-9}
          max={9}
        />
        <Space h="lg" />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Button radius="xl" type="submit">
            确认修改
          </Button>
        </Box>
      </form>
    </Popover>
  );
}
