"use strict";

import KWM_View from "../kwmJS/core/kwm-view.js";

export default class Hotel{
    constructor(id, hotel) {
        Object.assign(this, hotel);
        this.id = id;
    }

    renderListMarkup(container){
        let self = this;
        this.showStars(self.stars);
        KWM_View.renderTemplate("hotel.list", container,{
            id: this.id,
            name: this.name,
            price: this.price,
            stars: this.stars,
            image: this.images[0].src,
            description: this.description
        }).then(function(){
            return new Promise((resolve, reject)=>{
                self.addFavHandler(self.id);
                resolve();
            });
        });
    }


    async renderSingleMarkup(container){
        let self = this;
        this.showStars(self.stars);
        let city = await window.Core.model.getCity(self.city);
        KWM_View.renderTemplate("hotel.single", container, {
            name: this.name,
            country: city.country,
            latitude: this.latitude,
            longitude: this.longitude,
            price: this.price,
            city: city.name,
            address: this.address,
            email: this.email,
            phone: this.phone,
            web: this.website,
            amenities: this.amenities,
            stars: this.stars,
            description: this.description,
            image: this.images[0].src,
            id: this.id
        }).then(async function (){

            let mymap = L.map('mapid').setView([self.latitude, self.longitude], 13);
            let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            let tiles = L.tileLayer(tileUrl, {attribution});
            tiles.addTo(mymap);

            let myIcon = L.icon({
                iconUrl: "./assets/cMarker.png",
                iconSize: [90, 72],
                iconAnchor: [25, 16]
            });

            L.marker([self.latitude, self.longitude], {icon: myIcon}).addTo(mymap);

            for (let image of self.images){
                let img = document.createElement("img");
                img.classList.add("hotel_gallery_bg");
                img.style.width = 100/(self.images.length-1)+"%";
                img.src  = image.src;
                document.getElementById('hotel_gallery').appendChild(img);
            }

            return new Promise((resolve, reject)=>{
                self.addFavHandler(self.id);
                self.showAmenities(self.amenities);
                resolve();
            });
        });
    }

    showStars(stars){
        if (this.stars == 0)
            this.stars = " 0 ⭐ ";
        else {
            this.stars = "";
            for (let i = 0; i < stars; i++){
                this.stars += " ⭐ ";
            }
        }
    }

    showAmenities(amenities){
        for (let a of amenities){
            let div = document.createElement("div");
            let am = document.getElementById("amenities");
            am.appendChild(div);
            div.append(a);

            if(a === "ac"){
                this.addIcon(div, "./assets/icons8-element-luft-24.png");
            }

            if(a === "parking"){
                this.addIcon(div, "./assets/icons8-parking-meter-24.png");
            }

            if(a === "spa"){
                this.addIcon(div, "./assets/icons8-spa-pflege-32.png");
            }

            if(a === "bar"){
                this.addIcon(div, "./assets/icons8-bar-26.png");
            }

            if(a === "gym"){
                this.addIcon(div, "./assets/icons8-hantel-24.png");
            }

            if(a === "restaurant"){
                this.addIcon(div, "./assets/icons8-kellner-24.png");
            }

            if(a === "wifi"){
                this.addIcon(div, "./assets/icons8-wlan-26.png")
            }

            if(a === "pool"){
                this.addIcon(div, "./assets/icons8-schwimmbad-24.png")
            }
        }
    }

    addIcon(div, src){
        let img = document.createElement('img');
        img.src = src;
        img.classList.add('space');
        div.appendChild(img);
    }


    addFavHandler(id){
        let fav_button = document.querySelectorAll(".favourite.hotel[data-id='"+id+"']")[0];

        if(window.Core.model.isFavourite("hotels", id))
            fav_button.classList.add("is_favourite");


        fav_button.addEventListener("click", function (e){
            e.preventDefault();
            console.log(fav_button);
            window.Core.model.toggleFavourite("hotels", id);
            fav_button.classList.toggle("is_favourite");
        })
    }
}