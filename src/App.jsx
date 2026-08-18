import AppRoutes from './routes/routes.jsx';
import { ThemeProvider } from './components/ThemeProvider';
import './styles/theme-dark-global.css';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;