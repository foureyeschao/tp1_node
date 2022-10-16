import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Post view")
    }

    async getHtml(){
  
        const nu = Number(this.params.id)

        async function getData(url) {
            const response = await fetch(url);  
            return response.json();
          }

          const data = await getData('/static/tweet.json');
   
          const article = data.find(item => item.id === nu);
          const articleProps = `
             <div>
             <svg class="bi pe-none me-2" width="15" height="15"><use xlink:href="#heart"/></svg>
             <span class="me-2">${article.favorite_count}</span>
             <svg class="bi pe-none me-2" width="15" height="15"><use xlink:href="#retweet"/></svg>
             <span class="me-2">${article.retweet_count}</span>
             <svg class="bi pe-none me-2" width="15" height="15"><use xlink:href="#calendar3"/></svg>
             <span>${article.created_at
             }</span>
             </div>
          
          `
          console.log(article);

        return `
        <h1 class='mt-2'>Posts Details</h1>
        <h3 class='mt-5'>`+article.text+`</h3>
       `+articleProps;
        
    }
}