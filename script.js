const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const container = document.querySelector('.container');
const poke_count = 150;

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for (let i = 1; i <= poke_count; i++) {
        await getPokemon(i);
    }
}

async function getPokemon(id) {
    const res = await axios(API_URL+id);
    const data = await res.data;
    console.log(data);
    createPokemonCard(data);
}

function createPokemonCard(data) {
    const div = document.createElement('div');
    div.classList.add('card');

    const name = data.name[0].toUpperCase() + data.name.slice(1);
    const id = data.id.toString().padStart(3, '0');
    const poke_types = data.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];
    div.style.backgroundColor = color;

    div.innerHTML  = `
        <img
          src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png"
          alt=""
          srcset=""
        />
        <h4 class="pokemon-id">#${id}</h4>
        <h3>${name}</h3>
        <p class="text">Type: ${type}</p>
    `;
    container.appendChild(div);
}

fetchPokemons();