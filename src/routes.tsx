import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/login';
import RegisterPage from './pages/Login/register';
import ManageUser from './pages/Manage-User';
import ManageMovies from './pages/Manage-Movies';
import ViewUser from './pages/Manage-User/view';
import UserForm from './pages/Manage-User/form';
import MovieForm from './pages/Manage-Movies/form';
import ViewMovie from './pages/Manage-Movies/view';
import ManageGenre from './pages/Manage-Genres/index';
import GenreForm from './pages/Manage-Genres/form';

function RoutesPage() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* login and registration routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* user routes */}
      <Route path="/manage-users" element={<ManageUser />} />
      <Route path="/manage-users/:id" element={<ViewUser />} />
      <Route path="/manage-users/edit/:id" element={<UserForm />} />

      {/* movie routes */}
      <Route path="/manage-movies" element={<ManageMovies />} />
      <Route path="/manage-movies/edit/:id" element={<MovieForm />} />
      <Route path="/manage-movies/:id" element={<ViewMovie />} />
      <Route path="/manage-movies/add-movie" element={<MovieForm />} />

      {/* genre routes */}
      <Route path="/manage-genres" element={<ManageGenre />} />
      <Route path="/manage-genres/add-genre" element={<GenreForm />} />
      <Route path="/manage-genres/edit/:id" element={<GenreForm />} />
    </Routes>
  );
}

export default RoutesPage;
