$(document).ready(function() {
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

 
  cardNumber.onkeyup = function() {
    let test = cardNumber.value.split('-').join('');
    let finalVal = test.match(/.{1,4}/gm).join('-');
    console.log(finalVal);
    cardNumber.value = finalVal;
    console.log(cardNumber.value.length);
  }


  $('.btn-payment').click((e) => { 
    e.preventDefault();
    
    checkInputs();
  });

  function checkInputs() {
    let firstNameValue = firstName.value; 
    let lastNameValue  = lastName.value; 
    let emailValue  = email.value.trim(); 
    let streetValue  = street.value; 
    let cityValue  = city.value; 
    let postCodeValue = postCode.value.trim(); 
    let cardNameValue = cardName.value; 
    let cardNumberValue  = cardNumber.value;
    let cardExpiryValue  = cardExpiry.value.trim();
    let cardCvvValue  = cardCvv.value.trim();

   
    if (firstNameValue === '') {
      setErrorFor(firstName, 'First name cannot be blank');
    } else {
      setSuccessFor(firstName);
    }

    if (lastNameValue === '') {
      setErrorFor(lastName, 'Last name cannot be blank');
    } else {
      setSuccessFor(lastName);
    }

    if (emailValue === '') {
      setErrorFor(email, 'Email address cannot be blank');
    } else if (!validEmailFormat(emailValue)) {
      setErrorFor(email, 'Email is not valid');
    } else {
      setSuccessFor(email);
    }

    if (streetValue === '') {
      setErrorFor(street, 'Street cannot be blank');
    } else {
      setSuccessFor(street);
    }

    if (cityValue === '') {
      setErrorFor(city, 'City cannot be blank');
    } else {
      setSuccessFor(city);
    }

    if (postCodeValue === '') {
      setErrorFor(postCode, 'Post code cannot be blank');
    } else if (!validPostCode(postCodeValue)) {
      setErrorFor(postCode, 'Post code invalid. It must be an Australian post code.')
    } 
    else {
      setSuccessFor(postCode);
    }

    if (cardNameValue === '') {
      setErrorFor(cardName, 'Card name cannot be blank');
    } else {
      setSuccessFor(cardName);
    }

    if (cardNumberValue === '') {
      setErrorFor(cardNumber, 'Card number cannot be blank');
    } else if (!validCardNumber(cardNumberValue)) {
      setErrorFor(cardNumber, 'Card number invalid.');
    } else {
      setSuccessFor(cardNumber);
    }

    if (cardExpiryValue === '') {
      setErrorFor(cardExpiry, 'Card date cannot be blank');
    } else if (!validCardExpiryDate(cardExpiryValue)) {
      setErrorFor(cardExpiry, 'Card date invalid.');
    } else {
      setSuccessFor(cardExpiry);
    }

    if (cardCvvValue === '') {
      setErrorFor(cardCvv, 'Card CVV cannot be blank');
    } else if (!validCvvFormat(cardCvvValue)) {
      setErrorFor(cardCvv, 'CVV is not valid');
    }
    else {
      setSuccessFor(cardCvv);
    }

  }

  function setErrorFor(input, message) {
    let inputId = input.getAttribute('id');
    $(`#invalid-${inputId}`).text(message);

    input.className = 'form-control input-error';
  }
  
  function setSuccessFor(input) {
    let inputId = input.getAttribute('id');
    $(`#invalid-${inputId}`).addClass('hidden');

    input.className = 'form-control input-success';
  }

  function validEmailFormat(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  function validPostCode(postCode) {
    return /[2-3]\d\d\d/.test(postCode);
  }

  function validCardNumber(cardNumber) {
    return /^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)
  }

  function validCardExpiryDate(date) {
    return /^\d{2}\/\d{2}$/.test(date);
  }

  function validCvvFormat(cvv) {
    return /[0-9]\d\d/.test(cvv);
  }

});