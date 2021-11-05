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
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
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

let modalContainer = document.querySelector('#modal-container');

function showModal(pokemon) {
  modalContainer.innerHTML = '';

  let modal = document.createElement('div'); //add modal div
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button'); //add close button in modal
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'X';
  closeButtonElement.addEventListener('click', hideModal);

  let modalPokemonName = document.createElement('h1'); //add h1 in modal for pokemon name
  modalPokemonName.innerText = pokemon.name;

  let modalPokemonImg = document.createElement('img'); //add pokemon image in modal
  modalPokemonImg.src = pokemon.imageUrl;

  let modalPokemonHeight = document.createElement('p'); //add paragraph to display height of pokemon
  modalPokemonHeight.innerText = 'Height: ' + pokemon.height;

  let modalPokemonWeight = document.createElement('p'); //add paragraph to display weight of pokemon
  modalPokemonWeight.innerText = 'Weight: ' + pokemon.weight;

  modal.appendChild(closeButtonElement);
  modal.appendChild(modalPokemonName);
  modal.appendChild(modalPokemonImg);
  modal.appendChild(modalPokemonHeight);
  modal.appendChild(modalPokemonWeight);

  pokemon.types.forEach(item => {
        let modalPokemonTypes = document.createElement('p'); //add paragraphs to display types of pokemon
        modalPokemonTypes.innerText = ('Type: ') + item.type.name;
        modal.appendChild(modalPokemonTypes);
    });

  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible'); //when showModal function runs, the class is-visible is added to modal to display it via css
}

function hideModal() {
  modalContainer.classList.remove('is-visible'); //when hideModal function runs, the class is-visible is removed from modal to stop displaying it via css
}

window.addEventListener('keydown', (e) => { //run hideModal function when using Escape key if modal is currently visible
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => { //run hideModal function when clicking outside of modal if modal is currently visible
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

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
