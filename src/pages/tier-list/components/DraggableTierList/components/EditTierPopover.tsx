import { useEffect, useState } from "react";
import { Popover, Button, Box, NumberInput, ActionIcon } from "@mantine/core";
import { Edit } from "tabler-icons-react";
import { updateTierValue } from 'src/store/slice/tierSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { useForm } from "@mantine/form";

export default function EditTierPopover({ tierValue }: { tierValue: number }) {
  const [opened, setOpened] = useState(false);

  const tiers = useSelector((state: RootState) => state.tiers);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      value: tierValue,
    },

    validate: {
      value: (value) => (tiers.filter(v => v.value === value).length > 0 ? '该等级已经存在' : null),
    },
  });

  const handleConfirm = ({value}:{value: number}) => {
    dispatch(updateTierValue({
      tierValue,
      value
    }))
    setOpened(false)
  }

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[opened])

  return (
    <Popover
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      target={
        <ActionIcon
          sx={{
            background: "#fff",
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
            确认修改
          </Button>
        </Box>
      </form>
    </Popover>
  );
}
