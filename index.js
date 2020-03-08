let choiceColor;
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs')
const createHTML = require('create-html')
const htmlToPdf = require('html-to-pdf');

const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

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

function init() {
    inquirer
        .prompt(questions)
        .then(function (data) {
            const queryURL = `https://api.github.com/users/${data.username}`;
            switch (data.color) {
                case "green":
                    choiceColor = 0;
                    break;
                case "blue":
                    choiceColor = 1;
                    break;
                case "pink":
                    choiceColor = 2;
                    break;
                case "red":
                    choiceColor = 3;
                    break;
            }
            axios
                .get(queryURL)
                .then((res) => {

                    const html = createHTML({
                        title: 'Profile Generator',
                        lang: 'en',
                        dir: 'rtl',
                        head: `<meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                <title>Document</title>
                <style>
                    @page {
                      margin: 0;
                    }
                   *,
                   *::after,
                   *::before {
                   box-sizing: border-box;
                   }
                   html, body {
                   padding: 0;
                   margin: 0;
                   }
                   html, body, .wrapper {
                   height: 100%;
                   }
                   .wrapper {
                   background-color: ${colors[choiceColor]};
                   padding-top: 100px;
                   }
                   body {
                   background-color: white;
                   -webkit-print-color-adjust: exact !important;
                   font-family: 'Cabin', sans-serif;
                   }
                   main {
                   background-color: #E9EDEE;
                   height: auto;
                   padding-top: 30px;
                   }
                   h1, h2, h3, h4, h5, h6 {
                   font-family: 'BioRhyme', serif;
                   margin: 0;
                   }
                   h1 {
                   font-size: 3em;
                   }
                   h2 {
                   font-size: 2.5em;
                   }
                   h3 {
                   font-size: 2em;
                   }
                   h4 {
                   font-size: 1.5em;
                   }
                   h5 {
                   font-size: 1.3em;
                   }
                   h6 {
                   font-size: 1.2em;
                   }
                   .photo-header {
                   position: relative;
                   margin: 0 auto;
                   margin-bottom: -50px;
                   display: flex;
                   justify-content: center;
                   flex-wrap: wrap;
                   background-color: ${colors[choiceColor]};
                    color: ${colors[choiceColor]};

                   padding: 10px;
                   width: 95%;
                   border-radius: 6px;
                   }
                   .photo-header img {
                   width: 250px;
                   height: 250px;
                   border-radius: 50%;
                   object-fit: cover;
                   margin-top: -75px;
                   border: 6px solid ${colors[choiceColor]};
                   box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                   }
                   .photo-header h1, .photo-header h2 {
                   width: 100%;
                   text-align: center;
                   }
                   .photo-header h1 {
                   margin-top: 10px;
                   }
                   .links-nav {
                   width: 100%;
                   text-align: center;
                   padding: 20px 0;
                   font-size: 1.1em;
                   }
                   .nav-link {
                   display: inline-block;
                   margin: 5px 10px;
                   }
                   .workExp-date {
                   font-style: italic;
                   font-size: .7em;
                   text-align: right;
                   margin-top: 10px;
                   }
                   .container {
                   padding: 50px;
                   padding-left: 100px;
                   padding-right: 100px;
                   }
            
                   .row {
                     display: flex;
                     flex-wrap: wrap;
                     justify-content: space-between;
                     margin-top: 20px;
                     margin-bottom: 20px;
                   }
            
                   .card {
                     padding: 20px;
                     border-radius: 6px;
                     background-color: ${colors[choiceColor]};
                     color: ${colors[choiceColor]};
                     margin: 20px;
                   }
                   
                   .col {
                   flex: 1;
                   text-align: center;
                   }
            
                   a, a:hover {
                   text-decoration: none;
                   color: inherit;
                   font-weight: bold;
                   }
            
                   @media print { 
                    body { 
                      zoom: .75; 
                    } 
                   }

                   .pic{
                       text-align: center;
                   }
                </style>`,
                        body: `
                        
                    
                        <div class="wrapper">
                            <div class="photo-header">
                              <img class="img" src="${res.data.avatar_url}">
                              <h1>Hi</h1>
                              <h2>My name is ${res.data.login}</h2>
                              <i class="fas fa-map-marker-alt">
                                <a class="nav-link">Emeryville, CA</a>
                              </i>
                              <i class="fas fa-id-card">
                                <a href="${res.data.html_url}" class="nav-link">GitHub</a>
                              </i>
                            </div>
                            <div class="container">
                               <div class="bio">
                               <h4>Bio</h4>
                                <h3>${res.data.bio}</h3>
                               </div>
                               <div class="row">
                                  <div class="card col">
                                    <h3>Public Repositories</h3>
                                    <h4>${res.data.public_repos}</h4>
                                  </div>
                                  <div class="card col">
                                    <h3>Followers</h3>
                                    <h4>${res.data.followers}</h4>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="card col">
                                    <h3>Following</h3>
                                    <h4>${res.data.following}</h4>
                                  </div>
                                </div>
                            </div>
                `,
                    })
                    fs.writeFile('index.html', html, function (err) {
                        if (err) console.log(err)
                    })


                })
        })

        

        
    }



init();



