
const weatherForm = document.querySelector('.search')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchTerm.value
    fetch("http://localhost:3000/weather?address="+location+"").then((response)=>{
    response.json().then((data)=>{
       if(data.error){
           messageOne.textContent = data.error
       }
       else{
           const temp = data.response.temperature
           const humidity = data.response.humidity
           const location = data.response.location
           const summary = data.response.summary
           messageOne.textContent = "The temperature in "+ location + " is " + temp + " degrees celcius and the humidity is "+ humidity
           messageTwo.textContent= " It will be "+ summary
       }
    })
}) 

})
console.log("Write here")