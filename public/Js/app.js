console.log("Client side javascript file is loading")

fetch('https://puzzle.mead.io/puzzle').then((response) => {
   response.json().then((data) => {
     console.log(data);
   })
})

//here fetch will fetch data from the url, then is used to act on the response wwhich takes a callback
//function , we act on that response y response.json func , we then call again to do something with that data 

// fetch('http://localhost:3000/weather?address=Mumbai').then((response) => {
//    response.json().then((data) => {
//       if(data.error){
//           console.log('Unable to fetch data');
//       }
//       else{
//           console.log(data.location , data.forecast);
//       }
//    })
// })

const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')


form.addEventListener('submit', (event) => {
   event.preventDefault() // used because as soon as user clicks on search button in index.hbs
   //the browser refreshes everytime causing the server to restart , so to prevent that
   // we use this function 
   const location = search.value // to extract input value and store in variable;
   msg1.textContent='Loading...'; // to set text content of the htm element
   msg2.textContent='';
   fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
       if(data.error){
           console.log(data.error);
           msg1.textContent=data.error;
       }
       else{
           console.log(data.location , data.forecast);
           msg1.textContent=data.location;
           msg2.textContent=data.forecast;
       }
      })
   })
})
