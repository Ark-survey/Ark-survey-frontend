import { useEffect, useState } from "react";
import { Popover, Button, Box, NumberInput, InputWrapper, Space, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { addTier } from 'src/store/slice/tierSlice';
import { RootState } from "src/store";
import { useForm } from "@mantine/form";
import { successNotice } from "../../components/Notice";

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);

  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      value: 0,
      name: ''
    },

    validate: {
      value: (value) => (tiers.filter(v => v.value === value).length > 0 ? '该等级已经存在' : null),
      name: (value) => {
        return (value.length > 6 ? '名称不能大于 6 字' : null)
      },
    },
  });

  const handleConfirm = ({ value, name }: { value: number; name?: string }) => {
    if (tiers.filter(v => v.value === value).length > 0) {
      return;
    }

    dispatch(addTier({
      value,
      name,
      characterKeys: []
    }))

    successNotice('等级添加成功')
    setOpened(false)
  }

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened])

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          size="xs" radius="xl" variant="outline" color="green" onClick={() => setOpened((o) => !o)}>
          添加等级
        </Button>
      }
      width={200}
      position="bottom"
      withArrow
    >
      <form onSubmit={form.onSubmit(handleConfirm)}>
        <InputWrapper
          label="等级名称"
          description="选填，不超过 6 字"
        >
          <TextInput {...form.getInputProps('name')} placeholder="默认显示 T + 等级数值" />
        </InputWrapper>
        <Space h={'sm'} />
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
        <Space h={'lg'} />
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button
            radius="xl"
            type="submit"
          >
            确认添加
          </Button>
        </Box>
      </form>
    </Popover>
  );
}
