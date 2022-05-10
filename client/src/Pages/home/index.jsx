import React from 'react';
import {
  Categories, Hero, LatestProducts, Header, CustomersReview, Footer,
} from '../../Components';

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
