import { useState } from "react";
import { Popover, Button, Box, NumberInput, ActionIcon } from "@mantine/core";
import { Edit } from "tabler-icons-react";
import { useRecoilState } from "recoil";
import { tierState } from "src/recoil/tierState";

export default function EditTierPopover({ tierIndex }: { tierIndex: number }) {
  const [opened, setOpened] = useState(false);
  const [tiers, setTiers] = useRecoilState(tierState);

  const [value, setValue] = useState(tiers[tierIndex].value);

  const handleConfirm = () => {
    let newTiers = tiers.map((tiers, index) => {
      return {
        ...tiers,
        value: index === tierIndex ? value : tiers.value
      }
    })
    setTiers(newTiers)
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
        value={value}
        onChange={(v) => setValue(v ?? 0)}
        precision={1}
        step={0.5}
        min={0}
        max={9}
      />
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          onClick={handleConfirm}
        >
          确认修改
        </Button>
      </Box>
    </Popover>
  );
}
