import { useEffect, useState } from "react"
import { Progress } from "../ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ScrollArea } from "../ui/scroll-area"
import { MapPin, Swords } from "lucide-react"
import { getPlayer, getPlayerFlag } from "@/lib/player"
import Image from "next/image"

export function PlayerStats() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [flag, setFlag] = useState("");

    useEffect(() => {
        async function getFlag(){
            setFlag(await getPlayerFlag());
        }

        getFlag();
    }, []);

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
                    <Button className="w-full h-96 p-0 overflow-hidden mt-auto hover:opacity-80 hover:bg-transparent transition-opacity" variant="ghost">
                        <Image
                            src={flag}
                            alt="Nation Flag"
                            className="w-full h-full object-contain"
                            width={128}
                            height={128}
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