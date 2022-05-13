import { useState } from "react";
import { Popover, Button, Box, Text } from "@mantine/core";

import { delAllCharacterByTier } from 'src/store/slice/tierSlice';
import { updateAllCharacterPicked } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { successNotice } from "../../components/Notice";

export default function ResetAllCharacterPopover() {
  const [opened, setOpened] = useState(false);

  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    tiers.forEach((tier) => {
      dispatch(delAllCharacterByTier({ tierValue: tier.value }))
    })

    dispatch(updateAllCharacterPicked(false))
    successNotice('等级表重置成功')
    setOpened(false)
  }

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          size="xs"
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
      <Text size="sm">这会清空表中所有干员，确定要继续吗？</Text>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          color={"red"}
          onClick={handleConfirm}
        >
          确认清空
        </Button>
      </Box>
    </Popover>
  );
}
