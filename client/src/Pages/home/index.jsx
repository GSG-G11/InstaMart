import React from 'react';
import { Hero } from '../../Components';
import Header from '../../Components/header/Header';

function Home() {
  return (
    <div>
      <Header cartitems={[]} />
      <Hero />

    </div>
  );
}

export default Home;
