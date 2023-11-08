const todosPokemon = $('#listaPokemon')
let url = "https://pokeapi.co/api/v2/pokemon/"
let respuesta = []

for (let i = 1; i <= 151; i++) {
  respuesta.push(fetch(url + i)
        .then((repuesta) => {
            if (repuesta.ok) {
                return repuesta.json()
            } else {
                console.log(`error:${repuesta.statusText}`)
            }
        }).catch(error => console.error("Error al obtener datos:", error))
        )
        
}

Promise.all(respuesta).then(pokemones => {
  const pokemonesOrdenados = pokemones.sort((a, b) => a.id - b.id);
  pokemonesOrdenados.forEach(pokemon => mostrarPokemon(pokemon));
});

function mostrarPokemon(pokemon) {
    let altura = pokemon.height.toString()
    let peso = pokemon.weight.toString()
    
    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('')

    altura = (pokemon.height / 10).toFixed(1);
    peso = (pokemon.weight / 10).toFixed(1);

    todosPokemon.append(`
    <div class="cardPokemon">
        <p class="pokemonIdBack">#${pokemon.id}</p>
        <div class="pokemonImg">
          <img
            src="${pokemon.sprites.front_default}"
            alt="${pokemon.name}">
        </div>
        <div class="pokemonInfo">
          <div class="cotenedorNombre">
            <p class="idPokemon">#${pokemon.id}</p>
            <h1 class="nombrePokemon">${pokemon.name}</h1>
          </div>
          <div class="pokemonTipos">
            ${tipos}
          </div>
          <div class="pokemonStats">
            <p class="stat">${altura}m</p>
            <p class="stat">${peso}kg</p>
          </div>
        </div>
      </div>
    `)
}