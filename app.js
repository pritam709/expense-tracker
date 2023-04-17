const form = document.querySelector("form");
const ul = document.querySelector("ul");
const button = document.querySelector('button');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
let array = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : []
localStorage.setItem('items', JSON.stringify(array));
const data = JSON.parse(localStorage.getItem('items'));


const liMaker= (value)=>{
    const li = document.createElement("li");
    const button= document.createElement("button");
    button.textContent="Delete Expense";
    const btn2= document.createElement("button");
    btn2.textContent="Edit Expense";
    li.textContent= value+" " ;
    li.appendChild(btn2);
    li.appendChild(button);
    ul.appendChild(li);
}

form.addEventListener("submit",function(event){
     event.preventDefault();
    const value=amount.value+" "+description.value+" "+category.value ;
     array.push(value);
     localStorage.setItem('items', JSON.stringify(array))

    liMaker(value);

})


data.forEach((item) => {
    liMaker(item)
  })