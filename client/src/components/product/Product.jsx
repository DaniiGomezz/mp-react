import { useState } from "react";
import img from "../../assets/800_600_la-cancha-fútbol-5-y-6.jpg";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios"
import "./product.css";

const Product = () => {
  const [preferenceId, setPreferenceID] = useState(null);
  initMercadoPago("TEST-f90e20c5-1e42-44bf-835f-7cd6c55ff428");

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/create_preference",
        {
          description: "fulbo",
          price: 100,
          quantity: 1,
          currency_id: "ARS"
        }
      );
      const {id} = response.data;
      return id;
    
    } catch (error) {
        console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
        setPreferenceID(id);
    }
  }

  return (
    <div className="card-product-container">
      <div className="card-product">
        <div className="card">
          <img src={img} alt="product image" />
          <h3>Cancha le club</h3>
          <p className="price">100 $</p>
          <button onClick={handleBuy}>Alquilar</button>
          {preferenceId && <Wallet initialization={{ preferenceId}}/>} 
        </div>
      </div>
    </div>
  );
};

export default Product;
