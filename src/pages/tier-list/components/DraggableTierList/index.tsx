import { Box, Button } from "@mantine/core";
import { useState } from "react";
import AddTierPopover from "./components/AddTierPopover";
import ResetAllOptPopover from "./components/ResetAllOptPopover";
import TierBox from "./components/TierBox";
import UploadPopover from "./components/UploadPopover";

export default function Index() {
  const [tierList, setTierList] = useState([
    {
      value: 0,
    },
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
  ]);

  return (
    <Box sx={{}}>
      <Box
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
          等级表编辑
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button variant="outline" color="dark" radius="xl" onClick={() => {}}>
            隐藏操作按钮
          </Button>
          <Box sx={{ width: "10px" }}></Box>
          <ResetAllOptPopover />
          <Box sx={{ width: "10px" }}></Box>
          <AddTierPopover />
          <Box sx={{ width: "10px" }}></Box>
          <UploadPopover />
        </Box>
      </Box>
      <Box
        sx={{
          height: "900px",
          overflow: "auto",
          margin: "15px",
          "::-webkit-scrollbar": { width: "0 !important" },
        }}
      >
        {tierList.map((item) => (
          <TierBox key={item.value} value={item.value} operationDisplay />
        ))}
      </Box>
    </Box>
  );
}
