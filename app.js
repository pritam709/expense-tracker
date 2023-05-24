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

window.addEventListener("DOMContentLoaded",()=>{

  axios.get("https://crudcrud.com/api/5fc7338da07942968e0cda5f69b6aeda/appointData")
  .then(response=>{
   console.log(response);
   for(let i=0;i<response.data.length;i++){
    liMaker(JSON.stringify(response.data[i]));
   }
  })
  .catch(err=>console.log(err))

})

form.addEventListener("submit",function(event){
     event.preventDefault();
    // const value=amount.value+" "+description.value+" "+category.value ;
    //  array.push(value);
    //  localStorage.setItem('items', JSON.stringify(array))

    
      const amount= event.target.amount.value;
      const description =event.target.description.value;
       const category= event.target.category.value;

      const obj ={
        amount,
        description,
         category
      }
      
      axios.post("https://crudcrud.com/api/5fc7338da07942968e0cda5f69b6aeda/appointData",obj)
      .then(response=>{
        console.log(response);
      })
      .catch(err=>console.log(err))
    

    // liMaker(value);

   

})


// data.forEach((item) => {
//     liMaker(item)
//   })