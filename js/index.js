import { Games } from "./games.js";
const baseUrl = "https://free-to-play-games-database.p.rapidapi.com/api/";

const games = new Games(baseUrl);

//apply preloading to any await function
function preloading(callFunction) {
  $(".preloader").fadeIn(0);
  callFunction();
  $(".preloader").fadeOut(500);
}

//load th page
$(document).ready(async function () {
  preloading(async function () {
    try {
      const data = await games.getByCategory("mmorpg");
      $(".games").html(games.constructCards(data));
    } catch (error) {
      console.error("Error initializing games:", error);
    }
  });
});

//onclick on list
$(".navbar-nav li").on("click", async function () {
  preloading(async () => {
    $(".navbar-nav li a").removeClass("active");
    $(this).children().addClass("active");
    try {
      const data = await games.getByCategory(
        $(this).children().attr("category")
      );
      $(".games").html(games.constructCards(data));
    } catch (error) {
      console.error("Error initializing games:", error);
    }
  });
});

//card details
window.clickable = function (id) {
  preloading(async () => {
    const data = await games.getGameInfo(Number(id));
    games.constructDetails(data);
  });
};
