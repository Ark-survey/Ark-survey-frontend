import { useState } from "react";
import { Popover, Button, Box, Text } from "@mantine/core";

export default function ResetAllOptPopover() {
  const [opened, setOpened] = useState(false);
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
          onClick={() => setOpened((o) => !o)}
        >
          确认清空
        </Button>
      </Box>
    </Popover>
  );
}
