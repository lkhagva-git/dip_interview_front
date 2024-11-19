import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import JobApplicants from './pages/JobCandidates';
import Login from './pages/auth/Login';
import { useAuth } from './contexts/AuthContext';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import CreateAnket from './pages/CreateAnket';
import JobCandidateDetail from './pages/JobCandidateDetail';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const PageWrapper = ({ children }) => (
  <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
    {children}
  </div>
);

function App() {
  const { auth } = useAuth();

  const privateRoutes = [
    { path: '/', element: <JobApplicants /> },
    { path: '/profile', element: <Profile /> },
    { path: '/candidate/:id', element: <JobCandidateDetail /> },
    { path: '/schedule', element: <Schedule /> },
    { path: '/createAnket', element: <CreateAnket /> },
  ];

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
          <Route path="/login" element={<Login />} />
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute>
                  <PageWrapper>{element}</PageWrapper>
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </div>
    </>
  );
}

export default App;
