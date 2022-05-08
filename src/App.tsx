import TierList from "src/pages/tier-list";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SWR from "./api";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <SWR>
          <TierList />
        </SWR>
      </DndProvider>
    </RecoilRoot >
  );
}

export default App;
