$(document).ready(function() {
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

  function showCar(car) {
    const carModelLowerCase = car.model.split("-").join("").toLowerCase();

    let output = `
      <div class="col card-col">
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
            <p class="card-text">Price per day: <span id="${car.model}-price">$${car.pricePerDay}.00</span></p>
            <button id="btn-${car.model}" class="btn-reserve">Reserve</button>
          </div>
        </div>
      </div>
    `;
    $('.card-row').append(output);

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
        price: parseInt(carPrice),
        inCart: car.inCart,
      }

      if (carStatus) {
        storeItem(carObject);
        calculateTotalCost(carObject);
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
      cartItems[carObject.tag].inCart + 1;
    } else {
      carObject.inCart = 1;
      cartItems = {
        [carObject.tag]: carObject
      }
    }

    sessionStorage.setItem("cars", JSON.stringify(cartItems));
  }

  function calculateTotalCost(carObject) {
    let cartCost = sessionStorage.getItem('totalCost');
    
    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      sessionStorage.setItem('totalCost', cartCost += carObject.price);
    } else {
      sessionStorage.setItem('totalCost', carObject.price);
    }
  }


  function displayCart() {
    let cartItems = sessionStorage.getItem('cars');
    cartItems = JSON.parse(cartItems);
    
    let cartOutput = "";
    let checkoutOutput = "";

    if (cartItems) {
      Object.values(cartItems).map(car => {
        cartOutput += `
        <tr id="${car.tag}" class="car-row">
          <td><img src="./img/${car.model}.jpeg" alt=""></td>
          <td>${car.name}</td>
          <td>$${car.price}.00</td>
          <td><input type="number" value="1" min="1" max="31"></td>
          <td><button id="${car.tag}" class="btn-remove">Remove</button></td>
        </tr>
        `;

        checkoutOutput += `
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">${car.name}</h6>
              <small class="text-muted">Mileage: ${car.mileage}</small>
            </div>
            <span class="text-muted">$${car.price}.00</span>
          </li>
        `;
      });

      $('.btn-checkout').removeClass('hidden');
    } 
    
    $('.checkout-list').prepend(checkoutOutput);
    $('.cart-table').append(cartOutput);
    $('.cart-count').text(sessionStorage.getItem('carsAddedToCart'));
    
    $(`.btn-remove`).click((e) => {
      let totalCost = sessionStorage.getItem('totalCost');
      totalCost = parseInt(totalCost);

      let row = e.target.parentElement.parentElement;
      
      let productName = row.childNodes[3].innerText;
      productName = productName.split(" ").join("").toLowerCase();
      
      sessionStorage.setItem('totalCost', totalCost - cartItems[productName].price);

      delete cartItems[productName];
      row.remove();

      sessionStorage.setItem('cars', JSON.stringify(cartItems));
      location.reload();
    });

    if (Object.keys(cartItems).length == 0) {
      $('.btn-checkout').addClass('hidden');
    }

  }
  displayCart();


  function displayCheckout() {
    let cars = sessionStorage.getItem('cars');
    cars = JSON.parse(cars);

    let totalCost = sessionStorage.getItem('totalCost');

    if (totalCost == null) {
      $('.payment-span').text(0);
    } else {
      $('.payment-span').text(`$${totalCost}.00`);
    }

    $('.btn-checkout').click(() => {
      if (Object.keys(cars).length > 0) {
        window.location.href = './checkout.html';
      } else {
        alert("Please add a car to proceed to payment.")
      }
    });
  }
  displayCheckout();
});





