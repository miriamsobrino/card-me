import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import FormPage from './pages/FormPage';
import CardPage from './pages/CardPage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<FormPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/:slug' element={<CardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
