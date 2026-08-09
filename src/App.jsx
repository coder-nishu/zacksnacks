import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './AppShell';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />} />
        <Route path="/:employeeId" element={<AppShell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
