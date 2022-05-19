$(document).ready(function() {

  function showCar(car) {
    let carAvailable = car.availability ? "Available" : "Unavailable";
    let className = car.availability ? "car-available" : "car-unavailable";
  
    const carModelLowerCase = car.model.split("-").join("").toLowerCase();

    let output = `
      <div class="col">
        <div class="card h-100">
          <img 
            src="./img/${carModelLowerCase}.jpeg" 
            class="card-img-top" 
            alt="Image of the car ${car.brand} ${car.model}"
          />
          <div class="card-body">
            <h5 class="card-title" id="${car.model}-name">${car.brand} ${car.model}</h5><br />
            <p class="card-text">Mileage: <span id="${car.model}-mileage">${car.mileage} Km</span></p>
            <p class="card-text">Fuel type: <span id="${car.model}-fuel">${car.fuelType}</span></p>
            <p class="card-text">Price per day: <span id="${car.model}-price">${car.pricePerDay}</span></p>
            <p class="card-text"><span class="${className}">${carAvailable}</span></p>
            <button id="btn-${car.model}" class="btn-reserve">Reserve</button>
          </div>
        </div>
      </div>
    `;
    $('.row').append(output);

    $(`#btn-${car.model}`).click(() => { 
      
      let carName = $(`#${car.model}-name`).text();
      let carMileage = $(`#${car.model}-mileage`).text();
      let carFuel = $(`#${car.model}-fuel`).text();
      let carPrice = $(`#${car.model}-price`).text();
      let carModel = car.model;
      let carStatus = car.availability;
      let carTag = carName.replace(/ /g, "").toLowerCase();
      
      let carObject = {
        tag: carTag,
        name: carName,
        model: carModel,
        mileage: carMileage,
        fuel: carFuel,
        price: parseFloat(carPrice),
        inCart: 0,
      }

      if (carStatus) {
        storeItem(carObject);
        alert(`${carObject.name} was successfuly added to the cart.`)
      } else {
        alert("This car is currently unavailable. Please select another car.");
      }
    });
    
  }

  function storeItem(carObject) {
    let cartItems = sessionStorage.getItem('cars');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
      if (cartItems[carObject.tag] == undefined) {
        cartItems = {
          ...cartItems,
          [carObject.tag]: carObject
        }
      }
      cartItems[carObject.tag].inCart += 1;
    } else {
      carObject.inCart = 1;
      cartItems = {
        [carObject.tag]: carObject
      }
    }

    sessionStorage.setItem("cars", JSON.stringify(cartItems));
  }


  function displayCart() {
    let cartItems = sessionStorage.getItem('cars');
    cartItems = JSON.parse(cartItems);
    
    let output = "";

    if (cartItems) {
      Object.values(cartItems).map(car => {
        output += `
        <tr id="${car.tag}" class="car-row">
          <td><img src="./img/${car.model}.jpeg" alt=""></td>
          <td>${car.name}</td>
          <td>$${car.price}.00</td>
          <td><input type="number" value="1" min="1" max="31"></td>
          <td><button id="${car.tag}" class="btn-remove">Remove</button></td>
        </tr>
        `;
      });

      $('.btn-checkout').removeClass('hidden');
    } 
    
    $('.cart-table').append(output);
    $('.cart-count').text(sessionStorage.getItem('carsAddedToCart'));
    
    $(`.btn-remove`).click((e) => {
      let row = e.target.parentElement.parentElement;
      
      let productName = row.childNodes[3].innerText;
      productName = productName.split(" ").join("").toLowerCase();
      
      delete cartItems[productName];
      row.remove();

      sessionStorage.setItem('cars', JSON.stringify(cartItems));
    });

  }
  displayCart();

  function displayCheckout() {
    $('.btn-checkout').click(() => {
      console.log('click');
    })
  }

  displayCheckout();
  
  (function getCars() {
    try {
      $.ajax({
        type: "GET",
        url: "../data/cars.json",
        success: ({ cars }) => cars.forEach(car => showCar(car))
      });
    } catch (error) {
      console.log(error);
    }
  })();

});





