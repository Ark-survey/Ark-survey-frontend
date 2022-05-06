import { Box } from "@mantine/core";
import { API } from "src/api";
import useSWR from "swr";

export default function Index() {
  const { data, error } = useSWR(API.charList.get);

  return (
    <>
      <Box
        sx={{
          width: "50%",
          border: "1px #000 solid",
        }}
      >
        <Box>111111111</Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          border: "1px #000 solid",
        }}
      >
        干员列表
      </Box>
    </>
  );
}
