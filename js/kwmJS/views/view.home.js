"use strict";

import KWM_View from "./../core/kwm-view.js";

export let view = new KWM_View("/", async function () {
    this.rendering();

});

view.rendering = async function() {

    await KWM_View.renderTemplate("home", document.getElementById("kwm-body"));

    let cities_container = document.getElementById("cities");
    let cities = await window.Core.model.getCities();

    for(let city of cities){
        let div = document.createElement("div");
        div.classList.add("city");
        div.classList.add("card");
        div.classList.add("m-5");
        div.classList.add("w-25");
        cities_container.append(div);
        city.renderListMarkup(div);
    }

    let hotels_container = document.getElementById("hotels");
    let hotels = await window.Core.model.getHotels();

    for(let hotel of hotels){
        let div = document.createElement("div");
        div.classList.add("hotel");
        div.classList.add("card");
        div.classList.add("m-5");
        div.classList.add("w-25");
        hotels_container.append(div);
        hotel.renderListMarkup(div);
    }

    let btnLogout = document.getElementById("logout").addEventListener("click", function (e){
        window.location.hash = "/login";
    });
};



