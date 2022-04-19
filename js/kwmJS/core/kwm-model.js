"use strict";

import City from "../../classes/class.city.js";
import Hotel from "../../classes/class.hotel.js";

const api_root = "https://api.neuwersch.kwmhgb.at/wp-json/wp/v2/";
const filter = "?per_page=100";

/********************************************************************************************
 * Es wird der Local Storage verwendet, damit die Informationen gespeichert werden und beim
 * nächsten Aufruf der Seite wieder zu sehen sind. Das braucht man zum Beispiel für das
 * Favorisieren der Städte und Hotels. Wenn man Sachen in der Session Storage speichert wird
 * das bei jedem Aufruf neu geladen. Das heißt, dass zum Beispiel die Favoriten, die zuvor
 * gespeichert wurden beim nächsten Aufruf der Seite nicht mehr zu sehen/abrufbar sind.
 * Deswegen müssen diese Informationen im Local Storage gespeichert werden.
 *
 * Author: Christina Wanke
 * Date: 15.5.2021
 *******************************************************************************************/

export default class KWM_Model{
    constructor() {
        if (window.localStorage.getItem("favourite_cities") == null)
            window.localStorage.setItem("favourite_cities", "[]")

        if (window.localStorage.getItem("favourite_hotels") == null)
            window.localStorage.setItem("favourite_hotels", "[]")
    }

    async getCities(){
        return new Promise(resolve => {
            fetch(api_root+"cities"+filter).then(response=>response.json())
                .then(data=>{
                    let cities = [];
                    for(let city of data)
                        cities.push(new City(city.id, city.acf));
                    resolve(cities);
                });
        });
    }

    async getCity(id){
        return new Promise(resolve => {
            fetch(api_root+"cities/"+id).then(response => response.json())
                .then(city => {
                    resolve(new City(city.id, city.acf));
                });
        });
    }

    async getHotels(){
        return new Promise(resolve => {
            fetch(api_root+"hotels"+filter).then(response=>response.json())
                .then(data=>{
                    let hotels = [];
                    for(let hotel of data)
                        hotels.push(new Hotel(hotel.id, hotel.acf));
                    resolve(hotels);
                });
        });
    }

    async getHotelsOfCity(cityID){
        return new Promise(resolve => {
            fetch(api_root+"hotels"+filter).then(response=>response.json())
                .then(data=>{
                    let hotelsOfCity = [];
                    for(let hotel of data) {
                        if (hotel.acf.city == cityID)
                            hotelsOfCity.push(new Hotel(hotel.id, hotel.acf));
                    }
                    resolve(hotelsOfCity);
                });
        });
    }

    async getHotel(id){
        return new Promise(resolve => {
            fetch(api_root+"hotels/"+id).then(response => response.json())
                .then(hotel => {
                    resolve(new Hotel(hotel.id, hotel.acf));
                });
        });
    }


    isFavourite(type, id){
        let favourites = JSON.parse(window.localStorage.getItem("favourite_"+type));
        return (favourites.includes(id));
    }

    toggleFavourite(type, id){
        let favourites = JSON.parse(window.localStorage.getItem("favourite_"+type));
        let index = favourites.indexOf(id);
        if (index == -1){
            favourites.push(id);
        } else {
            favourites.splice(index,1);
        }
        window.localStorage.setItem("favourite_"+type, JSON.stringify(favourites));
    }

    async getFavouriteCities(){
        let cities = await this.getCities();
        let favourite_cities = [];
        return new Promise(resolve =>  {
            for (let city of cities){
                if (window.Core.model.isFavourite("cities", city.id))
                    favourite_cities.push(city);
            }
            resolve(favourite_cities);
        })
    }

    async getFavouriteHotels(){
        let hotels = await this.getHotels();
        let favourite_hotels = [];
        return new Promise(resolve => {
            for (let hotel of hotels){
                if (window.Core.model.isFavourite("hotels", hotel.id))
                    favourite_hotels.push(hotel);
            }
            resolve(favourite_hotels);
        })
    }
}