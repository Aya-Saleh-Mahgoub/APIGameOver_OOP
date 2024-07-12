import { SingleGameInfo } from "./singleGame.module.js";
import { UIDisplay } from "./UIDisplay.module.js";
export class HomeGames{
   constructor(){
      document.querySelectorAll('.nav-link').forEach(link =>{
         console.log(link);
         link.addEventListener('click', ()=>{
         document.querySelector('.nav-link.active').classList.remove('active');
         link.classList.add('active');
         const gameCategory = link.getAttribute('data-category'); // also can get category by --> link.dataset.category ===
         this.getGames(gameCategory);
         console.log(gameCategory);
         
         });
      });

      this.loadSpinner = document.querySelector(".loading");
      this.singleGame= document.getElementById("single-game");
      this.games = document.getElementById("games");
      this.display = new UIDisplay();//instance of UIDisplay (all games)
      
      this.getGames('mmorpg');   
}


async getGames(cat){
   this.loadSpinner.classList.remove("d-none");
   const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
         "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   };
   const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, options  );
   const response = await api.json();
   this.loadSpinner.classList.add("d-none");
   console.log(response);
   this.display.displayGames(response);
   //add event click after content loaded 
   //to open card that display single game section 
   document.querySelectorAll("#gameCard").forEach(card =>{
      card.addEventListener('click', ()=>{
         console.log('card clicked');
         this.singleGame.classList.remove('d-none');
         this.games.classList.add('d-none');
         new SingleGameInfo(card.getAttribute('data-id'));//create instance to display single game card
                              
      })
   })
}
}