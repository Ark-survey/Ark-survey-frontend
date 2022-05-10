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
      flexFlow:'row wrap'
    }}
  >
    <Box
      sx={{
        fontSize: "20px",
        lineHeight: "30px",
        paddingLeft: 5,
        fontWeight: 900,
        marginRight:'20px',
        height: "30px",
        marginTop: '6px',
        whiteSpace:'nowrap'
      }}
    >
      {title}
    </Box>

    <Box
      sx={{
        flex: "1",
        display: "flex",
        justifyContent: "end",
        alignItems: 'center',
        marginTop:'6px'
      }}
    >
      {children}
    </Box>
  </Box>)
}