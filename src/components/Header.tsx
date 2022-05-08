import { Box } from "@mantine/core";

interface HeaderProps {
  title: string;
  children?: any;
}

export default function Index({ title, children }: HeaderProps) {
  return (<Box
    sx={{
      display: "flex",
      borderBottom: "2px #eee solid",
      padding: "15px",
    }}
  >
    <Box
      sx={{
        flex: "1",
        fontSize: "20px",
        lineHeight: "36px",
        paddingLeft: 5,
        fontWeight: 900,
      }}
    >
      {title}
    </Box>

    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      {children}
    </Box>
  </Box>)
}