import { useState } from "react";
import { Popover, Button, Box, Text, ActionIcon } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { delTier } from 'src/store/slice/tierSlice';
import { updateOptSelected } from 'src/store/slice/optSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

export default function DeleteTierPopover({ tierIndex }: { tierIndex: number }) {
  const [opened, setOpened] = useState(false);

  const tiers = useSelector((state: RootState) => state.tiers);
  const opts = useSelector((state: RootState) => state.opts);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(delTier({tierIndex}))

    opts.forEach((opt, index) => {
      console.log(!!(tiers[tierIndex].optIds.includes(opt.id)));
      if (tiers[tierIndex].optIds.includes(opt.id)) {
        dispatch(updateOptSelected({optIndex:index, value:false}))
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
          <Trash />
        </ActionIcon>
      }
      width={210}
      position="right"
      placement="center"
      withArrow
    >
      <Text size="sm">这会删除该等级并放回该等级的干员，确定要继续吗？</Text>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          color={"red"}
          onClick={handleConfirm}
        >
          确认删除
        </Button>
      </Box>
    </Popover>
  );
}
