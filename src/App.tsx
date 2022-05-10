import TierList from "src/pages/tier-list";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'
import SWR from "./api";
import { Provider } from "react-redux";
import { store } from "./store";
import { useIsMobile } from "./hooks";

function App() {
  const isMobile = useIsMobile()
  return (
    <Provider store={store}>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <SWR>
          <TierList />
        </SWR>
      </DndProvider>
    </Provider>
  );
}

export default App;
