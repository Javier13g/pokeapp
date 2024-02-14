export interface PokemonData {
    id: number;
    name: string;
    img: string;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    type: string;
    type2: string | null;
    typeColor: string;
    typeColor2: string | null;
}

export interface WeaknessesAndStrengthsData {
    doubleDamageFrom: any[];
    doubleDamageTo: any[];
    halfDamageFrom: any[];
    halfDamageTo: any[];
    noDamageFrom: any[];
    noDamageTo: any[];
}

export interface TypeColor {
    [key: string]: string;
}
