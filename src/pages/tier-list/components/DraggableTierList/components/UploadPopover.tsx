import { useState } from "react";
import { Popover, Text, Button, Box } from "@mantine/core";
import { CloudUpload } from "tabler-icons-react";

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          radius="xl"
          leftIcon={<CloudUpload size={14} />}
          onClick={() => setOpened((o) => !o)}
        >
          提交等级表
        </Button>
      }
      width={220}
      position="bottom"
      withArrow
    >
      <Text size="sm">
        注意：提交之后页面会显示您的唯一 ID
        ，请妥善保存，下次进入本页面时输入您的 ID 即可获取之前提交的数据。
      </Text>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          onClick={() => setOpened((o) => !o)}
        >
          了解，继续提交
        </Button>
      </Box>
    </Popover>
  );
}
