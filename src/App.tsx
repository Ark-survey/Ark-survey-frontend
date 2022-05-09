import TierList from "src/pages/tier-list";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SWR from "./api";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <SWR>
          <TierList />
        </SWR>
      </DndProvider>
    </Provider>
  );
}

export default App;
