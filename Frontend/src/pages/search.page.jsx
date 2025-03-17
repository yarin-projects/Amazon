import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildSearchQuery, extractParamsFromSearchUri, prices, rates } from '../utils';
import useRequest from '../hooks/use-request';
import { toast } from 'react-toastify';
import Title from '../components/shared/title';
import Rating from '../components/shared/rating';
import Loading from '../components/shared/loading';
import MessageBox from '../components/shared/message-box';
import Product from '../components/home/product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import LinkContainer from 'react-router-bootstrap';

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { category, query, price, rating, order, page } = extractParamsFromSearchUri(search);
  const searchQueryUrl = buildSearchQuery(category, query, price, rating, order, page);
  const {
    isLoading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useRequest('/api/v1/products/categories');

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
    if (categoriesError) {
      toast.error(categoriesError);
    }
  }, [categoriesData, categoriesError]);

  const { isLoading, error, data: productsData } = useRequest(`api/v1/products${searchQueryUrl}`);
  const { products = [], pages = 1, countProducts = 0 } = productsData || {};
  return (
    <>
      <Title title="Search Products" />
      <Row>
        <Col md={3}>
          <div>
            <h3>Categories</h3>
            <ul>
              <li>
                <Link
                  className={category === 'all' ? 'text-bold' : ''}
                  to={buildSearchQuery('all', query, price, rating, order, page)}
                >
                  All
                </Link>
                {categories.map(c => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'text-bold' : ''}
                      to={buildSearchQuery(c, query, price, rating, order, page)}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </li>
            </ul>
          </div>
          <div>
            <h3>Prices</h3>
            <ul>
              {prices.map(p => (
                <li key={p.value}>
                  <Link
                    className={p.value === price ? 'text-bold' : ''}
                    to={buildSearchQuery(category, query, p.value, rating, order, page)}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Ratings</h3>
            <ul>
              {rates.map(r => (
                <li key={r.value}>
                  <Link
                    className={r.value === rating ? 'text-bold' : ''}
                    to={buildSearchQuery(category, query, price, r.value, order, page)}
                  >
                    <Rating rating={r.rating} caption={' '} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {isLoading || categoriesLoading ? (
            <Loading />
          ) : error || categoriesError ? (
            <MessageBox variant="danger">
              {error}
              {categoriesError && <br />}
              {categoriesError}
            </MessageBox>
          ) : (
            <>
              <Row>
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ': ' + query}
                    {category !== 'all' && ': ' + category}
                    {price !== 'all' && ': ' + price}
                    {rating !== 'all' && ': ' + rating + ' Stars'}
                    {(query !== 'all' ||
                      category !== 'all' ||
                      price !== 'all' ||
                      rating !== 'all') && (
                      <Button
                        variant="light"
                        onClick={() =>
                          navigate(buildSearchQuery('all', 'all', 'all', 'all', 'newest', 1))
                        }
                      >
                        <i className="fas fa-times-circle" />
                      </Button>
                    )}
                  </div>
                </Col>
                <Col className="text-end">
                  Order By:
                  <select
                    value={order}
                    onChange={e =>
                      navigate(
                        buildSearchQuery(category, query, price, rating, e.target.value, page)
                      )
                    }
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
              <Row>
                {products.map(product => (
                  <Col key={product.token} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map(num => (
                  <LinkContainer
                    key={num}
                    to={buildSearchQuery(category, query, price, rating, order, num + 1)}
                  >
                    <Button variant='light' className={Number(page) === num + 1 && 'highlight-current-page'}>
                      {num + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SearchPage;
