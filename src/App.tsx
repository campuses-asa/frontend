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

export default function App() {

  return (
    <>
      <h1 className="text-4xl font-bold text-blue-600">hello</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="campuses" element={<CampusesPage />} />
        <Route path="campuses/:id" element={<CampusDetailPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentDetailPage />} />
        <Route path="campuses/add" element={<AddCampusPage />} />
        <Route path="students/add" element={<AddStudentPage />} />
        <Route path="campuses/edit/:id" element={<EditCampusPage />} />
        <Route path="students/edit/:id" element={<EditStudentPage />} />
        <Route path ="*" element ={<NotFoundPage />} />
      </Routes>
    </>
  )
  
}
