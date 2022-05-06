import TierList from "src/pages/tier-list";
import { Box } from "@mantine/core";
import SWR from "./api";

function App() {
  return (
    <SWR>
      <Box
        sx={{
          maxWidth: "1000px",
          display: "flex",
          margin: "0 auto",
        }}
      >
        <TierList />
      </Box>
    </SWR>
  );
}

export default App;
