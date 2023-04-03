import React, { useState } from 'react';

const PaymentForm = ({ event }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
			`https://ticket-rjnl.onrender.com/events/${event.id}/payments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": document
						.querySelector('meta[name="csrf-token"]')
						.getAttribute("content"),
				},
				body: JSON.stringify({ payment: { amount, currency, description } }),
			}
		);

    if (response.ok) {
      // Payment created successfully
    } else {
      // Handle payment error
    }
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
      <button type="button" >Cancel</button>
    </form>
  );
};

export default PaymentForm;