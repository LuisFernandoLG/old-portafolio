export default class YoutubeAPI{
    constructor(){
        this.key = "AIzaSyBDKRw3h9yaqqE0c3CjqLkundA708bcNOw";
        this.searchValue = null;
        this.data = null;

    }


    async search(searchValue){
        this.searchValue = searchValue;

        const data = await fetch(this.getEndpoint())
        .then( r => r.json() )
            .catch( r => console.log("ERROR") );

        return data.items;
    }

    getEndpoint(){
        const search = encodeURI(this.searchValue);
        return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search}&key=${this.key}`;
    }
     

}
