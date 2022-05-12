import TierList from "src/pages/tier-list";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'
import { Provider } from "react-redux";
import store from "./store";
import { useIsMobile } from "./hooks";
import Nav from "./components/Nav";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

function App() {
  const isMobile = useIsMobile()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <Nav />
          <TierList />
        </DndProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
