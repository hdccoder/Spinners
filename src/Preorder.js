import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preorder = ({preorders}) => {

    return (
        <div>
          <h2>PreOrders</h2>
          {/* <ul>
            {preorders.map((preorder) => (
              <li key={preorder.id}>
                {preorder.product_name} - Quantity: {preorder.quantity}
              </li>
            ))}
          </ul> */}
        </div>
      );
    };
    
    export default Preorder;