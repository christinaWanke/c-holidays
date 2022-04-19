"use strict";

export default class KWM_Router {
    constructor(views) {
        if (window.Core.system.debugMode){
            console.log(views);
        }
        this.routes = views;
        this.homeRoute = views[0];
        this.logoutRoute = views[1];
        this.init();
    }

    init(){
        window.removeEventListener('hashchange', this.changeView);
        window.addEventListener('hashchange', this.changeView.bind(this));
        this.changeView();
    }

    changeView(){
        if (window.location.hash.length >= 2){
            for (const view of this.routes){
                if(view.isActive()){
                    view.init();
                    return;
                }
            }
            if (window.Core.system.debugMode){
                console.warn("Did not find " +window.location.hash);
            }
            window.location.hash = this.homeRoute.slug;

        }else {
            window.location.hash = this.homeRoute.slug;
        }
    }
}