"use strict";

import KWM_View from "../kwmJS/core/kwm-view.js";

export default class City{
    constructor(id, city){
        Object.assign(this, city);
        this.id = id;
    }

    renderListMarkup(container){
        let self = this;
        KWM_View.renderTemplate("city.list", container,{
            id: this.id,
            name: this.name,
            country : this.country,
            nickname : this.nickname,
            image: this.image
        }).then(function(){
            return new Promise((resolve, reject)=>{
                self.addFavHandler(self.id);
                resolve();
            });
        });
    }


    renderSingleMarkup(container){
        let self = this;
        KWM_View.renderTemplate("city.single", container, {
            name: this.name,
            country : this.country,
            nickname : this.nickname,
            image: this.image,
            id: this.id
        }).then(async function (){
            let hotelsOfCity = await window.Core.model.getHotelsOfCity(self.id);
            let hotels_container = document.getElementById("hotels_of_city");
            for (let hotel of hotelsOfCity){
                let div = document.createElement("div");
                div.classList.add("hotel");
                div.classList.add("card");
                div.classList.add("m-5");
                div.classList.add("w-25");
                hotels_container.append(div);
                hotel.renderListMarkup(div);
            }
            return new Promise((resolve, reject)=>{
                self.addFavHandler(self.id);
                resolve();
            });
        });
    }

    addFavHandler(id){
        let fav_button = document.querySelectorAll(".favourite.city[data-id='"+id+"']")[0];
        if(window.Core.model.isFavourite("cities", id))
            fav_button.classList.add("is_favourite");
        fav_button.addEventListener("click", function (e){
            e.preventDefault();
            window.Core.model.toggleFavourite("cities", id);
            fav_button.classList.toggle("is_favourite");
        });
    }
}