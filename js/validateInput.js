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
    checkInputs();

    const validInputs = document.getElementsByClassName('form-control input-success');
    const allInputsAreValid = validInputs.length == 6;

    if (allInputsAreValid) {
      window.location.href = './receipt.html';
    } else {
      console.log('Not Yet');
      console.log(validInputs.length);
    }   
  });

  function checkInputs() {
    let firstNameValue = firstName.value; 
    let lastNameValue  = lastName.value; 
    let emailValue  = email.value.trim(); 
    let streetValue  = street.value; 
    let cityValue  = city.value; 
    let postCodeValue = postCode.value.trim(); 
 
    if (firstNameValue === '') {
      setErrorFor(firstName, 'First name cannot be blank');
    } else {
      setSuccessFor(firstName);
      sessionStorage.setItem('firstName', firstNameValue);
    }
    
    if (lastNameValue === '') {
      setErrorFor(lastName, 'Last name cannot be blank');
    } else {
      setSuccessFor(lastName);
      sessionStorage.setItem('lastName', lastNameValue);
    }
    
    if (emailValue === '') {
      setErrorFor(email, 'Email address cannot be blank');
    } else if (!validEmailFormat(emailValue)) {
      setErrorFor(email, 'Email is not valid');
    } else {
      setSuccessFor(email);
      sessionStorage.setItem('email', emailValue);
    }
    
    if (streetValue === '') {
      setErrorFor(street, 'Street cannot be blank');
    } else {
      setSuccessFor(street);
      sessionStorage.setItem('street', streetValue);
    }
    
    if (cityValue === '') {
      setErrorFor(city, 'City cannot be blank');
    } else {
      setSuccessFor(city);
      sessionStorage.setItem('city', cityValue);
    }
    
    if (postCodeValue === '') {
      setErrorFor(postCode, 'Post code cannot be blank');
    } else if (!validPostCode(postCodeValue)) {
      setErrorFor(postCode, 'Post code invalid. It must be an Australian post code.');
    } else {
      setSuccessFor(postCode);
      sessionStorage.setItem('postCode', postCodeValue);
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
});