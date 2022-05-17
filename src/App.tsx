import TierList from 'src/pages/tier-list';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Provider } from 'react-redux';
import store from './store';
import { useIsMobile, useWindowSize } from './hooks';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NotificationsProvider } from '@mantine/notifications';
import { Box, MantineProvider } from '@mantine/core';
import Nav from './components/Nav';
import Footer from './components/Footer';

let persistor = persistStore(store);

function App() {
  const isMobile = useIsMobile();
  const windowSize = useWindowSize();
  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider position="top-right">
          <PersistGate loading={null} persistor={persistor}>
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
              <Box sx={{ minWidth: '360px', padding: 0, margin: 0 }}>
                <Box
                  sx={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                    minHeight: 'calc(100vh)',
                    background: '#fff',
                    boxShadow:
                      '0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px',
                  }}
                >
                  <Nav />
                  <TierList />
                </Box>
                <Box
                  sx={{
                    height: windowSize.innerWidth < 550 ? '200px' : '150px',
                  }}
                />
                <Footer />
              </Box>
            </DndProvider>
          </PersistGate>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
