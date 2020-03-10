let data = {};
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs')
const createHTML = require('create-html')
const htmlToPdf = require('html-to-pdf');

const colors = [
  {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
];

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
    .then(function ({ username, color }) {
      const queryURL = `https://api.github.com/users/${username}`;
      switch (color) {
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
      }






      axios
        .get(queryURL)
        .then((res) => {
          data.username = username;
          data.numOfRepo = res.data.public_repos;
          data.followers = res.data.followers;
          data.following = res.data.following;
          data.portPic = res.data.avatar_url;
          data.blog = res.data.blog;
          data.bio = res.data.bio;



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
                    background-color: ${colors[data.color].wrapperBackground};
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
                    background-color: ${colors[data.color].headerBackground};
                    color: ${colors[data.color].headerColor};
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
                    border: 6px solid ${colors[data.color].photoBorderColor};
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
                      background-color: ${colors[data.color].headerBackground};
                      color: ${colors[data.color].headerColor};
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
           
                </style>`,
            body: `
                    
          <header>
          <div class="wrapper">
            <div class='photo-header'>
              <img src="${data.portPic}"><br>
              <h1>Hi</h1>
              <h2>My name is ${data.username}</h2>
              <div class="links-nav">
                <a class="nav-link" href="https://github.com/${data.username}">github</a>
                <a class="nav-link" href="${data.blog}">blog</a>
              </div>
  
            </div>
          </header>
  
          <div class="container">
            <div class="row">
            <div class="col">
                <h4>${data.bio}</h4>
            </div>
            </div>
            <div class="row">
              <div class='col card'>
                <h2>Public repositories </h1>
                ${data.numOfRepo}
              </div>
  
              <div class="col card">
                <h2>Followers</h1>
                ${data.followers}
              </div>
            </div>
  
            <div class="row">
              <div class="card col">
                <h2>Following</h2>
                ${data.followers}
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

htmlToPdf.convertHTMLFile('index.html', 'index.pdf',
    function (error, success) {
       if (error) {
            console.log('Oh noes! Errorz!');
            console.log(error);
        } else {
            console.log('Woot! Success!');
            console.log(success);
        }
    }
);

