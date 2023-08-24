import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import StatisticsTable from "./pages/statistics-details";
import GammaTable from "./pages/calculate-gamma";
import HomePage from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<HomePage />} />
          <Route path="statistics-details" element={<StatisticsTable />} />
          <Route path="calculate-gamma" element={<GammaTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
