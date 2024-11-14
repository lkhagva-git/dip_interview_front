import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import JobApplicants from './pages/JobApplicants';
import Login from './pages/auth/Login';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // token байгаа эсэхийг шалган хэрэглэгч нэвтэрсэн үгүйг шалгана
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      {isAuthenticated && (
        <>
          <Navbar setIsAuthenticated={setIsAuthenticated} />
          <Sidebar />
        </>
      )}

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <JobApplicants />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
