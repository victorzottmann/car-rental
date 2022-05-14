$(document).ready(function() {

  function showCar(car) {
    let carAvailable = car.availability ? "Available" : "Unavailable";
    let className = car.availability ? "car-available" : "car-unavailable";
  
    const lowerCaseCarModel = car.model.split("-").join("").toLowerCase()

    let output = `
      <div class="col">
        <div class="card h-100">
          <img 
            src="./img/${lowerCaseCarModel}.jpeg" 
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
      cartNumbers();

      let carName = $(`#${car.model}-name`).text();
      let carMileage = $(`#${car.model}-mileage`).text();
      let carFuel = $(`#${car.model}-fuel`).text();
      let carPrice = $(`#${car.model}-price`).text();
      let carStatus = car.availability;

      let carObject = {
        name: carName,
        mileage: carMileage,
        fuel: carFuel,
        price: parseFloat(carPrice),
        inCart: 0,
      }

      if (carStatus) {
        storeItem(carObject);
      } else {
        console.log("You can't add this car");
      }


    });
  }

  function storeItem(carObject) {
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
      if (cartItems[carObject.name] == undefined) {
        cartItems = {
          ...cartItems,
          [carObject.name]: carObject
        }
      }
      cartItems[carObject.name].inCart += 1;
    } else {
      carObject.inCart = 1;
      cartItems = {
        [carObject.name]: carObject
      }
    }

    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }


  function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers'); // returns a string
    if (productNumbers) {
      $('.cart-count').text(productNumbers)
    }
  }
  onLoadCartNumbers();


  function cartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers'); // returns a string
    productNumbers = parseInt(productNumbers);
    
    if (productNumbers) {
      sessionStorage.setItem('cartNumbers', productNumbers += 1);
      $('.cart-count').text(productNumbers)
    } else {
      sessionStorage.setItem('cartNumbers', 1);
      $('.cart-count').text(1)
    }
  }
  
  
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
})



