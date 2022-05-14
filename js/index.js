$(document).ready(function() {

  function showCar(car) {
    let carAvailable = car.availability ? "Available" : "Unavailable";
    let className = car.availability ? "car-available" : "car-unavailable";
  
    const carModel = car.model.split("-").join("").toLowerCase()

    let output = `
      <div class="col">
        <div class="card h-100">
          <img 
            src="./img/${carModel}.jpeg" 
            class="card-img-top" 
            alt="Image of the car ${car.brand} ${car.model}"
          />
          <div class="card-body">
            <h5 class="card-title">${car.brand} ${car.model}</h5><br />
            <p class="card-text">Mileage: <span class="">${car.mileage} Km</span></p>
            <p class="card-text">Fuel type: <span>${car.fuelType}</span></p>
            <p class="card-text">Price per day: <span>${car.pricePerDay}</span></p>
            <p class="card-text"><span class="${className}">${carAvailable}</span></p>
            <button id="btn-${carModel}" class="btn-reserve">Reserve</button>
          </div>
        </div>
      </div>
    `;
    $('.row').append(output);

    $(`#btn-${carModel}`).click(() => { 
      if (!car.availability) {
        console.log("You cannot reserve this car at the moment");
      } 
      cartNumbers();
    });
  }


  let products = [
    {
      name: "Grey Shirt",
      tag: "greyshirt",
      price: 15,
      inCart: 0,
    }
  ]

  
  function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers'); // returns a string
    if (productNumbers) {
      $('.cart-count').text(productNumbers)
    }
  }
  onLoadCartNumbers();


  function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers'); // returns a string
    productNumbers = parseInt(productNumbers);
    
    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers += 1);
      $('.cart-count').text(productNumbers)
    } else {
      localStorage.setItem('cartNumbers', 1);
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



