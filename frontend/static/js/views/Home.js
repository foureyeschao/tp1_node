import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Home")
    }

    async getHtml(){
        
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/static/tweet.json')
        const user = data[0]['user'];

        let homeTopbar = `
        <div>
        <h5 class='mt-4'>${user['name']}</h5>
        <span>${user['statuses_count']} Tweets</span>
        </div>
       
        <div class='top-bar'>
           <img src='${user['profile_banner_url']}'  alt='' />
        </div>
        <div><span class='me-3'>${user['friends_count']} Following</span><span>${user['followers_count']} Followers</span></div>
        <img src='https://twitter.com/Canada/status/1581284021220147200/photo/1' alt='' />
        
        `
        let listPosts = "<ul>"
        for(let i in data){
            listPosts +="<li><a href='/post-view/"+data[i]['id_str']+"' data-link>"+data[i]["text"]+"</a></li>"
        }
        listPosts += "</ul>"
        return homeTopbar+`
            <h3>${user['name']}</h3>
        `+listPosts
    }
    }
