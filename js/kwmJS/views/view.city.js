"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/city", async function(){
    if (window.Core.utils.isEmpty(KWM_View.getGetParameters().id))
        window.location.hash = "/";
    else {
        this.city = await window.Core.model.getCity(KWM_View.getGetParameters().id);
        if (this.city == false){
            window.location.hash = "/";
        }
        else {
            await this.rendering();
            console.log("rendering is done.");
        }
    }
})

view.rendering = async function(){
    await this.city.renderSingleMarkup(document.getElementById("kwm-body"));
}