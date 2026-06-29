import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CampusesPage from "./pages/CampusesPage";
import CampusDetailPage from "./pages/CampusDetailPage";
import StudentsPage from "./pages/StudentsPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import AddCampusPage from "./pages/AddCampusPage";
import AddStudentPage from "./pages/AddStudentPage";
import EditCampusPage from "./pages/EditCampusPage";
import EditStudentPage from "./pages/EditStudentPage";
import NotFoundPage from "./pages/404Page";
import Layout from "./components/Layout";

export default function App() {

  return (

    <Routes>

      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="campuses" element={<CampusesPage />} />
        <Route path="campuses/:id" element={<CampusDetailPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentDetailPage />} />
        <Route path="campuses/add" element={<AddCampusPage />} />
        <Route path="students/add" element={<AddStudentPage />} />
        <Route path="campuses/:id/edit" element={<EditCampusPage />} />
        <Route path="students/:id/edit" element={<EditStudentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

    </Routes>
  )

}
