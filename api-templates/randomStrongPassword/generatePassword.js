// import { appendFile } from 'fs'
const { writeFile, readFile } = require('fs-extra');


const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const capsAlphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

(async () => {
    try {
        const randomPasswordRequiredLength = 16
        const randomPassword = []

        function returningChar(charArray) {
            const index = Math.floor(Math.random() * charArray.length)
            return charArray[index]
        }

        randomPassword.push(returningChar(alphabets))
        randomPassword.push(returningChar(capsAlphabets))
        randomPassword.push(returningChar(numbers))
        randomPassword.push(returningChar(symbols))

        const allCharsArray = [alphabets, capsAlphabets, symbols, numbers]

        for (let i = 0; i < randomPasswordRequiredLength - 4; i++) {
            const allCharsArrayIndex = Math.floor(Math.random() * allCharsArray.length)
            randomPassword.push(returningChar(allCharsArray[allCharsArrayIndex]))
        }

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        shuffle(randomPassword)
        const randomPasswordString = randomPassword.join('')
        console.log(randomPasswordString)

        const data = await readFile('generatedPassword.json', { utf: 8 })
        const dataObjParsed = JSON.parse(data)
        dataObjParsed.push({ randomPasswordString })
        const dataObjStringified = JSON.stringify(dataObjParsed)
        await writeFile('generatedPassword.json', dataObjStringified)
        console.log("appended successfully")

    } catch (error) {
        console.log(error.message)
    }
})()