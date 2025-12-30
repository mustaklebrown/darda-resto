'use client'

import { updateReservationStatus } from "./actions"



export default function StatusSelect({
    id,
    status,
}: {
    id: string
    status: string
}) {
    return (
        <select
            defaultValue={status}
            onChange={e =>
                updateReservationStatus(id, e?.target?.value as "PENDING" | "CONFIRMED" | "CANCELLED")
            }
            className="w-full rounded-xl border bg-background p-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        >
            <option value="PENDING">En attente</option>
            <option value="CONFIRMED">Confirmée</option>
            <option value="CANCELLED">Annulée</option>
        </select>
    )
}
