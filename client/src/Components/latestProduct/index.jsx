import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import './style.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../Card';

function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/v1/products');
        const { data } = result.data;
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);

  const colorsArr = [
    '#6f42c1',
    '#6610f2',
    '#d63384',
    '#fd7e14',
    '#dc3545',
    '#198754',
    '#ffc107',
    '#20c997',
    '#0dcaf0',
    '#6c757d',
    '#0d6efd',
    '#198754',
    '#0dcaf0',
    '#ffc107',
    '#dc3545',
    '#212529',
  ];

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: products.length < 4 ? products.length : 4,
    slidesToScroll: 3,
  };

  return (
    <div>
      <div className="latest-products-section">
        <p className="latest-products-section-title">Latest products</p>
        <div className="latest-products-section-cards">
          {isLoading ? (
            <CircularProgress sx={{ color: '#3bb77e' }} />
          ) : (
            <Slider
              className="products-slider"
              infinite={settings.infinite}
              speed={settings.speed}
              slidesToShow={settings.slidesToShow}
              slidesToScroll={settings.slidesToScroll}
            >
              {products
                .slice(0, 20)
                .map(
                  ({
                    id,
                    name,
                    price,
                    imageUrl,
                    category: { name: category },
                  }) => (
                    <Card
                      key={id}
                      id={id}
                      name={name}
                      price={+price}
                      imageUrl={imageUrl}
                      category={category}
                      color={colorsArr[id % colorsArr.length]}
                    />
                  ),
                )}
            </Slider>
          )}
        </div>
      </div>
      {errorAlert ? (
        <>
          {' '}
          <Alert severity="error" className="error-alert-message">
            Request failed
            {' '}
          </Alert>
        </>
      ) : null}
    </div>
  );
}

export default LatestProducts;
