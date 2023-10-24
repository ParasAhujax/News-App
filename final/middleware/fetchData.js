require("dotenv").config();

const fetchData = (input,req,res,next) => {
    const API_KEY=`${process.env.API_KEY}`;
    const fetchUrl = `https://newsapi.org/v2/everything?` + 
                `q="${input} "&` + 
                `apiKey=${API_KEY}`;

    return fetch(fetchUrl)
    .then(data => data.json())
    .then(data => {
        const article = data.articles;
        const titlesAndUrl = article.map(article => {
            return {
                "titles": article.title,
                "imgUrl": article.urlToImage,
                "url":article.url
            }
        });
        return titlesAndUrl;
    })
    next();
}
module.exports = fetchData;