import styles from '../styles/Pokemon.module.css';
import Image from 'next/image';

function Pokemon(props) {
    
    return(
    <div className={styles.pokemon}>
                <div className={styles.imgContainer}>
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt="pokemon" width={100} height={100}
                    />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{props.name}</h3>
                    <span className={styles.type}>
                        Type: <span>{props.type}</span>
                    </span>
                </div>
            </div>
    );
}

export default Pokemon;