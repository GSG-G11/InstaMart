import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import Card from '../Card';

function CatProductsSlider({ catID, setErrorAlert }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/v1/categories/${catID}/products`);
        const { data } = result.data;
        setProducts(data);
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
    <div className="cat-products-continer">
      <h2 className="related-section-title">Related Products</h2>
      {products.length ? (
        <Slider
          className="products-slider"
          infinite={settings.infinite}
          speed={settings.speed}
          slidesToShow={settings.slidesToShow}
          slidesToScroll={settings.slidesToScroll}
        >
          {products.map(({
            id, name, price, imageUrl,
          }) => (
            <Card
              key={id}
              id={id}
              name={name}
              price={+price}
              imageUrl={imageUrl}
              color={colorsArr[id % colorsArr.length]}
            />
          ))}
        </Slider>
      ) : null}
    </div>
  );
}
CatProductsSlider.propTypes = {
  catID: PropTypes.number.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};
export default CatProductsSlider;
