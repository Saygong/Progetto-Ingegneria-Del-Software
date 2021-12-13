import dotenv from "dotenv"
dotenv.config();

export const CATEGORIES = ["Abbigliamento", "Casa e Cucina", "Cancelleria",
    "Giochi e Videogiochi", "Informatica", "Libri"];
export const TN_TYPES = ["Prestito", "Donazione"];
export const FAMILY_MARKET_BASE_PAGE_URL = "/family-market";
// TODO da rifattorizzare se servono altri linguaggi -> organizzare categorie e tntypes come text, in modo
//      che si possa fare tipo CATEGORIES[language]
// TODO 2: va allora gestito il salvataggio dei valori e la loro riconversione nella lingua selezionata dall'utente,
//      perché se l'utente crea post in italiano e poi cambia lingua, viene salvato il dato in italiano.

export const TESTING = process.env.TESTING === "true";
