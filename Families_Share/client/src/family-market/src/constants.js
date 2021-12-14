import dotenv from "dotenv"
dotenv.config();

// TODO da tradurre
// TODO 2: va allora gestito il salvataggio dei valori e la loro riconversione nella lingua selezionata dall'utente,
//      perché se l'utente crea post in italiano e poi cambia lingua, viene salvato il dato in italiano.
export const NO_CATEGORY = {
    it: "Nessuna categoria",
    en: "No category",
    el: "Nessuna categoria",
    hu: "Nessuna categoria",
    nl: "Nessuna categoria",
    fr: "Nessuna categoria"
}
export const CATEGORIES = {
    it: [NO_CATEGORY["it"], "Abbigliamento", "Casa e Cucina", "Cancelleria", "Giochi e Videogiochi", "Informatica", "Libri"],
    en: [NO_CATEGORY["en"], "Abbigliamento", "Casa e Cucina", "Cancelleria", "Giochi e Videogiochi", "Informatica", "Libri"],
    el: [NO_CATEGORY["el"], "Abbigliamento", "Casa e Cucina", "Cancelleria", "Giochi e Videogiochi", "Informatica", "Libri"],
    hu: [NO_CATEGORY["hu"], "Abbigliamento", "Casa e Cucina", "Cancelleria", "Giochi e Videogiochi", "Informatica", "Libri"],
    nl: [NO_CATEGORY["nl"], "Abbigliamento", "Casa e Cucina", "Cancelleria", "Giochi e Videogiochi", "Informatica", "Libri"],
    fr: [NO_CATEGORY["fr"], "Abbigliamento", "Casa e Cucina", "Cancelleria", "Giochi e Videogiochi", "Informatica", "Libri"]
};

export const NO_TN_TYPE = {
    it: "Nessun tipo",
    en: "No type",
    el: "Nessun tipo",
    hu: "Nessun tipo",
    nl: "Nessun tipo",
    fr: "Nessun tipo"
}
export const TN_TYPES = {
    it: [NO_TN_TYPE["it"], "Prestito", "Donazione"],
    en: [NO_TN_TYPE["en"], "Loan", "Donation"],
    el: [NO_TN_TYPE["el"], "Prestito", "Donazione"],
    hu: [NO_TN_TYPE["hu"], "Prestito", "Donazione"],
    nl: [NO_TN_TYPE["nl"], "Prestito", "Donazione"],
    fr: [NO_TN_TYPE["fr"], "Prestito", "Donazione"]
};

export const FAMILY_MARKET_BASE_PAGE_URL = "/family-market";
export const TESTING = process.env.TESTING === "true";