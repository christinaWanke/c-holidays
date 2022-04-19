"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/hotel", async function(){
    if (window.Core.utils.isEmpty(KWM_View.getGetParameters().id))
        window.location.hash = "/";
    else {
        this.hotel = await window.Core.model.getHotel(KWM_View.getGetParameters().id);
        if (this.hotel == false){
            window.location.hash = "/";
        }
        else {
            await this.rendering();
            console.log("rendering is done.");
        }
    }
})

view.rendering = async function(){
    await this.hotel.renderSingleMarkup(document.getElementById("kwm-body"));
}