import { Box, Chip, Chips, createStyles } from "@mantine/core";

interface ChipGroupsProps {
  tags: any[];
  classNames?: Record<"iconWrapper" | "checked", string>;
  values: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

const useStyles = createStyles((theme, _params, getRef) => ({
  iconWrapper: {
    ref: getRef("iconWrapper"),
  },

  checked: {
    backgroundColor: `${theme.colors.blue[6]} !important`,
    color: theme.white,

    [`& .${getRef("iconWrapper")}`]: {
      color: theme.white,
    },
  },
}));

export function ChipGroups({
  tags,
  classNames,
  onChange,
  label,
  values
}: ChipGroupsProps) {
  const { classes } = useStyles()
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
      <Chips multiple size="xs" value={values} classNames={classes} onChange={onChange}>
        {tags.map((item) => (
          <Chip value={item.value} key={item.value}>
            {item.name}
          </Chip>
        ))}
      </Chips>
    </Box>
  );
}
