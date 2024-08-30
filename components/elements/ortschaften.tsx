import { addTerritory, getPlayer, setPlayer } from "@/lib/player";
import { MapData } from "@/lib/utils";
import { Feature, FeatureCollection, Polygon } from "geojson";
import { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import { GeoJSON } from "react-leaflet";
import { AreaPopup } from "./areaPopup";
import area from '@turf/area';
import { getPopulation } from "@/lib/territory";

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

    function getColor(population: number): string {
        if (population <= 1000) return '#D3D3D3	';
        if (population <= 5000) return '#A9A9A9	';
        if (population <= 10000) return '#808080	';
        return '#71797E';
    }

    const onEachFeature = async (feature: GeoJsonFeature, layer: any) => {
        const name = feature.properties?.name || "Unknown";
        const population = await getPopulation(name);

        const areaSize = area(feature);

        const color = name === home || territory.includes(name) ? "blue" : getColor(population);

        layer.setStyle({ color, fillOpacity: 0.4, weight: 2 });

        const popupContainer = document.createElement('div');
        const root = createRoot(popupContainer);

        // Render the React component into the container div
        root.render(
            <AreaPopup
                name={name}
                population={population}
                area={areaSize}
                baseValue={baseValue}
                calculateIncome={calculateIncome}
                onClaim={claim}
            />
        );

        layer.bindPopup(popupContainer);
    };

    // Define the claim function globally to be accessible from popup
    async function claim(name: string) {
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
