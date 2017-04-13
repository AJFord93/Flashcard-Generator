const inquirer = require('inquirer')
const fs = require('fs')
const basic = require('./simple')
const cloze = require('./cloze')
let points = 0;

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Make Flashcard', 'Take Quiz'],
        name: 'action'
    }
]).then(function (data) {
    switch (data.action) {
        case 'Make Flashcard':
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'What type of card?',
                    choices: ['Cloze', 'Basic'],
                    name: 'cardType'
                }
            ]).then(function (data) {
                switch (data.cardType) {
                    case 'Cloze':
                        console.log('Creating cloze card');
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: 'Full Text',
                                name: 'fullText'
                            },
                            {
                                type: 'input',
                                message: 'Answer',
                                name: 'answer'
                            }
                        ]).then(function (data){
                            let clozeCard = new cloze(data.answer, data.fullText);
                            console.log(clozeCard);
                            fs.appendFile('cards.txt', JSON.stringify(clozeCard), function(error){
                                if (error) {
                                    console.log('error', error);
                                }
                            })
                        });
                        break;
                    case 'Basic':
                        console.log('Creating basic cards.');
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: 'Question',
                                name: 'question'
                            },
                            {
                                type: 'input',
                                message: 'Answer',
                                name: 'answer'
                            }
                        ]).then(function (data){
                            let basicCard = new basic(data.question, data.answer);
                            console.log(basicCard);
                            fs.appendFile('cards.txt', ',' + JSON.stringify(basicCard), function(error){
                                if (error) {
                                    console.log('error', error);
                                }
                            })
                        });
                        break;
                }
            });

            break;

        case 'Take Quiz':
            console.log('You are now taking a quiz.');
            let cards = [];

            fs.readFile("cards.txt", "utf8", function(error, data) {
                if (error) {
                    console.log('error', error);
                }

                cards.push(data);

                for (var i = 0; i < cards.length; i++) {
                    console.log("Insert Card Text Here??");
                    let message = cards[i].question;


                    inquirer.prompt([
                        {
                            type: 'input',
                            message: message,
                            name: 'userGuess'
                        }
                    ]).then(function(data) {
                        if (data.userGuess == cards[i].answer){
                            points++;
                            console.log('Correct')
                        } else {
                            console.log('Sorry, the  correct answer was: ' + cards[i].answer);
                        }

                    });
                }
            });
            break;
        default:
            console.log('There was an error.');
    }

});
