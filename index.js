/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // grab the current game from the list  using the index i                                       
        const game = games[i];
        

        // create a new div element, which will become t
        const gameCard = document.createElement("div");
        
        // add the class game-card to the div's class list
        gameCard.classList.add("game-card");


        // set the inner HTML using a template literal to display the image and 2 more info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" style="width: 300px; height: 200px;" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: $${game.backers}</p>
          `;

        // TIP: if your images are not displaying, make sure there is space

        // between the end of the src attribute and the end of the tag ("/>")



        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    
    }



}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games





/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

contributionsCard.innerHTML = `<p>${totalContributions.toLocaleString()}</p>`;

// grab the amount raised card
const raisedCard = document.getElementById("total-raised");

const totalDonated = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

raisedCard.innerHTML = `<p>$${totalDonated.toLocaleString()}</p>`;

const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length} Games`;




/*************************************************************************************
//  * Challenge 5: Add functions to filter the funded and unfunded games
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: functions, filter
// */


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // update statistics
    updateStatistics(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);

    // update statistics
    updateStatistics(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

    // update statistics
    updateStatistics(GAMES_JSON);
}

// update statistics based on the provided games
function updateStatistics(games) {
    const totalContributions = games.reduce((total, game) => total + game.contributions, 0);
    const totalDonated = games.reduce((total, game) => total + game.pledged, 0);
    const gameCount = games.length;

    // update the statistics on the page
    document.getElementById("total-contributions").textContent = totalContributions;
    document.getElementById("total-donated").textContent = totalDonated;
    document.getElementById("game-count").textContent = gameCount;
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");


// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal).length;



// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = numUnfundedGames === 1 ? "is 1 game" : `are ${numUnfundedGames} games`;



// create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.innerHTML = `There ${unfundedGamesString} that still need funding.`;
descriptionContainer.appendChild(unfundedGamesElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */


const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

const topGame = sortedGames[0];
const runnerUpGame = sortedGames[1];

const topGameName = document.createElement("h2");
topGameName.innerHTML = topGame.name; 

firstGameContainer.appendChild(topGameName);

const runnerUpGameName = document.createElement("h2");
runnerUpGameName.innerHTML = runnerUpGame.name; 


secondGameContainer.appendChild(runnerUpGameName);

