import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Posts")
    }

    async getHtml(){

        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/static/tweet.json')

        let listPosts = "<ul>"
        for(let i in data){
            listPosts +="<li><a href='/post-view/"+data[i]['id_str']+"' data-link>"+data[i]["text"]+"</a></li>"
        }
        listPosts += "</ul>"
        return `
            <h1>Posts</h1>
        `+listPosts
    }
}