import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import HomePage from './pages/HomePage';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage">
        <Header />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
