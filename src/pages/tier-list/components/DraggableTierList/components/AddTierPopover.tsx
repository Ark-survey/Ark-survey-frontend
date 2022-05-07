import { useState } from "react";
import { Popover, Button, Box, Text, NumberInput } from "@mantine/core";

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button radius="xl" color="green" onClick={() => setOpened((o) => !o)}>
          添加新等级
        </Button>
      }
      width={200}
      position="bottom"
      withArrow
    >
      <NumberInput
        label="等级数值"
        description="范围[0-9]，保留一位小数"
        placeholder="请输入"
        precision={1}
        step={0.5}
        min={0}
        max={9}
      />
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          onClick={() => setOpened((o) => !o)}
        >
          确认添加
        </Button>
      </Box>
    </Popover>
  );
}
