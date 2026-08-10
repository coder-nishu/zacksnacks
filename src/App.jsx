import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './AppShell';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />} />
        <Route path="/:employeeId" element={<AppShell />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
