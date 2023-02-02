$(document).ready(function() {
  let firstName = document.getElementById('first-name');
  let lastName = document.getElementById('last-name');
  let email = document.getElementById('email');
  let street = document.getElementById('street');
  let city = document.getElementById('city');
  let postCode = document.getElementById('post-code');

  let firstNameSession = sessionStorage.getItem('firstName');
  let lastNameSession = sessionStorage.getItem('lastName');
  let emailSession = sessionStorage.getItem('email');
  let streetSession = sessionStorage.getItem('street');
  let citySession = sessionStorage.getItem('city');
  let postCodeSession = sessionStorage.getItem('postCode');
  
  firstName.value = firstNameSession;
  lastName.value = lastNameSession;
  email.value = emailSession;
  street.value = streetSession;
  city.value = citySession;
  postCode.value = postCodeSession;

  $('.btn-payment').click((e) => { 
    e.preventDefault();
    validateInputs();

    const validInputs = document.getElementsByClassName('form-control input-success');
    const allInputsAreValid = validInputs.length == 6;

    if (allInputsAreValid) {
      window.location.href = './receipt.html';
    } 
  });

  function validateInputs() {
    let firstNameValue = firstName.value; 
    let lastNameValue  = lastName.value; 
    let emailValue  = email.value.trim(); 
    let streetValue  = street.value; 
    let cityValue  = city.value; 
    let postCodeValue = postCode.value.trim(); 
    
    if (firstNameValue === '') {
      setInputErrorFor(firstName, 'First name cannot be blank');
    } else {
      setInputSuccessFor(firstName);
      sessionStorage.setItem('firstName', firstNameValue);
    }
    
    if (lastNameValue === '') {
      setInputErrorFor(lastName, 'Last name cannot be blank');
    } else {
      setInputSuccessFor(lastName);
      sessionStorage.setItem('lastName', lastNameValue);
    }
    
    if (emailValue === '') {
      setInputErrorFor(email, 'Email address cannot be blank');
    } else if (!validEmailFormat(emailValue)) {
      setInputErrorFor(email, 'Email address is not valid');
    } else {
      setInputSuccessFor(email);
      sessionStorage.setItem('email', emailValue);
    }
    
    if (streetValue === '') {
      setInputErrorFor(street, 'Street cannot be blank');
    } else {
      setInputSuccessFor(street);
      sessionStorage.setItem('street', streetValue);
    }
    
    if (cityValue === '') {
      setInputErrorFor(city, 'City cannot be blank');
    } else {
      setInputSuccessFor(city);
      sessionStorage.setItem('city', cityValue);
    }
    
    if (postCodeValue === '') {
      setInputErrorFor(postCode, 'Post code cannot be blank');
    } else if (!validPostCode(postCodeValue)) {
      setInputErrorFor(postCode, 'Post code is not valid.');
    } else {
      setInputSuccessFor(postCode);
      sessionStorage.setItem('postCode', postCodeValue);
    }
  }

  function setInputErrorFor(input, message) {
    let inputId = input.getAttribute('id');
    $(`#invalid-${inputId}`).text(message);

    input.className = 'form-control input-error';
  }
  
  function setInputSuccessFor(input) {
    let inputId = input.getAttribute('id');
    $(`#invalid-${inputId}`).addClass('hidden');

    input.className = 'form-control input-success';
  }

  function validEmailFormat(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  function validPostCode(postCode) {
    return /[0-9]\d\d\d/.test(postCode);
  }
});