"use client"
interface BadgeOverlayProps {
    money: number;
}

export function BadgeOverlay({ money }: BadgeOverlayProps) {
    return (
        <div className="bg-red-500 text-2xl">
            <strong>Vermögen: </strong>CHF {money.toLocaleString()}
        </div>
    );
}
