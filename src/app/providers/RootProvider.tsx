// src/app/providers/RootProvider.tsx
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';
import { useUiStore } from '../../store/uiStore';

const queryClient = new QueryClient();

type Props = {
  children?: ReactNode;
};

const RootProvider = ({ children }: Props) => {
  const mode = useUiStore((s) => s.mode);

  const theme = useMemo(() => {
    let paletteOverrides =
      mode === 'light'
        ? {
            mode: 'light' as const,
            primary: { main: '#2563EB' },
            secondary: { main: '#22C55E' },
            background: {
              default: '#F3F4F6',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#111827',
              secondary: '#6B7280',
            },
          }
        : {
            mode: 'dark' as const,
            primary: { main: '#16A34A' },
            secondary: { main: '#22C55E' },
            background: {
              default: '#0e0e0e',
              paper: '#0e0e0e',
            },
            text: {
              primary: '#E5E7EB',
              secondary: '#9CA3AF',
            },
          };

    let theme = createTheme({
      palette: paletteOverrides,
      shape: {
        borderRadius: 16,
      },
      typography: {
        fontFamily:
          '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h4: { fontWeight: 700 },
        subtitle1: { fontWeight: 600 },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: { backgroundImage: 'none' },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: { backgroundImage: 'none' },
          },
        },
      },
    });

    theme = responsiveFontSizes(theme);
    return theme;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {/* Use existing router higher up in the tree */}
        {children ?? <App />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
