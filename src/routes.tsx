import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/login';
import RegisterPage from './pages/Login/register';
import ManageUser from './pages/Manage-User';
import ManageMovies from './pages/Manage-Movies';
import ViewUser from './pages/Manage-User/view';
import UserForm from './pages/Manage-User/form';

function RoutesPage() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/manage-users" element={<ManageUser />} />
      <Route path="/manage-users/:id" element={<ViewUser />} />
      <Route path="/manage-users/edit/:id" element={<UserForm />} />
      <Route path="/manage-movies" element={<ManageMovies />} />
    </Routes>
  );
}

export default RoutesPage;
