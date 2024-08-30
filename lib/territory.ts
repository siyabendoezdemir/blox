export async function getPopulation(name: string) {
    try {
        const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?where=name%3D%22${name}%22&limit=1&refine=country%3A%22Switzerland%22`);
        const data = await response.json();
        return data.results?.[0]?.population || 1000; // Return 0 if population is unknown
    } catch (error) {
        console.error(`Failed to fetch population for ${name}:`, error);
        return 1000; // Return 0 on error
    }
}