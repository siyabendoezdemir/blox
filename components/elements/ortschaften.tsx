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
        const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?where=name%3D%22${name}%22&limit=1&refine=country%3A%22Switzerland%22`);
        const data = await response.json();
        const population = data.results?.[0]?.population;
        return population ? population : 0; // Return 0 if population is unknown
    }

    function getColor(population: number): string {
        if (population <= 1000) return 'grey';
        if (population <= 5000) return 'yellow';
        if (population <= 10000) return 'orange';
        return 'red';
    }

    const onEachFeature = (feature: GeoJsonFeature, layer: any) => {
        const name = feature.properties?.name || "Unknown";

        getPopulation(name).then(population => {
            layer.setStyle({ color: getColor(population), fillOpacity: 0.4, weight: 2 });
            layer.bindPopup(`
                <strong>${name}</strong><br>
                Population: ${population}<br>
                Base Value (per person): CHF ${baseValue.toLocaleString()}<br>
                Approximate Income: CHF ${calculateIncome(population).toLocaleString()}
            `);
        }).catch(error => {
            console.error(`Failed to fetch population for ${name}:`, error);
            layer.setStyle({ color: 'grey', fillOpacity: 0.4, weight: 2 });
            layer.bindPopup(`
                <strong>${name}</strong><br>
                Population: Unknown<br>
                Base Value (per person): CHF ${baseValue.toLocaleString()}<br>
                Approximate Income: Unknown
            `);
        });
    };

    return geoJsonData ? (
        <GeoJSON data={geoJsonData} style={{ color: "grey", fillOpacity: 0.4, weight: 2 }} onEachFeature={onEachFeature} />
    ) : null;
}
