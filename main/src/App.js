import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import JobApplicants from './pages/JobCandidates';
import Login from './pages/auth/Login';
import { useAuth } from './contexts/AuthContext';
import Profile from './pages/Profile';
import JobApplicantDetail from './pages/JobCandidateDetail';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const { auth } = useAuth();

  const routes = (
    <>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
              <JobApplicants />
            </div>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
              <Profile />
            </div>
          </PrivateRoute>
        }
      />
      <Route
        path="/detail"
        element={
          <PrivateRoute>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
              <JobApplicantDetail />
            </div>
          </PrivateRoute>
        }
      />
    </>
  );

  return (
    <>
      {auth.token && auth.profile && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}

      <div className={auth.token ? 'p-4 sm:ml-64' : ''}>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          {routes}
        </Routes>
      </div>
    </>
  );
}

export default App;
