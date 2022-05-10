import React from 'react';
import {
  Categories, Hero, LatestProducts, CustomersReview, Footer,
} from '../../Components';
import Header from '../../Components/header/Header';

function Home() {
  return (
    <div>
      <Header cartitems={[]} />
      <Hero />
      <Categories />
      <LatestProducts />
      <CustomersReview />
      <Footer />
    </div>
  );
}

export default Home;
