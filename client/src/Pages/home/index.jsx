import React from 'react';
import { Categories, Hero, LatestProducts } from '../../Components';
import Header from '../../Components/header/Header';

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
