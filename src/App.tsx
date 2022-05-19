import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Provider } from 'react-redux';
import store from './store';
import { useIsMobile } from './hooks';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NotificationsProvider } from '@mantine/notifications';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import './i18n';
import { useState } from 'react';
import PageContainer from './pages';
import customTheme from './theme';

let persistor = persistStore(store);

function App() {
  const isMobile = useIsMobile();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Provider store={store}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ ...customTheme, colorScheme }}>
          <NotificationsProvider position="top-right">
            <PersistGate loading={null} persistor={persistor}>
              <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <PageContainer />
              </DndProvider>
            </PersistGate>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}

export default App;
