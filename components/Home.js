import styles from '../styles/Home.module.css';
import { useEffect, useState, useRef } from 'react';
import Pokemon from './Pokemon';


function Home() {
const [pokemonsData, setPokemonsData] = useState([]); //liste de tous les pokemons affichés
const [startIndex, setStartIndex] = useState(1); //index du prochain pokemon à fetcher
const hasFetched = useRef(false); //pour éviter doublon dans le premier fetch

const fetchPokemons = async (count = 15) => {
  const newPokemons = []

  //récupère les pokemons de startIndex à startIndex + count
  for (let i=startIndex; i< startIndex + count; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const data = await response.json()
      
      newPokemons.push({
        id: data.id,
        name: data.name[0].toUpperCase() + data.name.slice(1),
        type: data.types[0].type.name,
        });
    }

    // On utilise la syntaxe fonctionnelle setState(prev => ...) 
    // pour être sûr d'utiliser la valeur la plus récente de l'état.
    // Utile quand la mise à jour dépend de l'ancienne valeur, 
    // surtout avec du code async ou plusieurs setState rapprochés.

    //ajoute les nouveaux pokemons à la liste existante
    setPokemonsData(prev => [...prev, ...newPokemons]);
    setStartIndex(prev => prev + count); // prépare le prochain fetch
  }

useEffect(() => {
  if (!hasFetched.current) {
  fetchPokemons(); //fetch initial au montage
  hasFetched.current = true; //empêche le double fetch à l'initialisation
  }
}, []);

const pokemons = pokemonsData.map(data => {
  return <Pokemon key={data.id} name={data.name} type={data.type} id={data.id}/>
})

  return (
    <div className={styles.main}>
      
      <h1 className={styles.titre}>Pokedex</h1>

      <div className={styles.pokemonContainer}>
        {pokemons}
      </div>
      <button className={styles.button} onClick={() => fetchPokemons()}>Next</button>

    </div>
  );
}

export default Home;
