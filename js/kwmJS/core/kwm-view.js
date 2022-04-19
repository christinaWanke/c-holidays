"use strict";

export default class KWM_View {
    constructor(slug, init) {
        this.slug = slug;
        this.init = init; //is called when the view is loaded
    }

    isActive(){
        if (!window.Core.utils.isEmpty(KWM_View.getGetParameters())){
            let index = window.location.hash.substr(1).indexOf("?");
            return (window.location.hash.substr(1, index).replace("#", "") === this.slug);
        }else
            return (window.location.hash.substr(1).replace('#', '') === this.slug);
    }

    static renderTemplate(templateName, container, content={}){
        return new Promise((resolve, reject) => {
            fetch(window.Core.system.webRoot+"/js/kwmJS/templates/"+templateName+".tpl")
                .then(response=>response.text())
                .then(tpl=>{ //tpl is content of .tpl file.
                    if(window.Core.system.debugMode)
                        console.log(tpl);
                    let markup = tpl,
                        open = /<%>/gi,
                        variables = /<&>/gi,
                        result,
                        indices_open = [],
                        indices_close = [],
                        variables_open = [],
                        variables_close = [],
                        even = true;


                    while(result = variables.exec(tpl)){
                        even ? variables_open.push(result.index) : variables_close.push(result.index);
                        even = !even;
                    }

                    for(let i = 0; i < variables_open.length; i++){
                        let value = content[tpl.substring(variables_open[i]+3, variables_close[i])];
                        markup = markup.replace(tpl.substring(variables_open[i], variables_close[i]+3), value)
                    }

                    even = true;
                    while (result = open.exec(tpl)){
                        even ? indices_open.push(result.index) : indices_close.push(result.index);
                        even = !even;
                    }

                    for(let i = 0; i < indices_close.length; i++){
                        let word = window.Core.t(tpl.substring(indices_open[i]+3, indices_close[i]));
                        markup = markup.replace(tpl.substring(indices_open[i], indices_close[i]+3), word);
                    }
                    container.innerHTML = markup;
                    resolve();
                })
        })
    }

    static getGetParameters(){
        let index = window.location.hash.substr(1).indexOf("?");
        if(index != -1){
            let parameters = window.location.hash.substr(index+2);
            let result = parameters.split("&").reduce(function(result, item){
                let parts = item.split("=");
                result[parts[0]] = parts[1];
                return result;
            }, {});
            return result;
        } else
            return {};
    }
}