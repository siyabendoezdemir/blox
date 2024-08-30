import { Coins, Flag, TrendingUp, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAreaFlag } from "@/lib/functions";

// Define the types for the component props
interface PopupContentProps {
    name: string;
    population: number;
    baseValue: number;
    calculateIncome: (population: number) => number;
    onClaim: (name: string) => void;
}

export function AreaPopup({ name, population, baseValue, calculateIncome, onClaim }: PopupContentProps) {
    const [flag, setFlag] = useState("");

    useEffect(() => {
        async function getFlag(){
            setFlag(await getAreaFlag(name));
        }

        getFlag();
    }, []);

    return (
        <Card className="w-80 bg-slate-900 text-slate-100 border-slate-700 shadow-lg">
            <CardHeader className="bg-slate-800 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold">{name}</span>
                    {
                        flag ? (
                            <Image alt="Area flag" src={flag} width={64} height={64} className="h-8 w-8" />
                        ) : (
                            <Flag className="w-6 h-6 text-yellow-500" />
                        )
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-2">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-blue-400" />
                            <span className="text-sm font-medium">Population:</span>
                        </div>
                        <span className="text-sm font-bold">{population.toLocaleString()}</span>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Coins className="h-5 w-5 text-yellow-400" />
                            <span className="text-sm font-medium">Base Value per Person:</span>
                        </div>
                        <span className="text-sm font-bold">${baseValue.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="h-5 w-5 text-green-400" />
                            <span className="text-sm font-medium">Income:</span>
                        </div>
                        <span className="text-sm font-bold">${calculateIncome(population).toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => onClaim(name)}
                >
                    Claim Area
                </Button>
            </CardFooter>
        </Card>
    );
};
