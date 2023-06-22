export interface Definition {
    word: string;
    score: number;
    tags: string[];
    defs?: string[];
}

export const fetchDefinition = async (word: string) => {
    const query = {
        sp: word + '*', // spelled like
        md: 'p', // metadata (definition, parts of speech, pronounciation)
        max: '100' // max results
    };

    const params = new URLSearchParams(query);

    const response = await fetch(`https://api.datamuse.com/words?${params.toString()}`);

    if (response.ok) {
        return await response.json();
    }
};
