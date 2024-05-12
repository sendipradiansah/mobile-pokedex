export async function getAllPokemon(pageParam : number){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(pageParam - 1) * 10}&limit=10`);
    return res.json();
}

export async function getPokemon(name: string | undefined | string[]){
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
    if(!res.ok){
        throw new Error(`Pokemon ${name} not found`)
    }
    return res.json();
}