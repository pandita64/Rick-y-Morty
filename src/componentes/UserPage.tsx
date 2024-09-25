import axios from 'axios';
import { useEffect, useState } from 'react';
import { RickAndMortyAPIResponse, Character } from "../interfaces";

const loadCharacters = async (): Promise<Character[]> => {
    try {
        const { data } = await axios.get<RickAndMortyAPIResponse>('https://rickandmortyapi.com/api/character');
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const UserPage = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCharacters = await loadCharacters();
            setCharacters(fetchedCharacters);
        };

        fetchData();
    }, []);

    return (
        <>
            <h3>Personajes de Rick y Morty</h3>
            <div className="card-container">
                {characters.map(character => (
                    <div key={character.id} className="card">
                        <img src={character.image} alt={character.name} className="image" />
                        <h4>{character.name}</h4>
                        <p><strong>Ubicación:</strong> {character.location.name}</p>
                        <p><strong>Número de Episodios:</strong> {character.episode.length}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserPage;



