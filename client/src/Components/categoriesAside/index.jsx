import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function CategoriesAside() {
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
  };

  return (
    <div className="categories-aside-section">
      <p className="categories-aside-section-title">Category</p>
      <div className="categories-choices-section">
        {categoriesArr
          ? categoriesArr.slice(0, 5).map((item, index) => (
            <button
              type="button"
              className="categorey-section-choice"
              style={{ background: colors[index] }}
              onClick={() => {
                navigate('/products', { state: { categoryId: item.id } });
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="categorey-aside-image"
              />
              <p className="categorey-aside-name">{item.name}</p>
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

export default CategoriesAside;
