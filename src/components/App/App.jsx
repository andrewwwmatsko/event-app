import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const ParticipantsPage = lazy(() =>
  import("../pages/ParticipantsPage/ParticipantsPage.jsx")
);
const RegisterPage = lazy(() =>
  import("../pages/RegisterPage/RegisterPage.jsx")
);

export default function App() {
  return (
    <>
      <Header />

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/events" element={<HomePage />} />
          <Route path="/events/:eventId" element={<RegisterPage />} />
          <Route
            path="/events/:eventId/participants"
            element={<ParticipantsPage />}
          />
          <Route path="*" element={<p>Not found page</p>} />
        </Routes>
      </Suspense>
    </>
  );
}
