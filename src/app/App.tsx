// src/app/App.tsx
import MainLayout from './layout/MainLayout';
import { AppRouter } from './router';

const App = () => (
  <MainLayout>
    <AppRouter />
  </MainLayout>
);

export default App;
