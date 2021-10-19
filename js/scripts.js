let pokemonList = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    weight: 6.9,
    type: ['grass', 'poison']
  },
  {
    name: 'Charmander',
    height: 0.6,
    weight: 8.5,
    type: ['fire']
  },
  {
    name: 'Squirtle',
    height: 0.5,
    weight: 9,
    type: ['water']
  },
  {
    name: 'Pidgey',
    height: 0.3,
    weight: 1.8,
    type: ['flying', 'normal']
  },
  {
    name: 'Blastoise',
    height: 1.6,
    weight: 85.5,
    type: ['water']
  }
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ' m, weight: ' + pokemonList[i].weight + ' kg)'); // list all pokemons with height and weight
  if (pokemonList[i].height > 1.5) { // conditional to have a message display if height above a certain threshold
    document.write(" - Wow that's big!" + '</br')
  } else{
    document.write('</br>')
  }
}
