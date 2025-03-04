import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import HomePage from './pages/home-page';
import Footer from './components/shared/footer';
import Header from './components/shared/header';
import SignUpPage from './pages/sign-up-page';

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
