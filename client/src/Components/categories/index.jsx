import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [errorAlert, setErrorAlert] = useState(false);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/v1/categories');
        const { data } = result.data;
        setCategoriesArr(data);
      } catch (error) {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);
  const colors = {
    0: '#FEFCEB',
    1: '#FFF2FF',
    2: '#FFF2EB',
    3: '#F2FCE4',
    4: '#FEFCEB',
    5: '#FFF2FF',
    6: '#FFF2EB',
    7: '#F2FCE4',
  };

  return (
    <div className="categories-section">
      <p className="categories-section-title">Categories</p>
      <div className="category-cards-section">
        {categoriesArr
          ? categoriesArr.map((item, index) => (
            <button
              type="button"
              className="categorey-card"
              style={{ background: colors[index] }}
              onClick={() => { navigate('/products', { state: { categoryId: item.id } }); }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="categorey-image"
              />
              <p className="categorey-name">{item.name}</p>
            </button>
          ))
          : null}
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

export default Categories;
