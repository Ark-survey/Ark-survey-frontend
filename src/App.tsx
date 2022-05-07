import TierList from "src/pages/tier-list";
import { Box } from "@mantine/core";
import SWR from "./api";

function App() {
  return (
    <SWR>
      <TierList />
    </SWR>
  );
}

export default App;
