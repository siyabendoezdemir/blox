"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Users, Swords, Landmark, Crown, Coins, Globe, Clock, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CityMap } from './map'
import { Notifications } from '../elements/notifications'
import { PlayerStats } from '../elements/player-stats'
import { Player } from '@/lib/utils'
import { getPlayer } from '@/lib/player'

export function Layout() {
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            {/* Top Bar */}
            <div className="bg-gray-800 p-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <PlayerStats />
                        </SheetContent>
                    </Sheet>
                    <Crown className="h-6 w-6 text-yellow-400" />
                    <span className="font-bold">Blox</span>
                </div>
                <div className="flex items-center space-x-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <Coins className="h-5 w-5 text-yellow-400 mr-1" />
                                    <span className="hidden sm:inline">5,000</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Gold</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <Globe className="h-5 w-5 text-blue-400 mr-1" />
                                    <span className="hidden sm:inline">25%</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>World Control</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 text-green-400 mr-1" />
                                    <span className="hidden sm:inline">1936.04</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Current Date</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

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