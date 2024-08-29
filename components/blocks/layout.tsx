"use client"
import { Children, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Swords, Landmark, Crown, Coins, Globe, Clock, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CityMap } from './map'

export function Layout() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

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
                            <LeftSidebar />
                        </SheetContent>
                    </Sheet>
                    <Crown className="h-6 w-6 text-yellow-400" />
                    <span className="font-bold">World Domination</span>
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
                    <LeftSidebar />
                </div>

                {/* Main Map Area */}
                <div className="flex-1 relative">
                    <CityMap />
                    {/* Map Overlay UI Elements */}
                    <div className="absolute bottom-4 right-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                            <Users className="mr-2 h-4 w-4" />
                            Factions
                        </Button>
                        <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                            <Swords className="mr-2 h-4 w-4" />
                            Military
                        </Button>
                        <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                            <Landmark className="mr-2 h-4 w-4" />
                            Diplomacy
                        </Button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="hidden md:block w-64 bg-gray-800 p-4 overflow-auto">
                    <h2 className="text-xl font-bold mb-4">Notifications</h2>
                    <ScrollArea className="h-full">
                        <ul className="space-y-2">
                            {[
                                "New technology available: Advanced Weaponry",
                                "Diplomatic offer from Eastern Alliance",
                                "Unrest in North Africa region",
                                "Resource shortage in Middle East",
                                "Enemy troops spotted near Western Europe"
                            ].map((notification, index) => (
                                <li key={index} className="p-2 bg-gray-700 rounded text-sm">
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

function LeftSidebar() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <div className="h-full p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Player Stats</h2>
            <div className="space-y-4 flex-grow">
                <div>
                    <div className="flex justify-between mb-1">
                        <span>Military Power</span>
                        <span>75/100</span>
                    </div>
                    <Progress value={75} className="h-2" />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span>Industry</span>
                        <span>60/100</span>
                    </div>
                    <Progress value={60} className="h-2" />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span>Technology</span>
                        <span>82/100</span>
                    </div>
                    <Progress value={82} className="h-2" />
                </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full h-20 p-0 overflow-hidden mt-auto" variant="ghost">
                        <img
                            src="/placeholder.svg?height=80&width=224"
                            alt="Nation Flag"
                            className="w-full h-full object-cover"
                        />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Nation Overview</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="regions" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="regions">Controlled Regions</TabsTrigger>
                            <TabsTrigger value="wars">Current Wars</TabsTrigger>
                        </TabsList>
                        <TabsContent value="regions">
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                <ul className="space-y-2">
                                    {["Western Europe", "North Africa", "Middle East", "South Asia", "Southeast Asia"].map((region) => (
                                        <li key={region} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                            <span className="flex items-center">
                                                <MapPin className="mr-2 h-4 w-4 text-red-400" />
                                                {region}
                                            </span>
                                            <span className="text-sm text-gray-400">+500/day</span>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="wars">
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                <ul className="space-y-2">
                                    {["Eastern Front War", "Pacific Theater Conflict", "African Campaign"].map((war) => (
                                        <li key={war} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                            <span className="flex items-center">
                                                <Swords className="mr-2 h-4 w-4 text-red-400" />
                                                {war}
                                            </span>
                                            <span className="text-sm text-gray-400">Ongoing</span>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    )
}