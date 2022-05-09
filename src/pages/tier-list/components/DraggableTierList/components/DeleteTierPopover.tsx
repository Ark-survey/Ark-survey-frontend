import { useState } from "react";
import { Popover, Button, Box, Text, ActionIcon } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { tierState } from "src/store/tierState";
import { optState } from "src/store/optState";
import { useAtom } from "jotai";

export default function DeleteTierPopover({ tierIndex }: { tierIndex: number }) {
  const [opened, setOpened] = useState(false);

  const [tiers, setTiers] = useAtom(tierState);
  const [opts, setOpts] = useAtom(optState);

  const handleConfirm = () => {
    let newTiers = tiers.filter((tier, index) => {
      return index !== tierIndex
    })
    setTiers(newTiers)

    let newOpts = opts.map((tier, index) => {
      console.log(!!(tiers[tierIndex].optIds.includes(tier.id)));
      if (tiers[tierIndex].optIds.includes(tier.id)) {
        return {
          ...tier,
          selected: false
        }
      }
      return tier
    })
    setOpts(newOpts)

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
