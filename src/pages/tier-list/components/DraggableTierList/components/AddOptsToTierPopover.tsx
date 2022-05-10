import { useState } from "react";
import { Popover, Button, Box, Text, ActionIcon } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { updateOptPicked, updateOptSelecting } from 'src/store/slice/optSlice';
import { addOptByTier } from 'src/store/slice/tierSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

export default function AddOptsToTierPopover({ tierValue }: { tierValue: number }) {
  const [opened, setOpened] = useState(false);
  const opts = useSelector((state: RootState) => state.opts);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    opts.forEach((opt, index) => {
      if (opt.selecting) {
        dispatch(updateOptPicked({ optIndex: index, value: true }))
        dispatch(updateOptSelecting({ optIndex: index, value: false }))
        dispatch(addOptByTier({ tierValue, optId: opt.id }))
      }
      return opt
    })

    setOpened(false)
  }

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon
          sx={{
            background: "#fff",
          }}
          size="xs"
          radius="xs"
          onClick={() => setOpened((o) => !o)}
        >
          <Plus />
        </ActionIcon>
      }
      width={210}
      position="right"
      placement="center"
      withArrow
    >
      <Text size="sm">这会向该等级添加您选中的全部干员，确定要继续吗？</Text>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          color={"blue"}
          onClick={handleConfirm}
        >
          确认添加
        </Button>
      </Box>
    </Popover>
  );
}
