// src/app/providers/RootProvider.tsx
import type { ReactNode } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import type { PaletteMode } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type RootProviderProps = {
  children: ReactNode;
};

const mode: PaletteMode = 'dark';

// Our core black/grey/white + green accent theme
const theme = createTheme({
  palette: {
    mode,
    primary: {
      main: '#22c55e', // green accent
    },
    secondary: {
      main: '#16a34a',
    },
    background: {
      default: '#050509', // page background
      paper: '#0b0b10',   // card background
    },
    text: {
      primary: '#f9fafb',   // near white
      secondary: '#9ca3af', // grey
    },
    divider: '#111827',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const queryClient = new QueryClient();

const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default RootProvider;
