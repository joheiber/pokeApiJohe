const todosPokemon = $('#listaPokemon')
let url = "https://pokeapi.co/api/v2/pokemon/"


for (let i = 1; i <= 151; i++) {

    fetch(url + i)
        .then((repuesta) => {
            if (repuesta.ok) {
                return repuesta.json()
                console.log(repuesta)
            } else {
                console.log(`error:${repuesta.statusText}`)
            }
        })
        .then(data => mostarPokemon(data))
}


function mostarPokemon(pokemon) {
    let altura = pokemon.height.toString()
    let peso = pokemon.weight.toString()
    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('')
    

    if (altura.length <= 1) {
        altura = "0," + altura
    } else {
        let antepenultimaPosicion = altura.length - 1;
        altura = altura.slice(0, antepenultimaPosicion) + "," + altura.slice(antepenultimaPosicion);
    }

    if (peso.length <= 1) {
        peso = "0," + altura
    } else {
        let antepenultimaPosicion = peso.length - 1;
        peso = peso.slice(0, antepenultimaPosicion) + "," + peso.slice(antepenultimaPosicion);
    }

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