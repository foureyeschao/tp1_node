import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Followers")
    }

    async getHtml(){
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/static/test.json')

        let listPosts = "<ul>"
        for(let i in data['ids']){
            listPosts +="<li><a href=''>"+data['ids'][i]+"</a></li>"
        }
        listPosts += "</ul>"
        return `
            <h1>Followers Id List</h1>
        `+listPosts
    }
    }
