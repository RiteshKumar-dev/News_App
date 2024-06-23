import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Index from "./Componenets/Index";
import IPL from "./Componenets/IPL";
import Finance from "./Componenets/Finance";
import Politics from "./Componenets/Politics";
import { ThemeProvider } from "./Context/ThemeContext";
import Articles from "./Componenets/Articles";
import SignUp from "./Componenets/SignUp";
import Profile from "./Componenets/Profile";
import NotFound_404 from "./Componenets/NotFound_404 ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/ipl" element={<IPL />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/articles/:index" element={<Articles />} />
          <Route path="/auth" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound_404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
