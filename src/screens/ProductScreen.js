import React from 'react';
import { useParams } from 'react-router-dom';

function ProductScreen() {
  //we have to use hooks from react router dom that is use params to get the product in the product screen through data.js//
  const params = useParams();
  const { slug } = params;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}

export default ProductScreen;
