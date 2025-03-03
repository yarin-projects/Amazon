import Title from '../components/shared/Title';
import Loading from '../components/shared/Loading';
import useRequest from '../hooks/useRequest';
import MessageBox from '../components/shared/MessageBox';

const HomePage = () => {
  const { isLoading, error, data: products } = useRequest('/api/v1/products');
  return (
    <div>
      <Title title="Home Page" />
      <div className="backgroundHomePage">
        <img
          src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg"
          alt="Background Home Page"
          style={{ width: '100%' }}
        />
      </div>
      <div className="products">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          // <Products products={products} />
          <h1>hello</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
