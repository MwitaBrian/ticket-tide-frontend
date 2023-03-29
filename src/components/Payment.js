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
        <button id="pay-with-card">Pay with Payoneer</button>
        <button id="pay-with-paypal">Pay with PayPal</button>
        <button id="pay-with-mpesa">Pay with Mpesa</button>
      </div>
    `;
    const payWithCardButton = paymentWindow.document.querySelector('#pay-with-card');
    payWithCardButton.addEventListener('click', () => {
      // Open credit card payment page
      paymentWindow.location.href = 'https://www.payoneer.com/login';
    });
    const payWithPaypalButton = paymentWindow.document.querySelector('#pay-with-paypal');
    payWithPaypalButton.addEventListener('click', () => {
      // Open PayPal login page
      paymentWindow.location.href = 'https://www.paypal.com/signin/pay-with-paypal';
    });
    const payWithMpesaButton = paymentWindow.document.querySelector('#pay-with-mpesa');
    payWithMpesaButton.addEventListener('click', () => {
      // Open Mpesa payment page
      paymentWindow.document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <h2>Pay with Mpesa</h2>
          <label for="phone-number">Phone Number:</label>
          <input type="text" id="phone-number" />
          <label for="full-name">Full Name:</label>
          <input type="text" id="full-name" />
          <label for="id-number">ID Number:</label>
          <input type="text" id="id-number" />
          <label for="id-amount">Amount:</label>
          <input type="text" id="id-number" />
          <button id="confirm-payment">Confirm Payment</button>
        </div>
      `;
      const confirmPaymentButton = paymentWindow.document.querySelector('#confirm-payment');
      confirmPaymentButton.addEventListener('click', () => {
        // Submit Mpesa payment
        const phoneNumber = paymentWindow.document.querySelector('#phone-number').value;
        const fullName = paymentWindow.document.querySelector('#full-name').value;
        const idNumber = paymentWindow.document.querySelector('#id-number').value;
        fetch(`/mpesa-payments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          },
          body: JSON.stringify({ payment: { amount, currency, description, phoneNumber, fullName, idNumber }})
        }).then(response => {
          if (response.ok) {
            // Payment created successfully
            paymentWindow.close();
          } else {
            // Handle payment error
            alert('Payment failed');
          }
        });
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount</label>
      <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <label htmlFor="currency">Currency (For M-pesa Users choose KES)</label>
      <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="KES">KES</option>
        <option value="CAD">CAD</option>
      </select>

      <label htmlFor="description">Description (Write the name of the event)</label>
      <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Pay Now</button> 
    </form>
  );
};

export default Payment;