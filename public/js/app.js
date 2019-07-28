console.log('Client side javascript loaded!')

const queryForm = document.querySelector('form')
const title = document.getElementById('title')
const text = document.getElementById('text')
const date = document.getElementById('date')
const resultsOne = document.querySelector('#results-1')
const resultsTwo = document.querySelector('#results-2')

queryForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const titleValue = title.value
    const textValue = text.value
    const dateValue = date.value

    resultsOne.textContent = 'Loading..'
    resultsTwo.textContent = ''

    fetch('/search?title=' + titleValue + '&text=' + textValue + '&date=' + dateValue).then((response) => {    
        response.json().then((data) => {
            if (data.error) {
                resultsOne.textContent = data
                resultsTwo.textContent = ''
            } else {
                console.log(data)
                resultsOne.textContent = data
                resultsTwo.textContent = data
            }
        })
    })
})