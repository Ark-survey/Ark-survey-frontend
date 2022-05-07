import { useState } from "react";
import { Popover, Button, Box, NumberInput, ActionIcon } from "@mantine/core";
import { Edit } from "tabler-icons-react";

export default function EditTierPopover() {
  const [opened, setOpened] = useState(false);
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
          <Edit />
        </ActionIcon>
      }
      width={200}
      position="right"
      placement="center"
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
          确认修改
        </Button>
      </Box>
    </Popover>
  );
}
