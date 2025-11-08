import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const MyBids = () => {
    const {user} = use(AuthContext);
    const [bid, setBid] = useState([])
    
    useEffect(()=>{
        if(user?.email){
          fetch(`http://localhost:5000/bids?email=${user.email}`)
          .then(res => res.json())
          .then(data =>{
            console.log(data);
            setBid(data)
          })
        }
    }, [user]);

    const handleRemoveBid =(_id)=>{
             Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    fetch(`http://localhost:5000/bids/${_id}`, {
        method : "DELETE"
    })
    .then(res => res.json())
    .then(data =>{
       if(data.deletedCount){
              Swal.fire({
      title: "Deleted!",
      text: "Your bids has been deleted.",
      icon: "success"
    });

    //    
    const remainingBids = bid.filter(bid => bid._id !== _id);
    setBid(remainingBids);
       }
    })
    
  }
});
    }


    return (
        <div>
            <h3 className='font-bold text-3xl'> my bids : {bid.length}</h3>

    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         seral no.
        </th>
        <th>product</th>
        <th>seller</th>
        <th>Bid Price</th>
        <th>status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        bid.map((bid, index) =>  <tr key={bid._id}>
        <th>{index+1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.beyer_name}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
         {bid.product}
        </td>
        <td>{bid.bid_price}</td>
        <td>
            {
                bid.status === "pending" ? <div class="badge badge-warning">{bid.status}</div> : <div class="badge badge-success">{bid.status}</div> 
            }
            
        </td>
        <th>
          <button onClick={() => handleRemoveBid(bid._id)} className="btn btn-ghost btn-xs">Remove bid</button>
        </th>
      </tr>)
     }
     
    
     
    
   
    </tbody>
   
  </table>
</div>
        </div>
    );
};

export default MyBids;