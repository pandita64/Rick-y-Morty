import axios from 'axios';
import { useEffect, useState } from 'react';
import { RickAndMortyAPIResponse, Character } from "../interfaces";

const loadCharacters = async (page: number): Promise<Character[]> => {
    try {
        const { data } = await axios.get<RickAndMortyAPIResponse>(`https://rickandmortyapi.com/api/character?page=${page}`);
        return data.results.slice(0, 10); // Limitar a 8 personajes
    } catch (error) {
        console.error(error);
        return [];
    }
};

const UserPage = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCharacters = await loadCharacters(currentPage);
            setCharacters(fetchedCharacters);
        };

        fetchData();
    }, [currentPage]);

    const handleNextPage = () => setCurrentPage((prev) => prev + 1);
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <>
        <div className="main-container"></div>
        <h3>The Rick and Morty</h3>
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
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={handleNextPage}>Siguiente</button>
            </div>
        </>
    );
};

export default UserPage;




