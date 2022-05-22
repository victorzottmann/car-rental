$(document).ready(function() {

  let firstName = sessionStorage.getItem('firstName');
  let lastName = sessionStorage.getItem('lastName');
  let email = sessionStorage.getItem('email');
  let street = sessionStorage.getItem('street');
  let city = sessionStorage.getItem('city');
  let postCode = sessionStorage.getItem('postCode');

  let fullName = `${firstName} ${lastName}`;

  $('.hello-message-customer').text(firstName);
  $('.receipt-customer-name').text(fullName);
  $('.receipt-email').text(email);
  $('.receipt-street').text(street);
  $('.receipt-city').text(city);
  $('.receipt-post-code').text(postCode);
});