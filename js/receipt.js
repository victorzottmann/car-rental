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


  function displayItemsOnReceipt() {
    let cars = sessionStorage.getItem('cars');
    cars = JSON.parse(cars);
    
    let receiptOutput = "";

    if (cars) {
      Object.values(cars).map(car => {
        receiptOutput += `
          <tr id="${car.tag}" class="receipt-table-row">
            <td><img class="receipt-items-img" src="./img/${car.model}.jpeg" alt="Thumbnail of the car ${car.name}"></td>
            <td>${car.name}</td>
            <td>${car.inCart}</td>
            <td>$${car.price}.00</td>
            <td>$${car.price * car.inCart}.00</td>
          </tr>
        `;
      });
    } 
    $('.receipt-items-table > tbody').append(receiptOutput);

    $('.btn-continue').click(() => {
      console.log('Click');
    })
  }
  displayItemsOnReceipt();
});
