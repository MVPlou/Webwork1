// Game Variables
let teammates;
let players;
let gamePlayers;
let gameID;
let startingPlayer;
let endingPlayer;
let solution;
let sessionID;

// Game Parameter Variables
let currentPlayer;
let currentTeammates;
var guessResults = [];
var guessedPlayers = [];
var eligiblePlayers = [];
const maxGuesses = 6;
var remainingGuesses = maxGuesses;
var currentGuessNumber = 1;
var gameState = "active";

// Styling Variables
const minSearchChars = 2;
const maxAutoCompleteResults = 4;
const minBarPerc = 8;

const autoCompleteButtons = document.getElementsByClassName("auto-complete-result");
const searchBar = document.getElementById("search_bar");
const statsModal = document.getElementById("modal_container");
const modalX = document.getElementById("close_button");
const shareSocial = document.getElementById("share_social");
const solutionEl = document.getElementById("solution");
const loaderContainer = document.getElementById("loader_container");
const copyModalEl = document.getElementById("copy_modal_container");
const headerStatsEl = document.getElementById("header_stats_button");
const headerInfoEl = document.getElementById("header_tutorial_button");
const headerSupportEl = document.getElementById("header_support_button");
const shareButton = document.getElementById("share_wrapper");
const supportModal = document.getElementById("support_modal_container");
const supportX = document.getElementById("support_modal_close_button");
const searchContainer = document.getElementById("search-container");
const tutorialX = document.getElementById("tutorial-modal-close-button")
const tutorialContainer = document.getElementById("tutorial-container");
const APIBaseURL = getAPIBaseURL();
var shareString = "";

// Player Variables
var statistics = {"numGames": 0, "numWins": 0, "currentStreak": 0, "maxStreak": 0, "winGuesses": {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}};

// Data Version Variables (last updated 7/19/22)
const playerDataVersion = "1.5";
const teammateDataVersion = "1.5";

// Game Type
const gameType = getGameType();
const gameTypeLocalStorageKeys = {
    "gameID": {"regular": "gameID", "unlimited": "gameID_unlimited"},
    "statistics": {"regular": "statistics", "unlimited": "statistics_unlimited"},
    "guessedPlayers": {"regular": "guessedPlayers", "unlimited": "guessedPlayers_unlimited"},
    "startingPlayer": {"regular": "startingPlayer", "unlimited": "startingPlayer_unlimited"},
    "endingPlayer": {"regular": "endingPlayer", "unlimited": "endingPlayer_unlimited"},
    "guessResults": {"regular": "guessResults", "unlimited": "guessResults_unlimited"},
    "currentGuessNum": {"regular": "currentGuessNum", "unlimited": "currentGuessNum_unlimited"},
    "gameState": {"regular": "gameState", "unlimited": "gameState_unlimited"},
    "sessionID": {"regular": "sessionID", "unlimited": "sessionID_unlimited"}
};

startupGame();

async function startupGame() {
    await loadData();
    checkForStatistics();
    currentPlayer = startingPlayer;
    currentTeammates = teammates[currentPlayer];
    updateEligiblePlayers();
    renderGame();
    checkForNewGame();
    hideLoader();
    checkForTutorial();
    positionSearchBar();
};

async function loadData() {
    // Load all required data
    await loadGamePlayers();
    await checkLocalPlayerData();
};

// API Calls
async function loadGamePlayers() {
    console.log("loading game players ...");
    var url = APIBaseURL;
    if (gameType == "unlimited") {
        url += "/random-game/";
    } else {
        const currentDateString = getCurrentDateString();
        url += "/game/?d=" + currentDateString;
    }

    const response = await fetch(url);
    const gamePlayerData =  await response.json()

    gamePlayers = gamePlayerData;
    gameID = gamePlayers["id"];
    startingPlayer = gamePlayers["start"]["id"];
    endingPlayer = gamePlayers["end"]["id"];
    solution = gamePlayers["solution"];
    console.log("finished loading game players");
};

async function loadPlayers() {
    console.log("loading players ...");
    const url = "/js/player_search_rankings.json"
    const response = await fetch(url)
    const playerData = await response.json()
    players = playerData;
    window.localStorage.setItem("players", JSON.stringify(playerData));
    window.localStorage.setItem("playerDataVersion", JSON.stringify(playerDataVersion));
    console.log("finished loading and updating players.");
};

async function loadTeammates() {
    console.log("loading teammates ...");
    const url = "/js/player_teammates.json"
    const response = await fetch(url);
    const teammateData = await response.json()
    teammates = teammateData;
    window.localStorage.setItem("teammates", JSON.stringify(teammateData));
    window.localStorage.setItem("teammateDataVersion", JSON.stringify(teammateDataVersion));
    console.log("finished loading and updating teammates.");
};

// Startup Functions
async function checkLocalPlayerData() {
    const localPlayerDataVersion = JSON.parse(window.localStorage.getItem("playerDataVersion"));
    const localTeammateDataVersion = JSON.parse(window.localStorage.getItem("teammateDataVersion"));
    const localPlayerData = window.localStorage.getItem("players");
    const localTeammateData = window.localStorage.getItem("teammates");

    if (!localPlayerData || !localPlayerDataVersion || localPlayerDataVersion != playerDataVersion) { // no local Player data, or outdated player data
        console.log("missing or outdated player data");
        await loadPlayers();
    }
    else {
        players = JSON.parse(window.localStorage.getItem("players"));
    };

    if (!localTeammateData || !localTeammateDataVersion || localTeammateDataVersion != teammateDataVersion) { // no local Teammate data
        console.log("missing or outdated teammate data");
        await loadTeammates();
    } else {
        teammates = JSON.parse(window.localStorage.getItem("teammates"));
    };
};

function checkForNewGame() {
    console.log("checking for new game");
    const localGameID = window.localStorage.getItem(gameTypeLocalStorageKeys["gameID"][gameType]); 
    if (!localGameID || localGameID != gameID) { // no game or different game in localStorage
        storeGame();
        updateSessionID();
        initializeGameParameters(); // may be redundant, but fine
        gtag("event", "gameStart", {
            "gameID": gameID.toString(),
            "sessionID": sessionID,
            "startingPlayer": lookupPlayer(startingPlayer),
            "endingPlayer": lookupPlayer(endingPlayer)
        });
    } else { // reload of same game
        console.log("reloading existing game.");
        const localGuessedPlayers = JSON.parse(window.localStorage.getItem("guessedPlayers"));
        if (localGuessedPlayers.length > 0) { // guessed players in localStorage 
            populateExistingGame();
        } else { // no guesses or does not exist
            initializeGameParameters();
        }

        const localSessionID = window.localStorage.getItem(gameTypeLocalStorageKeys["sessionID"][gameType]);
        if (!localSessionID) {
            updateSessionID();
        } else {
            sessionID = localSessionID;
        }

    }
};

function updateSessionID() {
    sessionID = makeSessionID();
    window.localStorage.setItem(gameTypeLocalStorageKeys["sessionID"][gameType], sessionID);
}

function checkForStatistics() {
    const localStatistics = window.localStorage.getItem(gameTypeLocalStorageKeys["statistics"][gameType]);
    if (!localStatistics) { // no statistics found in localStorage
        initializeStatistics();
    } else { // statistics are in localStorage
        statistics = JSON.parse(localStatistics);
    }
};

function checkForTutorial() {
    const localTutorial = window.localStorage.getItem("viewedTutorial");
    if (!localTutorial) { // no tutorial evidence in localStorage
        showTutorialModal();
        window.localStorage.setItem("viewedTutorial", JSON.stringify(true));
    }
}

function renderGame() {
    createPoolRows();
    // placeCursor();
    formatPrompt();
    formatStartingPoolRows();
    formatSearchPlaceholder();
    formatRemainingGuesses();
}

function createPoolRows() {
    const playerPoolWrapper = document.getElementById("player-pool");
    let playerPoolDivs = [];

    const startingPoolDiv = document.createElement("div");
    startingPoolDiv.id = "pool-row-start";
    startingPoolDiv.classList.add("pool-row");
    startingPoolDiv.classList.add("game-start");

    playerPoolWrapper.insertBefore(startingPoolDiv, searchContainer);
    // playerPoolDivs.push(startingPoolDiv)

    for (let index = 0; index < maxGuesses; index++) {
        const guessDiv = document.createElement("div");
        guessDiv.id = "pool-row-" + (index + 1).toString();
        guessDiv.className = "pool-row";

        if (index == 0) {
            guessDiv.setAttribute("data-active-pool-row", "");
            guessDiv.addEventListener("click", placeCursor);
        } else {
            guessDiv.setAttribute("data-hidden-pool-row", "");
        };
        
        playerPoolDivs.push(guessDiv);
    };

    const endingPoolDiv = document.createElement("div");
    endingPoolDiv.id = "pool-row-end";
    endingPoolDiv.classList.add("pool-row");
    endingPoolDiv.classList.add("game-end");
    // playerPoolDivs.push(endingPoolDiv);

    playerPoolWrapper.appendChild(endingPoolDiv);

    for (let index = 0; index < playerPoolDivs.length; index++) {
        // playerPoolWrapper.appendChild(playerPoolDivs[index]);
        playerPoolWrapper.insertBefore(playerPoolDivs[index], searchContainer);
    };
};

function placeCursor() {
    searchBar.focus();
    // searchBar.select();
};

function removeCursor() {
    searchBar.blur();
}

function formatPrompt() {
    const startPlayerEl = document.getElementById("prompt_player_1");
    const endPlayerEl = document.getElementById("prompt_player_2");
    startPlayerEl.innerHTML = lookupPlayer(startingPlayer);
    endPlayerEl.innerHTML = lookupPlayer(endingPlayer);
};

function formatSearchPrompt() {
    if (gameState != "win") {
        const searchPromptPlayerEl = document.getElementById("search_prompt_player");
        searchPromptPlayerEl.innerHTML = lookupPlayer(currentPlayer);
    };
};

function formatSearchPlaceholder() {
    searchBar.placeholder = "search for a teammate of " + lookupPlayer(currentPlayer);
}

function formatStartingPoolRows() {
    const startingPoolEl = document.getElementById("pool-row-start");
    const endingPoolEl = document.getElementById("pool-row-end");
    startingPoolEl.innerHTML = lookupPlayer(startingPlayer);
    endingPoolEl.innerHTML = lookupPlayer(endingPlayer);
};

function formatRemainingGuesses() {
    const remainingGuessesEl = document.getElementById("remaining_guesses_number");
    remainingGuessesEl.innerHTML = remainingGuesses.toString() + " ";

    if (remainingGuesses == 1) {
        const remainingGuessesSuffixEl = document.getElementById("remaining_guesses_suffix");
        remainingGuessesSuffixEl.innerHTML = "guess remaining )"
    }   
};

function populateExistingGame() {
    const existingGuessedPlayers = JSON.parse(window.localStorage.getItem(gameTypeLocalStorageKeys["guessedPlayers"][gameType]));

    for (let index = 0; index < existingGuessedPlayers.length; index++) {
        processGuess(existingGuessedPlayers[index], lookupPlayer(existingGuessedPlayers[index]),  true);
    };
};

function populatePoolRow(guessedPlayerName, guessResult) {
    const targetPoolRowEl = document.getElementById("pool-row-" + currentGuessNumber.toString());
    targetPoolRowEl.innerHTML = guessedPlayerName;
    targetPoolRowEl.setAttribute("data-guess-result", guessResult);
};

function clearSearchBar() {
    searchBar.value = "";
    displayAutoCompleteResults({"results": [], "q": "", "totalResults": 0})
};

function displayAutoCompleteResults(playerResultsObject) {
    const autoCompleteResults = document.getElementById("auto-complete-results");
    const playerResults = playerResultsObject.results;
    const searchQuery = playerResultsObject.q;
    const totalResults = playerResultsObject.totalResults;

    for (let index = 0; index < maxAutoCompleteResults; index++) {
        if (index < playerResults.length) {
            const guessedPlayerName = playerResults[playerResults.length - index - 1].display_name;
            const guessedPlayerID = playerResults[playerResults.length - index - 1].id;
            let resultRow = document.getElementById("result-" + index.toString());
            resultRow.innerHTML = guessedPlayerName;
            resultRow.dataset.playerId = guessedPlayerID
            autoCompleteResults.appendChild(resultRow);
        } else {
            const resultEl = document.getElementById("result-" + index.toString());
            resultEl.innerHTML = ""
            resultEl.dataset.playerId = "0"
        };
    };
    const searchStatsEl = document.getElementById("search_stats");
    if (playerResults.length == 0) {
        searchStatsEl.innerHTML = "";
    } else {
        searchStatsEl.innerHTML = playerResults.length.toString() + ' of ' + totalResults.toString() + ' results for "' + searchQuery + '"';
    };
};

function deactiaveSearchBar() {
    searchBar.disabled = true;
};

function showNextPoolRow() {
    const prevPoolRow = document.getElementById("pool-row-" + currentGuessNumber.toString());
    prevPoolRow.removeAttribute("data-active-pool-row");
    
    if (currentGuessNumber < maxGuesses && gameState != "win") {
        currentGuessNumber += 1;
        remainingGuesses -= 1;
        activatePoolRow(currentGuessNumber);
    }
};

function activatePoolRow() {
    const targetPoolRowEl = document.getElementById("pool-row-" + currentGuessNumber.toString());
    targetPoolRowEl.removeAttribute("data-hidden-pool-row");
    targetPoolRowEl.setAttribute("data-active-pool-row", "");
};

function showModalSlow() {
    statsModal.classList.add("show");
};

function showModalFast() {
    statsModal.classList.add("show");
    statsModal.classList.add("fast");
};

function showTutorialModal() {
    tutorialContainer.classList.add("show");
    tutorialContainer.classList.remove("hidden");
}

function showSupportModal() {
    supportModal.classList.remove("hidden");
    supportModal.classList.add("show");
}

function hideRemainingGuesses() {
    const remainingGuessesEl = document.getElementById("remaining_guesses");
    remainingGuessesEl.classList.add("hidden");
};

function formatShareString() {
    const guessMap = {"correct": "🟩", "winner": "✅", "incorrect": "⬛"};
    let shareText = ""
    if (gameType != 'unlimited') {
        shareText = "Dribble #" + gameID.toString() + "\n";
    } 
    const startingPlayerNames = lookupPlayer(startingPlayer).split(" ");
    const endingPlayerNames = lookupPlayer(endingPlayer).split(" ");
    const gamePlayerNames = [startingPlayerNames, endingPlayerNames];
    for (let p = 0; p < gamePlayerNames.length; p++) {
        for (let n = 0; n < gamePlayerNames[p].length; n++) {
            if (n == 0) {
                shareText += gamePlayerNames[p][n].charAt(0) + ". ";
            } else {
                shareText += gamePlayerNames[p][n] + " "
            };
        };
        if (p == 0) {
            shareText += "→ ";
        } else {
            shareText += "\n 🏀"
        };
    };

    for (let index = 0; index < maxGuesses; index++) {
        if (index <= guessResults.length - 1) {
            const char = guessMap[guessResults[index]]
            shareText += char
        } else {
            shareText += "⬜"
        };
    }

    shareText += "\n" + "https://dribblegame.com"
    return shareText
};

function abbreviateName(fullName) {
    const names = fullName.split(" ");
    var abbreviatedName = "";
    for (let index = 0; index < names.length; index++) {
        if (index == 0) {
            abbreviatedName += names[index].charAt(0) + ".";
        }        
        else {
            abbreviatedName += names[index];
        }

        if (index != names.length - 1) {
            abbreviatedName += " ";
        }
    }

    return abbreviatedName
}

function populateShareModal() {
    const numGamesEl = document.getElementById("num_games").querySelector('.stat-num');
    const winPercEl = document.getElementById("win_perc").querySelector('.stat-num');
    const currentStreakEl = document.getElementById("current_streak").querySelector('.stat-num');
    const maxStreakEl = document.getElementById("max_streak").querySelector('.stat-num');

    numGamesEl.innerHTML = statistics["numGames"];
    currentStreakEl.innerHTML = statistics["currentStreak"];
    maxStreakEl.innerHTML = statistics["maxStreak"];

    if (statistics["numGames"] == 0) {
        winPercEl.innerHTML = 0;
    } else {
        winPercEl.innerHTML = parseInt(100 * (statistics["numWins"] / statistics["numGames"]));
    }

    if (gameState == "win") {
        const winningGuessNum = guessResults.indexOf("winner");
        const winningBarEl = document.getElementById("bar_" + winningGuessNum.toString());
    
        winningBarEl.classList.remove("inactive");
        winningBarEl.classList.add("active");
    };

    var winGuessList = [];
    for (let i = 1; i <= maxGuesses; i++) {
        winGuessList.push(statistics["winGuesses"][i.toString()]);
    }

    const mostCommonWinGuess = Math.max.apply(null, winGuessList);
    for (let i = 0; i < maxGuesses; i++) {
        const barEl = document.getElementById("bar_" + i.toString())
        const barWidth = 8 + 92 * (statistics["winGuesses"][(i + 1).toString()] / mostCommonWinGuess)
        barEl.style.width = barWidth.toString() + "%";
    }

    for (let i = 0; i < maxGuesses; i++) {
        const barLabelEl = document.getElementById("bar_" + i.toString()).querySelector(".num-guesses");
        barLabelEl.innerHTML = statistics["winGuesses"][(i + 1).toString()];
    }
};

function showSolution() {
    solutionEl.classList.add('show');

    const introSpanEl = document.createElement("span");
    const solutionCopy = {"lose": "Shortest Path: ", "win": "Shorter Path: "};
    introSpanEl.classList.add("italic");
    introSpanEl.innerHTML = solutionCopy[gameState];
    solutionEl.appendChild(introSpanEl);
    solutionEl.appendChild(document.createElement("br"));

    for (let i = 0; i < gamePlayers.solution.length; i++) {
        const playerID = gamePlayers.solution[i];
        const spanEl = document.createElement("span");

        spanEl.innerHTML = lookupPlayer(playerID);
        if (playerID != startingPlayer && playerID != endingPlayer) {
            spanEl.classList.add("solution-correct");
        }  
        solutionEl.appendChild(spanEl);

        if (playerID != endingPlayer) {
            const spacerEl = document.createElement("span");
            spacerEl.innerHTML = " → ";
            solutionEl.appendChild(spacerEl);
        };
    };
};

function hideLoader() {
    loaderContainer.classList.add("hide");
};

// UI Constants and Listeners
Array.from(autoCompleteButtons).forEach(el => el.addEventListener("click", event => {
    const selectedPlayerID = event.target.getAttribute("data-player-id");
    const selectedPlayerName = event.target.innerHTML;
    processGuess(selectedPlayerID, selectedPlayerName);
    positionSearchBar();
}));

searchBar.addEventListener("keyup", (e) => {
    if(e.key === "Escape") {
        clearSearchBar();
        removeCursor();
        var searchString = "";
    } else {
        var searchString = e.target.value;

    }
    const searchResults = searchForPlayers(searchString);
    displayAutoCompleteResults(searchResults);
});

modalX.addEventListener("click", event => {
    statsModal.classList.remove("show");
    statsModal.classList.remove("fast");
});

supportX.addEventListener("click", event => {
    supportModal.classList.add("hidden");
    supportModal.classList.remove("show");
});

tutorialX.addEventListener("click", event => {
    tutorialContainer.classList.add("hidden");
    tutorialContainer.classList.remove("show");
})

headerStatsEl.addEventListener("click", event => {
    populateShareModal();
    if(gameState == "win" || gameState == "lose") {
        showShareButton();
    } else {
        hideShareButton();
    }
    showModalFast();
    console.log("stats");
});

headerInfoEl.addEventListener("click", event => {
    showTutorialModal();
});

headerSupportEl.addEventListener("click", event => {
    showSupportModal();
})

shareSocial.addEventListener("click", event => {
    if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
        navigator.share({
            text: shareString
        });   
    }
    else {
        navigator.clipboard.writeText(shareString);
        showCopyModal(); 
    }
});

function showCopyModal() {
    copyModalEl.classList.remove("hidden");
    copyModalEl.classList.add("show");
    setTimeout(hideCopyModal, 2000);
};

function hideCopyModal() {
    copyModalEl.classList.remove("show");
    copyModalEl.classList.add("hidden");
}

function showShareButton() {
    shareButton.classList.remove("hidden");
};

function hideShareButton() {
    shareButton.classList.add("hidden");
};

function positionSearchBar() {
    const prevGuessNumClass = "guess_num_" + (currentGuessNumber - 1).toString();
    const newGuessNumClass = "guess_num_" + currentGuessNumber.toString();
    searchContainer.classList.remove(prevGuessNumClass);
    searchContainer.classList.add(newGuessNumClass);
};

function hideSearchBar() {
    searchContainer.classList.add("hidden");
}

// localStorage Functions
function storeGame() {
    window.localStorage.setItem(gameTypeLocalStorageKeys["gameID"][gameType], gameID);
    window.localStorage.setItem(gameTypeLocalStorageKeys["startingPlayer"][gameType], startingPlayer);
    window.localStorage.setItem(gameTypeLocalStorageKeys["endingPlayer"][gameType], endingPlayer);
};

function initializeGameParameters() {
    window.localStorage.setItem(gameTypeLocalStorageKeys["guessedPlayers"][gameType], JSON.stringify([]));
    window.localStorage.setItem(gameTypeLocalStorageKeys["guessResults"][gameType], JSON.stringify([]));
    window.localStorage.setItem(gameTypeLocalStorageKeys["currentGuessNum"][gameType], 1);
    window.localStorage.setItem(gameTypeLocalStorageKeys["gameState"][gameType], "active");
};

function updateGameParameters() {
    window.localStorage.setItem(gameTypeLocalStorageKeys["guessedPlayers"][gameType], JSON.stringify(guessedPlayers));
    window.localStorage.setItem(gameTypeLocalStorageKeys["guessResults"][gameType], JSON.stringify(guessResults));
    window.localStorage.setItem(gameTypeLocalStorageKeys["currentGuessNum"][gameType], currentGuessNumber);
    window.localStorage.setItem(gameTypeLocalStorageKeys["gameState"][gameType], gameState);
};

function initializeStatistics() {
    window.localStorage.setItem(gameTypeLocalStorageKeys["statistics"][gameType], JSON.stringify(statistics));
};

function updateLocalStatistics() {
    window.localStorage.setItem(gameTypeLocalStorageKeys["statistics"][gameType], JSON.stringify(statistics));
};

// Gameplay Functions
function processGuess(selectedPlayerID, selectedPlayerName, replay = false) {
    evaluateGuess(selectedPlayerID);
    populatePoolRow(selectedPlayerName, guessResults[guessResults.length - 1]);
    clearSearchBar();
    evaluateGame(replay);
    showNextPoolRow();
    formatRemainingGuesses();
    updateEligiblePlayers();
    updateGameParameters();
    formatSearchPlaceholder();
    placeCursor();

    if (replay == false) {
        gtag("event", "guess", {
            "gameID": gameID.toString(),
            "sessionID": sessionID,
            "guessNum": (guessedPlayers.length).toString(),
            "guessedPlayer": selectedPlayerName
        })
    }
};

function evaluateGuess(guessedPlayerID) {
    var guessResult = "correct"

    if (currentTeammates.includes(guessedPlayerID)) { // valid guess
        currentPlayer = guessedPlayerID;
        updateCurrentTeammates();
        if (currentTeammates.includes(endingPlayer)) { // valid, winning guess
            guessResult = "winner";
        } 
    } else {
        guessResult = "incorrect";
    };

    guessResults.push(guessResult);
    guessedPlayers.push(guessedPlayerID);
};

function updateEligiblePlayers() {
    // Remove current player
    eligiblePlayers = [];
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        if (player.id != currentPlayer) {
            eligiblePlayers.push(player);
        };
    }
};

function evaluateGame(replay = false) {
    if (guessResults[guessResults.length - 1] == "winner") {
        gameState = "win";
    } else if (guessedPlayers.length == maxGuesses) {
        gameState = "lose";
    };

    if (gameState == "win" || gameState == "lose") {
        hideSearchBar();
        deactiaveSearchBar();
        hideRemainingGuesses();
        if (!replay) {
            updateStatistics();
        };
        populateShareModal();
        shareString = formatShareString();
        if (gameState == "lose" || guessedPlayers.length > solution.length -2) {
            showSolution();
        }
        showShareButton();
        showModalSlow();
        if (replay == false) {
            gtag("event", "gameEnd", {
                "gameID": gameID.toString(),
                "sessionID": sessionID,
                "startingPlayer": lookupPlayer(startingPlayer),
                "endingPlayer": lookupPlayer(endingPlayer),
                "gameResult": gameState,
                "numGuesses": (guessedPlayers.length).toString()
            })
        }
    }
};

function searchForPlayers(searchString) {
    if (searchString.length >= minSearchChars) {
        const filteredPlayers = eligiblePlayers.filter( player => {
            return player.name.toLowerCase().includes(searchString.toLowerCase())
        });
        const sortedPlayers = filteredPlayers.sort((a,b) => (a.search_rank < b.search_rank) ? 1: -1);
        return {"results": sortedPlayers.slice(0, maxAutoCompleteResults), "q": searchString, "totalResults": filteredPlayers.length};
    } else {
        return {"results": [], "q": "", "totalResults": 0};
    }
};

function updateStatistics() {
    statistics["numGames"] += 1;
    if (gameState == "win") {
        statistics["numWins"] += 1;
        statistics["currentStreak"]+= 1;
        statistics["maxStreak"] = Math.max(statistics["currentStreak"], statistics["maxStreak"]);

        const winningGuessNum = guessResults.indexOf("winner") + 1;
        statistics["winGuesses"][winningGuessNum.toString()] += 1

    } else {
        statistics["currentStreak"] = 0;
    }
    updateLocalStatistics();
};


// Misc Functions
function getCurrentDateString() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + mm + dd;
};

function lookupPlayer(playerID) {
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        if (player.id == playerID) {
            return player.display_name
        }
    }
    return null
};

function updateCurrentTeammates() {
    currentTeammates = teammates[currentPlayer];
};

function getGameType() {
    const pageURL = window.location.href.toString();
    if (pageURL.includes("unlimited")) {
        return "unlimited"
    } else {
        return "regular"
    }
};

function getAPIBaseURL() {
    const pageURL = window.location.href.toString();
    if (pageURL.includes("dev")) {
        return "https://dribble-game-dev-csa2s.ondigitalocean.app/app"
    } else {
        return "https://dribblegame.com/app"
    }
}

function makeSessionID() {
    const sessionIDLength = 8;
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length;
    for (var i = 0; i < sessionIDLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));        
    }
    return result;
}