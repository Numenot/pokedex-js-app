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
    return pokemonList
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) { //forEach loop to list all pokemons and their properties
  document.write(pokemon.name + ' (height: ' + pokemon.height + ' m, weight: ' + pokemon.weight + ' kg)'); // list all pokemons with height and weight
    if (pokemon.height > 1.5) { // conditional to have a message display if height above a certain threshold
      document.write(" - Wow that's big!" + '</br')
    } else{
      document.write('</br>')
    }
});
