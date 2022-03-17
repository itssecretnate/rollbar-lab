const pokemonCounterHeader = document.getElementById('pokemonCounter');

// TODO: Make this async.
let pokemonCount;

axios.get('https://pokeapi.co/api/v2/pokedex/national').then(response => {
    pokemonCount = response.data.pokemon_entries.length;
    setCounter(pokemonCount)
}).catch(err => {
    pokemonCount = 151;
    setCounter(pokemonCount)
    alert("There was an error connecting to PokeAPI. Defaulting to 151 Pokémon. Code may not work poperly.")
    console.log(err);
})

const randomButton = document.getElementById('randPokemon');
const randomShinyButton = document.getElementById('randShinyPokemon');
const pokemonSpriteArea = document.getElementById('pokemonSprites');

const shinyLastPokemon = document.getElementById('shinyLastPokemon');
const clearPokemonButton = document.getElementById('clearPokemon');

// TODO: Store the image URLs for the last Pokemon.
let lastPokemon = [1, false]; // Set to Bulbasaur by default.

//TODO: Shiny chance button.
const shinyChance = 1 / 4096;

function randButton(event) {
    event.preventDefault();

    let isShiny = false;

    if(event.srcElement.id === 'randShinyPokemon') isShiny = true;

    axios.get('https://pokeapi.co/api/v2/pokemon').then(response => {
        
        let random = Math.floor(Math.random() * (pokemonCount - 1) + 1);
        
        // console.log(random);
        getPokemon(random, isShiny);
    })
}

function getPokemon(pokemonID, isShiny) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`).then(response => {
        const {name, sprites} = response.data;
        
        // Used to track the last Pokemon.
        lastPokemon = [pokemonID, isShiny];

        clearList();

        let frontImg = sprites.front_default;
        let shinyFrontImg = sprites.front_shiny;
        let newElement = document.createElement('img');

        let nameElement = document.createElement('h3');
        nameElement.innerText = name.toUpperCase();
        nameElement.setAttribute('style', `text-align: center;`)
        newElement.setAttribute("title", name);

        newElement.setAttribute("src", isShiny? shinyFrontImg : frontImg);

        pokemonSpriteArea.appendChild(nameElement);
        pokemonSpriteArea.appendChild(newElement);
    })
}

function clearList() {
    // TODO: Should probably find a better way of doing this?
    pokemonSpriteArea.innerHTML = '';
}

function setCounter(num) {
    pokemonCounterHeader.innerHTML = `Total number of Pokémon: ${num}`
}

randomButton.addEventListener('click', randButton)
randomShinyButton.addEventListener('click', randButton)

// TODO: Program a way to just load the other image instead of making a whole new request.
shinyLastPokemon.addEventListener('click', () => {
    getPokemon(lastPokemon[0], !lastPokemon[1])
})
clearPokemonButton.addEventListener('click', clearList)

console.log(randomButton);