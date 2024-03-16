export interface App {
    id: string;
    name: string;
    lastDeploymentDate: string;
    translations: Translation[];
}

export interface Word {
    English: string;
    French: string;
    Dutch: string;
}

export interface Translation {
    key: string;
    words: Word;
}

export type Apps = App[];