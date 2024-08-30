import { ScrollArea } from "../ui/scroll-area";

export function Notifications() {
    const notifications = [
        "New technology available: Advanced Weaponry",
        "Diplomatic offer from Basel",
        "Unrest in Basel-Land region",
        "Resource shortage in Bubendorf",
        "Enemy troops spotted near Oberwil BL"
    ];

    return (
        <div className="hidden md:block w-64 bg-gray-800 p-4 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <ScrollArea className="h-full">
                <ul className="space-y-2">
                    {notifications.map((notification, index) => (
                        <li key={index} className="p-2 bg-gray-700 rounded text-sm">
                            {notification}
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    )
}