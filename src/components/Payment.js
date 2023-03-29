import React, { useState } from 'react';

const Payment = ({ event }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const paymentWindow = window.open('', 'Payment', 'height=400,width=600');
    paymentWindow.document.title = 'Payment';
    paymentWindow.document.body.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2>Payment Details</h2>
        <p>Amount: ${amount} ${currency}</p>
        <p>Description: ${description}</p>
        <h3>Select Payment Method</h3>
        <button>Pay with Credit Card</button>
        <button>Pay with Mpesa</button>
        <button>Pay with PayPal</button>
        <button>Pay with Payoneer</button>
      </div>
    `;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount</label>
      <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <label htmlFor="currency">Currency</label>
      <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="KES">KES</option>
        <option value="CAD">CAD</option>
      </select>

      <label htmlFor="description">Description</label>
      <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Pay Now</button> 
    </form>
  );
};

export default Payment;