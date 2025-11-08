import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({latestProductsPromise}) => {
    const products = use(latestProductsPromise)
    console.log(products);
    return (
        <div>
            <h3 className='font-bold text-3xl text-center py-10'>Resent Product</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                products.map(product =><Product key={product._id} product={product}></Product>)
            }
            </div>
        </div>
    );
};

export default LatestProducts;