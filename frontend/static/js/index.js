import Home from "./views/Home.js"
import Followers from "./views/Followers.js"
import Posts from "./views/Posts.js"

import PostView from "./views/PostView.js"


const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

      return Object.fromEntries(keys.map((key, i) => {
          return [key, values[i]];
      }));
  }; 

// 1 router
const router = async () => {


    const routes = [
        { path: "/", view: Home },
        { path: "/posts", view: Posts },
        { path: "/followers", view: Followers},
        { path: "/post-view/:id", view: PostView},
    ]

    // 2 match function
    const potentialMatches = routes.map(route => {
        return{
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

   
    
    if(!match) {
        match = {
            route: routes[0],
            //9.3
            result: [location.pathname]
        }
    }

    //10.2
    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
}

//4
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

//6
window.addEventListener("popstate", router);

//5
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    router();
});

