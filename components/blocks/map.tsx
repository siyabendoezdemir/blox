"use client";
import { MapContainer, TileLayer, Rectangle, useMap } from "react-leaflet";
import { LatLngBounds, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Ortschaften } from "../elements/ortschaften";
import { BadgeOverlay } from "../elements/wealth-badge";
import { MapData } from "@/lib/utils";

// Coordinates for Basel-Stadt and Basel-Land (approximate bounding box)
const cityBounds: [LatLngTuple, LatLngTuple] = [
    [47.4415, 7.7195], // Bottom-left coordinate
    [47.6018, 8.0205]  // Top-right coordinate
];

export function CityMap() {
    return (
        <MapContainer bounds={cityBounds} style={{ height: "100%", width: "100%", zIndex: 0 }} zoom={12} center={[47.5215, 7.8700]}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                noWrap
            />
            <Ortschaften />
        </MapContainer>
    );
}
