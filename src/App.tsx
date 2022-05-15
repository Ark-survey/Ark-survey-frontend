import TierList from 'src/pages/tier-list';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Provider } from 'react-redux';
import store from './store';
import { useIsMobile } from './hooks';
import Nav from './components/Nav';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NotificationsProvider } from '@mantine/notifications';
import { Container, MantineProvider } from '@mantine/core';

let persistor = persistStore(store);

function App() {
  const isMobile = useIsMobile();
  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider position="top-right">
          <PersistGate loading={null} persistor={persistor}>
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
              <Container sx={{ minWidth: '360px', maxWidth: '1500px', padding: 0 }}>
                <Nav />
                <TierList />
              </Container>
            </DndProvider>
          </PersistGate>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
