import React from 'react';
import {
  Categories, Hero, LatestProducts, Header,
} from '../../Components';

function Home() {
  return (
    <div>
      <Header cartitems={[]} />
      <Hero />
      <Categories />
      <LatestProducts />

    </div>
  );
}

export default Home;
