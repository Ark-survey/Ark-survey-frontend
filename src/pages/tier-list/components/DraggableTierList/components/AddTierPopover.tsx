import { useEffect, useState } from "react";
import { Popover, Button, Box, NumberInput } from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { addTier } from 'src/store/slice/tierSlice';
import { RootState } from "src/store";
import { useForm } from "@mantine/form";

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);

  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      value: 0,
    },

    validate: {
      value: (value) => (tiers.filter(v => v.value === value).length > 0 ? '该等级已经存在' : null),
    },
  });

  const handleConfirm = ({ value }: { value: number }) => {
    if (tiers.filter(v => v.value === value).length > 0) {
      return;
    }

    dispatch(addTier({
      value,
      optIds: []
    }))

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
        <NumberInput
          label="等级数值"
          description="范围[0-9]，保留一位小数"
          placeholder="请输入"
          {...form.getInputProps('value')}
          precision={1}
          step={0.5}
          min={0}
          max={9}
        />
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button
            sx={{ marginTop: "15px" }}
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
