import { useState, useEffect } from "react";

interface WordMeaning {
    meaning: string;
    loading: boolean;
    error: string | null;
}

// Cache to store already fetched word meanings
const cache: { [key: string]: string } = {};

const useWordMeaning = (word: string): WordMeaning => {
    const [meaning, setMeaning] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWordMeaning = async () => {
            setLoading(true);
            setError(null);

            // Check if meaning exists in cache
            if (cache[word]) {
                setMeaning(cache[word]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const wordDefinition: string =
                    data[0].meanings[0].definitions[0].definition;

                // Cache the fetched meaning
                cache[word] = wordDefinition;
                setMeaning(wordDefinition);
            } catch (error) {
                setError("There was a problem fetching the word meaning.");
            } finally {
                setLoading(false);
            }
        };

        fetchWordMeaning();
    }, [word]);

    return { meaning, loading, error };
};

export default useWordMeaning;
