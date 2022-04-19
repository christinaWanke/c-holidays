"use strict";

import KWM_App from "./kwm-core.js";

import {view as home} from "../views/view.home.js";
import {view as login} from "../views/view.login.js";
import {view as city} from "../views/view.city.js";
import {view as hotel} from "../views/view.hotel.js";
import {view as favourites} from "../views/view.favourites.js";

let config = {
    appContainer: "kwmJS",
    debugMode: true,
    languages: ["de", "en"],
    webRoot: "http://localhost:8888/c-holidays_wanke/",
    views: [home, login, city, hotel, favourites]
};

new KWM_App(config);