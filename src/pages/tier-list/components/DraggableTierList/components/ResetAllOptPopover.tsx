import { useState } from "react";
import { Popover, Button, Box, Text } from "@mantine/core";
import { useRecoilState } from "recoil";
import { tierState } from "src/recoil/tierState";
import { optState } from "src/recoil/optState";

export default function ResetAllOptPopover() {
  const [opened, setOpened] = useState(false);

  const [tiers, setTiers] = useRecoilState(tierState);
  const [opts, setOpts] = useRecoilState(optState);

  const handleConfirm = () => {
    let newTiers = tiers.map(tier => ({
      ...tier,
      optIds: []
    }));
    setTiers(newTiers)

    let newOpts = opts.map(opt => ({
      ...opt,
      selected: false
    }));
    setOpts(newOpts)

    setOpened(false)
  }

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          variant="outline"
          color="dark"
          radius="xl"
          onClick={() => setOpened((o) => !o)}
        >
          全部放回
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
