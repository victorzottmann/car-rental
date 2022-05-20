$(document).ready(function() {

  let checkoutForm = document.getElementById('checkout-form');

  let firstName = document.getElementById('first-name');
  let lastName = document.getElementById('last-name');
  let email = document.getElementById('email');
  let street = document.getElementById('street');
  let city = document.getElementById('city');
  let postCode = document.getElementById('post-code');
  let cardName = document.getElementById('card-name');
  let cardNumber = document.getElementById('card-number');
  let cardExpiry = document.getElementById('card-date');
  let cardCvv = document.getElementById('card-cvv');

  let fields = [
    firstName, 
    lastName, 
    email, 
    street, 
    city, 
    postCode, 
    cardName, 
    cardNumber,
    cardExpiry,
    cardCvv
  ];

  $('.btn-payment').click((e) => { 
    e.preventDefault();
    
    fields.forEach((field) => {
      if (!field.value && field != cardExpiry) {
        $('.invalid-input').text("The field cannot be blank.");
      }

      if (!cardExpiry.value) {
        $('.invalid-date').text("The date cannot be blank.");
      }
    });
  });
});