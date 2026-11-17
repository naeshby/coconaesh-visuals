import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PlaceholderPage from "./components/ui/PlaceholderPage";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

// Development-only tools. The DEV check lets Vite drop these (and their lazy
// chunks) from production builds, so /dev/* does not exist in production.
const DevStatusPage = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/DevStatusPage"))
  : null;
const DevDesignPage = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/DevDesignPage"))
  : null;

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />

        {/* DEVELOPMENT PLACEHOLDERS: each is replaced by its real page later. */}
        <Route
          path="about"
          element={
            <PlaceholderPage
              title="About"
              planned="Photographer introduction, personal story, photography philosophy, creative approach, professional experience, selected photographs and a booking call to action. Editable from the admin dashboard."
            />
          }
        />
        <Route
          path="portfolio"
          element={
            <PlaceholderPage
              title="Portfolio"
              planned="The universal published photography collection with category, collection and year filters, pagination and a responsive masonry layout. Built with the gallery engine in Phase 2."
            />
          }
        />
        <Route
          path="services"
          element={
            <PlaceholderPage
              title="Services"
              planned="Configurable photography services, descriptions and packages, with prices managed from the admin dashboard."
            />
          }
        />
        <Route
          path="testimonials"
          element={
            <PlaceholderPage
              title="Testimonials"
              planned="Client testimonials approved and published by the administrator."
            />
          }
        />
        <Route
          path="booking"
          element={
            <PlaceholderPage
              title="Booking"
              planned="Service and package selection, date availability and booking requests. Built in Phase 4; every request needs administrator approval."
            />
          }
        />
        <Route
          path="contact"
          element={
            <PlaceholderPage
              title="Contact"
              planned="An enquiry form and contact details managed from the admin dashboard."
            />
          }
        />
        <Route
          path="privacy"
          element={
            <PlaceholderPage
              title="Privacy policy"
              planned="The privacy policy, written for the business's Indian operating environment."
            />
          }
        />
        <Route
          path="terms"
          element={
            <PlaceholderPage
              title="Terms and conditions"
              planned="The terms and conditions of service."
            />
          }
        />

        {DevStatusPage ? (
          <Route
            path="dev/status"
            element={
              <Suspense fallback={null}>
                <DevStatusPage />
              </Suspense>
            }
          />
        ) : null}
        {DevDesignPage ? (
          <Route
            path="dev/design"
            element={
              <Suspense fallback={null}>
                <DevDesignPage />
              </Suspense>
            }
          />
        ) : null}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}