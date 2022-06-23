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
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ ...customTheme, colorScheme }}>
          <NotificationsProvider position="bottom-center">
            <BrowserRouter>
              <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <PageContainer />
              </DndProvider>
            </BrowserRouter>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
