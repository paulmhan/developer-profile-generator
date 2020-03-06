const inquirer = require("inquirer");
const axios = require("axios");

const questions = [
    {
        type: "input",
        message: "What is your user name?",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        choices: ["green", "blue", "pink", "red"],
        name: "color"
    }
];

// function writeToFile(fileName, data) {
// }

function init() {
    inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`; 
        axios
        .get(queryURL)
        .then((res) => {
            switch(color){
                case "green":
                    data.color = 0;
                    break;
                case "blue":
                    data.color = 1;
                    break;
                case "pink":
                    data.color = 2;
                    break;
                case "red":
                    data.color = 3;
                    break;
                console.log(res.data);

            }
        })















    init();
