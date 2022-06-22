import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { NotificationsProvider } from '@mantine/notifications';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import './i18n';
import { useState } from 'react';
import PageContainer from './pages';
import customTheme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useIsMobile } from './hooks/useIsMobile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retryOnMount: false,
    },
  },
});

function App() {
  const isMobile = useIsMobile();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ ...customTheme, colorScheme }}>
            <NotificationsProvider position="bottom-center">
              <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                    <PageContainer />
                  </DndProvider>
                </BrowserRouter>
              </PersistGate>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
