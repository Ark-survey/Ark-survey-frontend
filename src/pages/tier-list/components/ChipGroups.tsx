import { Box, Chip, Chips } from "@mantine/core";

interface ChipGroupsProps {
  tags: any[];
  classNames: Record<"iconWrapper" | "checked", string>;
  onChange?: (value: string[]) => void;
  label?: string;
}

export function ChipGroups({
  tags,
  classNames,
  onChange,
  label,
}: ChipGroupsProps) {
  return (
    <Box
      sx={{
        margin: "20px 0",
        border: "2px #eee solid",
        padding: "10px",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      {label && (
        <Box
          sx={{
            position: "absolute",
            background: "#fff",
            fontWeight: 600,
            fontSize: "12px",
            padding: "2px 5px",
            top: "-12px",
            left: "20px",
          }}
        >
          {label}
        </Box>
      )}
      <Chips multiple classNames={classNames} onChange={onChange}>
        {tags.map((item) => (
          <Chip value={item.value} key={item.value}>
            {item.name}
          </Chip>
        ))}
      </Chips>
    </Box>
  );
}
