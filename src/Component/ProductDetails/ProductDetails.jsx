import React, { use, useEffect, useRef, useState } from 'react';
import {  useLoaderData} from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const {_id} = useLoaderData();
    const bidModelRef = useRef(null)
    const [bid, setBid] = useState([])
    const {user} = use(AuthContext)

    useEffect(()=>{
        fetch(`http://localhost:5000/products/bids/${_id}`)
        .then(res => res.json())
        .then(data =>{
            console.log('bid for the product', data)
            setBid(data)
        })
    }, [_id])
    

     const handleBidModelOpen =()=>{
            bidModelRef.current.showModal()
     }

     const handleBidSubmit =(e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(_id, name, email, bid)
        const newBid ={
            product : _id,
            beyer_name : name,
            beyer_email : email,
            beyer_image : user?.photoURL,
            bid_price : bid,
            status : "pending"
        }
        fetch('http://localhost:5000/bids', {
            method : "POST",
            headers :{
                'content-type' : 'application/json'
            },
            body : JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                bidModelRef.current.close();
                Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your bid has been placed",
  showConfirmButton: false,
  timer: 1500
});
        //  add the new bid to the state
        newBid._id = data.insertedId;
        const newBids = [...bid, newBid];
        newBids.sort((a, b) => b.bid_price - a.bid_price)
        setBid(newBids);
            }
            
        })

     }
    return (
        <div>
            {/* product info */}
             <div>
                <button onClick={handleBidModelOpen} className='btn btn-neutral'>I want to bay this Product</button>
    {/* Open the modal showModal() method */}

<dialog ref={bidModelRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Give the best offer!</h3>
    <p className="py-4">offer something seller can not resist </p>
    <form onSubmit={handleBidSubmit}>
         <fieldset className="fieldset">
           
          <label className="label">Name</label>
          <input type="text" className="input" name='name' readOnly defaultValue={user?.displayName || ''} />
            {/* email */}
         <label className="label">Email</label>
          <input type="email" className="input" name='email'
          readOnly defaultValue={user?.email || ''} />
          {/* bid amount */}
          <label className="label">Bid Amount</label>
          <input type="text" className="input" name='bid' placeholder='your bid amount'/>
          
          <button className="btn btn-neutral mt-4">Please Your Bid</button>
        </fieldset>
    </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
            </div>
            {/* bids for this product */}
            <div>
                    <h3 className='font-bold text-3xl'>bid for this product : {bid.length}</h3>

                    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         serial no.
        </th>
        <th>Beyer Name</th>
        <th>Beyer Job</th>
        <th>Bid Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        bid.map((bid, index) =>  <tr>
        <th>{index+1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={bid.beyer_image}
                  alt="beyer image" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.beyer_name}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
         {bid.beyer_email}
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>)
     }
     
   
     
     
    </tbody>
   
  </table>
</div>
            </div>
        </div>
    );
};

export default ProductDetails;