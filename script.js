const slideValue = document.querySelector('.length .sub-title')
const inputSlider = document.querySelector('.range')

const uppercase = document.querySelector('#uppercase')
const numbers = document.querySelector('#numbers')
const symbols = document.querySelector('#symbols')

const generateBtn = document.querySelector('.btn-generate')
const passwordDisplay = document.querySelector('.generated-password')

//ASCII codes selection
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(58, 64)

//notification
const notification = document.querySelector('.notification')

const password = generatePassword()
passwordDisplay.innerHTML = password

//Whenever password length is changed
inputSlider.addEventListener('input', () => {
    let value = inputSlider.value
    console.log(value)
    console.log(value)
    slideValue.textContent = `Length: ${value}`
})

// Password Generate button clicked
generateBtn.addEventListener('click', () => {
    const password = generatePassword()
    passwordDisplay.innerHTML = password
})

// get range of ascii codes and push it to array
function arrayFromLowToHigh(low, high) {
    const arr = []
    for (let i = low; i <= high; i++) {
        arr.push(i)
    }
    return arr
}

function generatePassword() {
    let length = inputSlider.value
    let incUpper = uppercase.checked
    let incNumbers = numbers.checked
    let incSymbols = symbols.checked

    let charCodes = LOWERCASE_CHAR_CODES
    if (incUpper) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    if (incNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
    if (incSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES)
    console.log('charCodes', charCodes)

    console.log(Math.floor(Math.random() * length))
    const passwordCharacters = []
    for (let i = 0; i < length; i++) {
        const characterCode =
            charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    console.log(passwordCharacters)
    return passwordCharacters.join('')
}

passwordDisplay.addEventListener('click', () => {
    copyToClipboard(passwordDisplay.innerHTML)
})

// notification
const sendNotification = (text) => {
    notification.innerHTML = `${text}`
    notification.classList.remove('hidden')
    notification.classList.add('visible')
    setTimeout(() => {
        notification.classList.remove('visible')
        notification.classList.add('hidden')
    }, 2000)
}

// copy clipboard
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
        function () {
            sendNotification('Kopyalandı')
            console.log('Async: Copying to clipboard was successful!')
        },
        function (err) {
            console.error('Async: Could not copy text: ', err)
        }
    )
}
