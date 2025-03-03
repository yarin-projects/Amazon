import Title from '../components/shared/Title';

const HomePage = () => {
  // const { isLoading, error, data } = useRequest('/api/v1/products');
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
    </div>
  );
};

export default HomePage;
