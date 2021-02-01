/**
 * 
 * CONECTAR CON LA APU DE youtube
 * 
 */

import YoutubeAPI from "../YouteAPI/youtubeAPI.js";



const videosContainer = document.querySelector(".videos");
const searchInput = document.querySelector(".nav__search");

const getInformation = async(value)=>{
    videosContainer.innerHTML = "";
    let api = new YoutubeAPI();
    const items = await api.search(value);
    
    for(let i = 0; i < items.length; i++){

        let fragment = document.createDocumentFragment();
        let videoContainer = document.createElement("DIV");
        let img = document.createElement("IMG");
        let tittle = document.createElement("H2");
        let description = document.createElement("P");

        videoContainer.classList.add("video");
        img.classList.add("video__img");
        tittle.classList.add("video__tittle");
        description.classList.add("video__date");

        img.src = items[i].snippet.thumbnails.default.url;
        tittle.textContent =  (items[i].snippet.title.length > 40) ? items[i].snippet.title.substring(0, 40) + "..." : items[i].snippet.title;
        description.textContent = (items[i].snippet.publishTime).substring(0, 10);

        videoContainer.append(img);
        videoContainer.append(tittle);
        videoContainer.append(description);
        
        fragment.append(videoContainer);
        videosContainer.append(fragment);

    }
}


searchInput.addEventListener("keydown", function(e){
    if (e.key === "Enter" && this.value !== "" ){
        getInformation(this.value)
    }

})


class Video{
    constructor(title, date, image){
        this.title = title;
        this.date = date;
        this.img = image;
    }

    get getVideo(){
        
    }
}


