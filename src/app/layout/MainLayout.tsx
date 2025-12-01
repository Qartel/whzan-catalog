// src/app/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
  Link as RouterLink,
  NavLink,
  useMatch,
} from 'react-router-dom';

type Props = {
  children: ReactNode;
};

type NavButtonProps = {
  to: string;
  label: string;
  end?: boolean;
};

const NavButton = ({ to, label, end }: NavButtonProps) => {
  // useMatch tells us if the current URL matches this "to"
  const match = useMatch({ path: to, end: end ?? false });
  const isActive = Boolean(match);

  return (
    <Button
      component={NavLink}
      to={to}
      size="small"
      sx={{
        color: isActive ? '#050509' : 'text.primary',
        bgcolor: isActive ? 'primary.main' : 'transparent',
        borderRadius: 9999,
        px: 2,
        '&:hover': {
          bgcolor: isActive ? 'primary.main' : 'action.hover',
        },
      }}
    >
      {label}
    </Button>
  );
};

const MainLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top app bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(15,23,42,0.9)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: { xs: 0, sm: 2 },
            }}
          >
            {/* Left: logo / title */}
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
            >
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#050509',
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'primary.main' },
                }}
              >
                <StorefrontIcon fontSize="small" />
              </IconButton>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, letterSpacing: 0.3 }}
                >
                  Whzan Catalog
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Marketplace Explorer
                </Typography>
              </Box>
            </Box>

            {/* Right: nav */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <NavButton to="/" label="Catalog" end />
              <NavButton to="/favorites" label="Saved" />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Box component="main" sx={{ flex: 1, py: { xs: 2, sm: 3 } }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1200, // roughly 3 large cards + padding
            mx: 'auto',
            px: { xs: 2, sm: 3 },
          }}
        >
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 2,
          mt: 4,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, sm: 3 },
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Whzan Catalog Explorer
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Built with React, TypeScript &amp; MUI
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
