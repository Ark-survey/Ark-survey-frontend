import { useCallback, useState } from "react";
import { Popover, Text, Button, Box } from "@mantine/core";
import { CloudUpload } from "tabler-icons-react";
import { TierListServer } from "src/api";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export default function UploadPopover() {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const useTierList = useSelector((state: RootState) => state.userTierList);

  const fetchCreateTierList = useCallback(async () => {
    return await new TierListServer().createOne(useTierList)
  }, [useTierList])

  const handleTierListSubmit = useCallback(async () => {
    setOpened(false)
    setLoading(true)
    try {
      const res = await fetchCreateTierList()
      // todo
    } finally {
      setLoading(false)
    }
  }, [fetchCreateTierList])

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          radius="xl"
          size="xs"
          loading={loading}
          leftIcon={<CloudUpload size={14} />}
          onClick={() => setOpened((o) => !o)}
        >
          提交
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
          onClick={handleTierListSubmit}
        >
          了解，继续提交
        </Button>
      </Box>
    </Popover>
  );
}
