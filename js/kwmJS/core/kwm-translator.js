"use strict";

export default class KWM_Translator{
    constructor(languages) {
        for (const lng of languages){
            this[lng] = KWM_Language[lng];
        }
        this.currentLanguage = window.Core.utils.getCookie("language") ? window.Core.utils.getCookie("language") : languages[0];
    }

    t(key, language = this.currentLanguage){
        return (typeof KWM_Language[language][key] === "undefined" ? "-- Missing Translation: " + key + " --" : KWM_Language[language][key]);
    }
}

let KWM_Language = {};
KWM_Language.en = {
    welcome_message: "Welcome to C-Holidays!",
    welcome_text: "Let yourself be carried away by our wonderful offers!",
    logout : "logout",
    login : "login",

    english: "English",
    german: "German",

    username: "username",
    password: "password",

    name: "Name",
    country: "Country",
    nickname: "Nickname",

    city_description: "City Description",
    hotels_of_this_city: "Hotels of this City",

    price: "Price",
    currency:"$",
    stars: "Stars",
    no: "no",
    city: "City",
    toCity: "To the City",
    toHotel: "To the Hotel",
    search: "Search",


    hotel_description: "Hotel Description",
    description: "Description",
    amenities: "Amenities",

    hotels: "Hotels",
    cities: "Cities",
    favourites: "Favourites",
    vienna: "Vienna",
    info: "More Infos?"
};

KWM_Language.de = {
    welcome_message: "Willkommen bei C-Holidays!",
    welcome_text: "Lass dich von unseren wundervollen Angeboten entführen!",
    logout: "Abmelden",
    login: "Anmelden",

    english: "Englisch",
    german: "Deutsch",

    username: "Benutzername",
    password: "Passwort",

    name: "Name",
    country: "Land",
    nickname: "Spitzname",

    city_description: "Genaueres zur Stadt",
    hotels_of_this_city: "Hotels der Stadt",

    price: "Preis",
    currency:"€",
    stars: "Sterne",
    no: "keine",
    city: "Stadt",
    toCity: "Zur Stadt",
    toHotel: "Zum Hotel",
    search: "Suchen",

    hotel_description: "Hotel Beschreibung",
    description: "Beschreibung",
    amenities: "Ausstattung",

    hotels: "Hotels",
    cities: "Städte",
    favourites: "Favouriten",
    vienna: "Wien",
    info: "Mehr Infos?"
};