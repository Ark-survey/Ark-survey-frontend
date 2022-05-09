import { useState } from "react";
import { Popover, Button, Box, Text } from "@mantine/core";

import { delAllOptByTier } from 'src/store/slice/tierSlice';
import { updateAllOptSelected } from 'src/store/slice/optSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

export default function ResetAllOptPopover() {
  const [opened, setOpened] = useState(false);

  const tiers = useSelector((state: RootState) => state.tiers);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    tiers.forEach((tier) => {
      dispatch(delAllOptByTier({tierValue: tier.value}))
    })
      
    dispatch(updateAllOptSelected(false))

    setOpened(false)
  }

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          variant="outline"
          color="red"
          radius="xl"
          onClick={() => setOpened((o) => !o)}
        >
          清空
        </Button>
      }
      width={160}
      position="bottom"
      withArrow
    >
      <Text size="sm">这会放回表中所有干员，确定要继续吗？</Text>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          color={"red"}
          onClick={handleConfirm}
        >
          确认放回
        </Button>
      </Box>
    </Popover>
  );
}
