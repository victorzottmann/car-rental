function addItemToCard(cars) {
  // const ul = document.createElement('ul');

  cars.forEach((car) => {
    // let li = document.createElement('li');

    // for(let i in car) {
    //   li.innerHTML += `
    //     <p><span class="property">${i}:</span> ${car[i]}</p>
    //   `;
    // }

    // ul.appendChild(li);
    console.log(car);
  });

  // $('.card').append(ul);
}

function getCars() {
  try {
    $.ajax({
      type: "GET",
      url: "../data/cars.json",
      success: function (data) {
        const cars = data.cars;
        console.log('[ajax cars]:', cars);
        addItemToCard(cars);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

getCars();
