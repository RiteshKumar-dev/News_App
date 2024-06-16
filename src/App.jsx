import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Index from "./Componenets/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
