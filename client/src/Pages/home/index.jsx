import React from 'react';
import { Categories, Hero } from '../../Components';
import Header from '../../Components/header/Header';

function Home() {
  return (
    <div>
      <Header cartitems={[]} />
      <Hero />
      <Categories />

    </div>
  );
}

export default Home;
