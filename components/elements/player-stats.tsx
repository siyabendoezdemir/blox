import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Building2, Coins, Droplet, GraduationCap, MapPin, Stethoscope, Sword, Swords, TrendingDown, TrendingUp, Users, Zap } from "lucide-react";
import { getPlayerFlag, getTotalPopulation } from "@/lib/player";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";

export function PlayerStats() {
    const [militaryPercentage, setMilitaryPercentage] = useState(30);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [flag, setFlag] = useState("");
    const [countryData, setCountryData] = useState({
        government: "Democracy",
        population: 0,
        populationGrowth: 0, // Initial growth rate
        income: 0,
        activePersonnel: 0,
        costs: {
            military: 0,
            food: 0,
            oil: 0,
            electricity: 0,
        },
        fixedCosts: {
            administration: 1425000, // 28500000 * 0.05
            education: 2850000, // 28500000 * 0.1
            healthcare: 4275000, // 28500000 * 0.15
            infrastructure: 2280000, // 28500000 * 0.08
        },
    });

    const fetchCountryData = async () => {
        try {
            const totalPopulation = await getTotalPopulation();
            setCountryData(prevData => ({
                ...prevData,
                population: totalPopulation,
            }));
        } catch (error) {
            console.error("Failed to fetch total population:", error);
        }
    };

    useEffect(() => {
        fetchCountryData();
        const intervalId = setInterval(fetchCountryData, 5000); // Poll every 5 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const economyPercentage = 100 - militaryPercentage;
        const newGrowthRate = (50 - militaryPercentage) / 10;

        setCountryData(prevData => ({
            ...prevData,
            populationGrowth: newGrowthRate,
            income: calculateIncome(prevData.population, economyPercentage),
            activePersonnel: calculateActivePersonnel(prevData.population, militaryPercentage),
            costs: calculateVariableCosts(prevData.population, militaryPercentage),
        }));
    }, [militaryPercentage, countryData.population]);

    const calculateIncome = (population: any, economyPercentage: any) => {
        const baseIncomePerPerson = 19312.425;
        return Math.round(population * baseIncomePerPerson * (economyPercentage / 100));
    };

    const calculateActivePersonnel = (population: any, militaryPercentage: any) => {
        return Math.round(population * (militaryPercentage / 100));
    };

    const calculateVariableCosts = (population: any, militaryPercentage: any) => {
        const baseMilitaryCost = 375000;
        const baseFoodCost = 200000;
        const baseOilCost = 150000;
        const baseElectricityCost = 100000;

        return {
            military: Math.round(baseMilitaryCost * (militaryPercentage / 30)),
            food: Math.round(baseFoodCost * (militaryPercentage / 30)),
            oil: Math.round(baseOilCost * (militaryPercentage / 30)),
            electricity: Math.round(baseElectricityCost * (militaryPercentage / 30)),
        };
    };

    const totalFixedCosts = Object.values(countryData.fixedCosts).reduce((a, b) => a + b, 0);
    const totalVariableCosts = Object.values(countryData.costs).reduce((a, b) => a + b, 0);

    useEffect(() => {
        async function getFlag() {
            setFlag(await getPlayerFlag());
        }

        getFlag();
    }, []);

    return (
        <div className="h-full p-4 flex flex-col">
            <div className="space-y-4 flex-grow">
                <div>
                    <p className="text-sm text-slate-400">Government</p>
                    <p className="font-medium">{countryData.government}</p>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Users size={18} />
                            <p className="text-sm text-slate-400">Population</p>
                        </div>
                        {countryData.populationGrowth > 0 ? (
                            <TrendingUp size={18} className="text-green-500" />
                        ) : (
                            <TrendingDown size={18} className="text-red-500" />
                        )}
                    </div>
                    <p className="font-medium">{countryData.population.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Growth: {countryData.populationGrowth.toFixed(2)}%</p>
                </div>

                <div>
                    <div className="flex items-center space-x-2">
                        <Coins size={18} />
                        <p className="text-sm text-slate-400">Income</p>
                    </div>
                    <p className="font-medium">${countryData.income.toLocaleString()}</p>
                </div>

                <div>
                    <p className="text-sm text-slate-400 mb-2">Military-Economy Balance</p>
                    <Slider
                        value={[militaryPercentage]}
                        onValueChange={(value) => setMilitaryPercentage(value[0])}
                        max={100}
                        step={1}
                        className="mb-2"
                    />
                    <div className="flex justify-between text-xs">
                        <span>Economy: {100 - militaryPercentage}%</span>
                        <span>Military: {militaryPercentage}%</span>
                    </div>
                    {militaryPercentage > 70 && (
                        <p className="text-xs text-red-400 mt-1">Warning: High military spending may weaken the economy.</p>
                    )}
                    {militaryPercentage < 20 && (
                        <p className="text-xs text-red-400 mt-1">Warning: Low military presence may leave the country vulnerable.</p>
                    )}
                </div>

                <div>
                    <div className="flex items-center space-x-2">
                        <Sword size={18} />
                        <p className="text-sm text-slate-400">Active Military Personnel</p>
                    </div>
                    <p className="font-medium">{countryData.activePersonnel.toLocaleString()}</p>
                    <Progress value={militaryPercentage} className="h-2 mt-1" />
                    <p className="text-right text-xs mt-1">{(countryData.activePersonnel / countryData.population * 100).toFixed(2)}% of population</p>
                </div>

                <div>
                    <p className="text-sm text-slate-400 mb-2">Variable Costs</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Sword size={16} />
                                <span className="text-xs">Military</span>
                            </div>
                            <span className="text-xs">${countryData.costs.military.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Users size={16} />
                                <span className="text-xs">Food</span>
                            </div>
                            <span className="text-xs">${countryData.costs.food.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Droplet size={16} />
                                <span className="text-xs">Oil</span>
                            </div>
                            <span className="text-xs">${countryData.costs.oil.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Zap size={16} />
                                <span className="text-xs">Electricity</span>
                            </div>
                            <span className="text-xs">${countryData.costs.electricity.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-slate-400 mb-2">Fixed Costs</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Building2 size={16} />
                                <span className="text-xs">Administration</span>
                            </div>
                            <span className="text-xs">${countryData.fixedCosts.administration.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <GraduationCap size={16} />
                                <span className="text-xs">Education</span>
                            </div>
                            <span className="text-xs">${countryData.fixedCosts.education.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Stethoscope size={16} />
                                <span className="text-xs">Healthcare</span>
                            </div>
                            <span className="text-xs">${countryData.fixedCosts.healthcare.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Building2 size={16} />
                                <span className="text-xs">Infrastructure</span>
                            </div>
                            <span className="text-xs">${countryData.fixedCosts.infrastructure.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-slate-400 mb-2">Total Costs</p>
                    <div className="flex justify-between items-center">
                        <span className="text-xs">Variable Costs</span>
                        <span className="text-xs">${totalVariableCosts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs">Fixed Costs</span>
                        <span className="text-xs">${totalFixedCosts.toLocaleString()}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center font-medium">
                        <span>Total</span>
                        <span>${(totalVariableCosts + totalFixedCosts).toLocaleString()}</span>
                    </div>
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
    );
}
