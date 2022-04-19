"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/favourites", async function(){
    await this.rendering();
})

view.rendering =  async function () {

    await KWM_View.renderTemplate("favourites", document.getElementById("kwm-body"));

    let cities_container = document.getElementById("cities");
    let hotels_container = document.getElementById("hotels");

    let favourite_cities = await window.Core.model.getFavouriteCities();
    let favourite_hotels = await window.Core.model.getFavouriteHotels();


    for (let city of favourite_cities) {
        let div = document.createElement("div");
        div.classList.add("city");
        div.classList.add("card");
        div.classList.add("m-5");
        div.classList.add("w-25");
        cities_container.append(div);
        city.renderListMarkup(div);
    }

    for (let hotel of favourite_hotels) {
        let div = document.createElement("div");
        div.classList.add("hotel");
        div.classList.add("card");
        div.classList.add("m-5");
        div.classList.add("w-25");
        hotels_container.append(div);
        hotel.renderListMarkup(div);
    }
}

