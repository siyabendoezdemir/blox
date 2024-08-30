import { addTerritory, getPlayer, setPlayer } from "@/lib/player";
import { MapData } from "@/lib/utils";
import { Feature, FeatureCollection, Polygon } from "geojson";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

// Define a type for your GeoJSON data
interface GeoJsonFeature extends Feature<Polygon> {
    properties: {
        name?: string;
        postal_code?: string;
        admin_level?: string;
        area: number;
    };
}

export function Ortschaften() {
    const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(null);
    const [baseValue, setBaseValue] = useState<number>(17329);
    const [player, setPlayerState] = useState(() => getPlayer()); // Manage player state

    const { home, territory } = player;

    useEffect(() => {
        const fetchGeoJson = async () => {
            const response = await fetch('/geojson/basel-ortschaften.json');
            const data: FeatureCollection = await response.json();
            setGeoJsonData(data);
        };

        fetchGeoJson();
    }, []);

    function calculateIncome(population: number) {
        // Income = Base Value per Person (taxes) * Population
        return baseValue * population;
    }

    async function getPopulation(name: string) {
        try {
            const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?where=name%3D%22${name}%22&limit=1&refine=country%3A%22Switzerland%22`);
            const data = await response.json();
            return data.results?.[0]?.population || 0; // Return 0 if population is unknown
        } catch (error) {
            console.error(`Failed to fetch population for ${name}:`, error);
            return 0; // Return 0 on error
        }
    }

    function getColor(population: number): string {
        if (population <= 1000) return 'grey';
        if (population <= 5000) return 'yellow';
        if (population <= 10000) return 'orange';
        return 'red';
    }

    const onEachFeature = async (feature: GeoJsonFeature, layer: any) => {
        const name = feature.properties?.name || "Unknown";
        const population = await getPopulation(name);

        const color = name === home || territory.includes(name) ? "blue" : getColor(population);

        layer.setStyle({ color, fillOpacity: 0.4, weight: 2 });

        layer.bindPopup(`
            <strong>${name}</strong><br>
            Population: ${population}<br>
            Base Value (per person): CHF ${baseValue.toLocaleString()}<br>
            Approximate Income: CHF ${calculateIncome(population).toLocaleString()}<br>
            <button onclick="claim('${name}')">Claim</button>
        `);
    };

    // Define the claim function globally to be accessible from popup
    (window as any).claim = (name: string) => {
        addTerritory(name); // Use addTerritory to add the new territory
        setPlayerState(prevPlayer => {
            const updatedPlayer = { ...prevPlayer, territory: [...prevPlayer.territory, name] };
            setPlayer(updatedPlayer); // Update the global player state
            return updatedPlayer;
        });
    };

    return geoJsonData ? (
        <GeoJSON key={JSON.stringify(player.territory)} data={geoJsonData} style={{ color: "grey", fillOpacity: 0.4, weight: 2 }} onEachFeature={onEachFeature} />
    ) : null;
}
