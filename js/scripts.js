let pokemonRepository = (function() {  //IIFE for pokemonlist
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) { //function to add new pokemon
    pokemonList.push(pokemon);
  }

  function getAll() { //function to retrieve full list of pokemons
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#PokedexModal');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function (event) {
      showDetails(pokemon)
    });
  }

  function loadList() {
   return fetch(apiUrl).then(function (response) {
     return response.json();
   }).then(function (json) {
     json.results.forEach(function (item) {
       let pokemon = {
         name: item.name,
         detailsUrl: item.url
       };
       add(pokemon);
     });
   }).catch(function (e) {
     console.error(e);
   })
 }

 function loadDetails(item) { //fetch pokemon details from API
 let url = item.detailsUrl;
 return fetch(url).then(function (response) {
   return response.json();
 }).then(function (details) {
   // Now we add the details to the item
   item.imageUrl = details.sprites.other['official-artwork']['front_default'];
   item.height = details.height;
   item.weight = details.weight;
   item.types = details.types;
 }).catch(function (e) {
   console.error(e);
 });
}

function showDetails(pokemon) { //show pokemon details in modal using details from loadDetails function
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}

function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader= $(".modal-header");

  modalTitle.empty();
  modalBody.empty();

  let modalPokemonName = $("<h1>" + pokemon.name + "</h1>"); //add h1 in modal for pokemon name

  let modalPokemonImg = $('<img class="modal-img" style="width:50%">'); //add pokemon image in modal
  modalPokemonImg.attr("src", pokemon.imageUrl);

  let modalPokemonHeight = $("<p>" + "Height: " + pokemon.height + "</p>"); //add paragraph to display height of pokemon

  let modalPokemonWeight = $("<p>" + "Weight: " + pokemon.weight + "</p>"); //add paragraph to display weight of pokemon

  modalTitle.append(modalPokemonName);
  modalBody.append(modalPokemonImg);
  modalBody.append(modalPokemonHeight);
  modalBody.append(modalPokemonWeight);

  pokemon.types.forEach(item => {
        let modalPokemonTypes = $("<p>" + "Type: " + item.type.name + "</p>")  //add paragraphs to display types of pokemon
        modalBody.append(modalPokemonTypes);
    });
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) { //forEach loop to list all pokemons and their properties
    pokemonRepository.addListItem(pokemon);
  });
});
