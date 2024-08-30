"use client"
import { Button } from "@/components/ui/button"
import { Users, Swords, Landmark } from "lucide-react"
import { CityMap } from './map'
import { Notifications } from '../elements/notifications'
import { PlayerStats } from '../elements/player-stats'
import { TopBar } from '../elements/topBar'

export function Layout() {
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            {/* Top Bar */}

            <TopBar />

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <div className="hidden lg:block w-64 bg-gray-800">
                    <PlayerStats />
                </div>

                {/* Main Map Area */}
                <div className="flex-1 relative">
                    <CityMap />
                    {/* Map Overlay UI Elements */}
                    <div className="absolute bottom-4 right-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <Button variant="default" size="sm" className="w-full sm:w-auto">
                            <Users className="mr-2 h-4 w-4" />
                            Factions
                        </Button>
                        <Button variant="default" size="sm" className="w-full sm:w-auto">
                            <Swords className="mr-2 h-4 w-4" />
                            Military
                        </Button>
                        <Button variant="default" size="sm" className="w-full sm:w-auto">
                            <Landmark className="mr-2 h-4 w-4" />
                            Diplomacy
                        </Button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <Notifications />
            </div>
        </div>
    )
}