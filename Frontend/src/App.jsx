import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Footer from './components/shared/footer';
import Header from './components/shared/header';
import HomePage from './pages/home.page';
import SignUpPage from './pages/sign-up.page';
import SignInPage from './pages/sign-in.page';
import ProductPage from './pages/product.page';
import { ToastContainer } from 'react-toastify';
import CartPage from './pages/cart.page';
import ShippingPage from './pages/shipping.page';
import PaymentPage from './pages/payment.page';
import SubmitOrderPage from './pages/submit-order.page';
import OrderPage from './pages/order.page';
import SearchPage from './pages/search.page';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage">
        <ToastContainer position="top-center" limit={3} />
        <Header />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path="/place-order" element={<SubmitOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
