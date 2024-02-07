function settingHtmlForMainCard(data){
    const mainCard = document.getElementById("main-card")   

    for(let i=0; i<4 ; i++){      
 
        const urlA = document.createElement("a");
        urlA.className = "linkUrl";
        urlA.href = data[i].url;
        urlA.target="_blank";
        mainCard.appendChild(urlA);
        
        let newCard= document.createElement("div");
        if(i==0 || i==3){
            newCard.className=`card${i+1} card-large main-cards-style`;
        }
        else{
            newCard.className=`card${i+1} card-small main-cards-style`;
        }
        const headingDiv = document.createElement("div")
        headingDiv.className = "heading-div";
        let heading = document.createElement("h3");
        let content = data[i].titles;
        let textNode = document.createTextNode(content)
        
        heading.appendChild(textNode);
        headingDiv.appendChild(heading);
        newCard.appendChild(headingDiv);
        urlA.appendChild(newCard);

        const image = new Image();
        image.src = data[i].imgUrl;
        image.alt = "not working";
        image.onload = () => {
            newCard.style.backgroundImage = `url("${image.src}")`
        }      
    }
}
const getNewsForMainCard = () => {
    const mainCard = document.getElementById("main-card")               
    
    let loadingDiv = document.createElement("div")
    loadingDiv.id = "Loading";
    let loading = document.createElement("h1");       
    let textNodeLoading = document.createTextNode("Loading...");
    loading.appendChild(textNodeLoading);
    loadingDiv.appendChild(loading);
    mainCard.appendChild(loadingDiv);

    let query = window.location.pathname;
    console.log(query);

    if(query=="/"){
        query = "/news";
    }

    fetch(`/news${query}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(data => {
        return data.json();
    })
    .then(data => {
        mainCard.innerHTML = "";
        console.log(data);

        settingHtmlForMainCard(data);
        getNewsForCards("GET","no",query);
    })
    .catch(err => {
        console.log(err)
    })
}
function getNewsForCards(method,search,query){  
    const input = input1.value;
    
    console.log("query=",query);
    fetch(`/news${query}`,{
        method: method,
        body: method === "POST" ? JSON.stringify({ input }) : undefined, 
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(data => {
        return data.json();
    })
    .then(data=>{
        if(search == "yes" || search == "y"){
            resultDiv.innerHTML="";
            let headingDiv = document.createElement("div")
            headingDiv.id = "resultHeading";
            let heading = document.createElement("h1");       
            let textNode = document.createTextNode("Search Results")
            heading.appendChild(textNode);
            headingDiv.appendChild(heading);
            resultDiv.appendChild(headingDiv);
        }
        else{
            data = data.slice(4);
        }

        createCards(data);
    })
    .catch(err => {
        console.log(err)
    })
}
function createCards(data){
    data.forEach(data => {
        const urlA = document.createElement("a");
        urlA.className = "linkUrl";
        urlA.href = data.url;
        urlA.target="_blank";
        resultDiv.appendChild(urlA);

        let newCard = document.createElement("div");
        newCard.className = "newCard";
        
        let headingDiv = document.createElement("div")
        headingDiv.className = "heading-div";
        let heading = document.createElement("h3");
        let content = data.titles;
        let textNode = document.createTextNode(content)
        
        heading.appendChild(textNode);
        headingDiv.appendChild(heading);
        newCard.appendChild(headingDiv);
        urlA.appendChild(newCard)
        
        const image = new Image();
        image.src = data.imgUrl;
        image.alt = "not working";
        image.onload = () => {
            newCard.style.backgroundImage = `url("${image.src}")`
        };
        
    });
}
function settingHtmlForSearch(){
    const resultDiv= document.getElementById("resultDiv");
    resultDiv.innerHTML="";

    const mainCard = document.getElementById("main-card");
    mainCard.innerHTML="";

    let loadingDiv = document.createElement("div")
    loadingDiv.id = "Loading";
    let loading = document.createElement("h1");       
    let textNodeLoading = document.createTextNode("Loading...");
    loading.appendChild(textNodeLoading);
    loadingDiv.appendChild(loading);
    resultDiv.appendChild(loadingDiv);
}
const getNewsForSearch = ()=>{
    settingHtmlForSearch();
    let query = "/" + input1.value;
    getNewsForCards("POST","yes",query);
}

window.addEventListener("load",getNewsForMainCard);

const button1 = document.getElementById("button1");
const input1 = document.getElementById("input1");
input1.addEventListener("keypress",(event)=>{
    console.log(event);
    if(event.key=="Enter"){
        getNewsForSearch();
    }
})
button1.addEventListener("click", getNewsForSearch);
