document.getElementById('search-btn').addEventListener('click', function() {
    var pokemonName = document.getElementById('pokemon-input').value.toLowerCase();
    if (pokemonName.trim() === '') {
        alert('Bitte geben Sie den Namen des Pokemons ein.');
        return;
    }
    fetchPokemonData(pokemonName);
});

function fetchPokemonData(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            console.log('Error fetching Pokemon data:', error);
            alert('Pokemon nicht gefunden. Bitte versuchen Sie es erneut.');
        });
}

function displayPokemon(pokemon) {
    var pokemonCard = document.getElementById('pokemon-card');
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <h3>Stats:</h3>
        <ul class="stats">
            ${pokemon.stats.map(stat => `<li><span>${stat.stat.name}:</span> ${stat.base_stat}</li>`).join('')}
        </ul>
        <h3>Abilities:</h3>
        <ul>
            ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
    `;
    pokemonCard.style.display = 'block';
}