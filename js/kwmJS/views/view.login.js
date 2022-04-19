"use strict";

import KWM_View from "./../core/kwm-view.js";

export let view = new KWM_View("/login", async function(){
    await this.rendering();
});

view.rendering = async function() {
    await KWM_View.renderTemplate("login", document.getElementById("kwm-body"));

    let btnLogin = document.getElementById("login-submit");

    btnLogin.addEventListener("click", function (e) {
        e.preventDefault(); //verhindert das default Verhalten des submit buttons
        window.location.hash = window.Core.router.homeRoute.slug;

    })
};