let pokemonRepository = (function() {  //IIFE for pokemonlist
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      types: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      types: ['fire']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      weight: 9,
      types: ['water']
    },
    {
      name: 'Pidgey',
      height: 0.3,
      weight: 1.8,
      types: ['flying', 'normal']
    },
    {
      name: 'Blastoise',
      height: 1.6,
      weight: 85.5,
      types: ['water']
    }
  ];

  function add(pokemon) { //function to add new pokemon
    pokemonList.push(pokemon);
  }

  function getAll() { //function to retrieve full list of pokemons
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function () {
      showDetails(pokemon)
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) { //forEach loop to list all pokemons and their properties
  pokemonRepository.addListItem(pokemon);
});
