import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import FormPage from './pages/FormPage';

import LoginPage from './pages/LoginPage';
import CardRouteWrapper from './components/CardRouteWrapper';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<FormPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/:uid' element={<CardRouteWrapper />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
