const form = document.querySelector("form");
const ul = document.querySelector("ul");
const button = document.querySelector("button");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
let editID = "";
// let array = localStorage.getItem("items")
//   ? JSON.parse(localStorage.getItem("items"))
//   : [];
// localStorage.setItem("items", JSON.stringify(array));
// const data = JSON.parse(localStorage.getItem("items"));

const liMaker = (value) => {
  const obj = JSON.parse(value);
  // console.log(obj._id);
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.id = obj._id;
  button.textContent = "Delete Expense";
  button.addEventListener("click", () => {
    console.log("btn clicked" + obj._id);
    axios
      .delete(
        "https://crudcrud.com/api/33ae9a8d0fed49d6acec3b9a7ed6aa98/appointData/" +
          obj._id
      )
      .then((response) => {
        location.reload();

        // console.log(response);
      })
      .catch((err) => console.log(err));
  });
  const btn2 = document.createElement("button");
  btn2.id = obj._id;
  btn2.textContent = "Edit Expense";
  btn2.addEventListener("click", () => {
    amount.value = obj.amount;
    description.value = obj.description;
    category.value = obj.category;
    editID = obj._id;
  });
  li.textContent = value + " ";
  li.appendChild(btn2);
  li.appendChild(button);
  ul.appendChild(li);
};

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/33ae9a8d0fed49d6acec3b9a7ed6aa98/appointData"
    )
    .then((response) => {
      // console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        liMaker(JSON.stringify(response.data[i]));
      }
    })
    .catch((err) => console.log(err));
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // const value=amount.value+" "+description.value+" "+category.value ;
  //  array.push(value);
  //  localStorage.setItem('items', JSON.stringify(array))

  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  const obj = {
    amount,
    description,
    category,
  };

  let flag = false;

  axios
    .get(
      "https://crudcrud.com/api/33ae9a8d0fed49d6acec3b9a7ed6aa98/appointData/"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i]._id === editID) {
          flag = true;
          axios
            .put(
              "https://crudcrud.com/api/33ae9a8d0fed49d6acec3b9a7ed6aa98/appointData/" +
                editID,
              obj
            )
            .then((response) => {
              
              console.log(response.data);
            })
            .catch((err) => console.log(err));;
        }
      }
    });

  if(!flag){
    axios
    .post(
      "https://crudcrud.com/api/33ae9a8d0fed49d6acec3b9a7ed6aa98/appointData",
      obj
    )
    .then((response) => {
      id = response.data._id;

      axios
        .get(
          "https://crudcrud.com/api/33ae9a8d0fed49d6acec3b9a7ed6aa98/appointData/" +
            id
        )
        .then((response) => {
          console.log(response);
          //  for(let i=0;i<response.data.length;i++){
          //   liMaker(JSON.stringify(response.data[i]));
          //  }

          liMaker(JSON.stringify(response.data));
        })
        .catch((err) => console.log(err));
      // console.log(response.data._id);
    })
    .catch((err) => console.log(err));
  }

  // liMaker(value);
});

// data.forEach((item) => {
//     liMaker(item)
//   })
