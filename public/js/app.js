console.log("This is the js loaded from client side")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#error-p')
const messageTwo = document.querySelector('#success-p')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(search.value)
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    fetch('http://weatherapp-env.eba-vymg37g7.us-east-1.elasticbeanstalk.com/weather?address='+search.value).then((response)=>{
        console.log(response)
    response.json().then((data)=>{
        if(data.error){
            console.log("Unable to find any data")
            messageOne.textContent = data.error
        }else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast

            console.log(data.location)
            console.log(data.forcast)
        }
        
    })
})
})