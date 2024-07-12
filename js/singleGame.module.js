import { UIDisplay } from "./UIDisplay.module.js";
export class SingleGameInfo{
    constructor(id){
        document.getElementById('btnClose').addEventListener('click',()=>{
         document.getElementById('single-game').classList.add('d-none');
         document.getElementById('games').classList.remove('d-none');
        });
        this.getSingleGameDetails(id);
    }
    async getSingleGameDetails(id){
        const options = {
            method: "GET",
            headers: {
               "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
               "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
         };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
        const response = await api.json();
        console.log(response);
        new UIDisplay().displaySingleGame(response)

    }
}