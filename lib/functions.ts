export async function getAreaFlag(area: string) {
  const searchUrl = "https://commons.wikimedia.org/w/api.php";
  const searchParams = new URLSearchParams({
    action: "query",
    format: "json",
    list: "search",
    srsearch: `Flag of ${area}`,
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
      console.log(`Flag for ${area} not found.`);
    }
  } catch (error) {
    console.error("Error fetching flag:", error);
  }
}
