"use strict";


import KWM_Router from "./kwm-router.js";
import KWM_Translator from "./kwm-translator.js";
import KWM_Utils from "./kwm-utils.js";
import KWM_View from "./kwm-view.js";
import KWM_Model from "./kwm-model.js";


export default class KWM_App {
    constructor(config) {
        window.Core = this; //Attach Core to window Object
        this.system = {
            appContainer: config.appContainer,
            webRoot: config.webRoot,
            debugMode: config.debugMode
        }
        this.utils = new KWM_Utils();
        this.translator = new KWM_Translator(config.languages);
        this.model = new KWM_Model();
        this.router = new KWM_Router(config.views);

        this.initHeaderAndFooter();

    }

    t(key){
        return this.translator.t(key);
    }

    async initHeaderAndFooter(){
        await KWM_View.renderTemplate("header", document.getElementById("kwm-header"));
        await KWM_View.renderTemplate("footer", document.getElementById("kwm-footer"));
        this.initLanguageMenu();
    }

    initLanguageMenu(){
        let self = this;
        let listElements = document.querySelectorAll("#languages li");
        for(let i = 0; i < listElements.length; i++){
            listElements[i].addEventListener("click", function (){
                self.translator.currentLanguage = this.dataset.language;
                /*console.log(this.dataset.language);*/
                self.utils.setCookie("language", this.dataset.language, 360);
                self.initHeaderAndFooter();
                window.dispatchEvent(new HashChangeEvent("hashchange"));
            })
        }
    }
}

