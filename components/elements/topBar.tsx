import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Crown, Coins, Clock, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PlayerStats } from '../elements/player-stats';
import { getPlayer } from "@/lib/player";

export function TopBar() {
    const { wealth } = getPlayer();

    // Format wealth
    const formattedWealth = new Intl.NumberFormat('de-CH', {
        style: 'currency',
        currency: 'CHF',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(wealth);

    // State to hold formatted date and time
    const [formattedDateTime, setFormattedDateTime] = useState<string>('');

    // Function to format the current date and time
    const formatDateTime = () => {
        const now = new Date();

        const dateFormatter = new Intl.DateTimeFormat('de-CH', {
            day: '2-digit',
            month: 'short', // Short month name (e.g., Aug)
            year: 'numeric'
        });

        const timeFormatter = new Intl.DateTimeFormat('de-CH', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const datePart = dateFormatter.format(now);
        const timePart = timeFormatter.format(now);

        return `${datePart} - ${timePart}`;
    };

    // Update date and time every minute
    useEffect(() => {
        // Initial format
        setFormattedDateTime(formatDateTime());

        // Set up interval to update every minute
        const intervalId = setInterval(() => {
            setFormattedDateTime(formatDateTime());
        }, 60000); // 60000 ms = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
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
                                <span className="hidden sm:inline">{formattedWealth}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Francs</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-green-400 mr-1" />
                                <span className="hidden sm:inline">{formattedDateTime}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Current Date and Time</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
