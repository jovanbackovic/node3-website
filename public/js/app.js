const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})