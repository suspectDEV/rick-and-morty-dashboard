import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import CharactersPage from "./pages/characters";
import EpisodesPage from "./pages/episodes";
import LocationsPage from "./pages/locations";

const Router = () =>(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/episodes" />} />
      <Route path="/episodes" element={<EpisodesPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/characters" element={<CharactersPage />} />
    </Routes>
  </BrowserRouter>
)

export default Router;