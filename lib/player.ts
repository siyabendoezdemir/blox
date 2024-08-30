import { getPopulation } from "./territory";
import { Player } from "./utils";

let player: Player = {
  home: "Brislach",
  territory: ["Zwingen", "Dittingen"],
  wealth: 25000000000,
};

let populations: { [key: string]: number } = {};

export function getPlayer(): Player {
  return player;
}

export function setPlayer(player: Player) {
  player = player;
}

export function addTerritory(newTerritory: string) {
  if (!player.territory.includes(newTerritory)) {
    player = {
      ...player,
      territory: [...player.territory, newTerritory],
    };
  }

  console.log({
    newTerritory,
    territory: player.territory,
  });
}

export async function getPlayerFlag() {
  const home = player.home;

  const searchUrl = "https://commons.wikimedia.org/w/api.php";
  const searchParams = new URLSearchParams({
    action: "query",
    format: "json",
    list: "search",
    srsearch: `Flag of ${home}`,
    srnamespace: "6", // Convert the number to a string
    origin: "*", // Needed for CORS
  });

  try {
    const searchResponse = await fetch(`${searchUrl}?${searchParams}`);
    const searchData = await searchResponse.json();

    if (searchData.query.search.length > 0) {
      const fileTitle = searchData.query.search[0].title;

      const imageInfoParams = new URLSearchParams({
        action: "query",
        format: "json",
        titles: fileTitle,
        prop: "imageinfo",
        iiprop: "url",
        origin: "*", // Needed for CORS
      });

      const imageInfoResponse = await fetch(`${searchUrl}?${imageInfoParams}`);
      const imageInfoData = await imageInfoResponse.json();
      const pages = imageInfoData.query.pages;
      const imageUrl = pages[Object.keys(pages)[0]].imageinfo[0].url;

      return imageUrl;
    } else {
      console.log(`Flag for ${home} not found.`);
    }
  } catch (error) {
    console.error("Error fetching flag:", error);
  }
}

export function deductPlayerMoney(amount: number){
    player.wealth -= amount;
}

async function fetchAndStorePopulations() {
  const areas = [player.home, ...player.territory];
  for (const area of areas) {
    populations[area] = await getPopulation(area);
  }
}

export function getTotalPopulation(): number {
  fetchAndStorePopulations();
  let totalPopulation = populations[player.home] || 0;

  for (const territory of player.territory) {
    totalPopulation += populations[territory] || 0;
  }

  console.log(totalPopulation);

  return totalPopulation;
}