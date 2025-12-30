'use client'

import { deletePlate } from './actions'
import { Button } from '@/components/ui/button'

export default function DeletePlateButton({ id }: { id: string }) {
    return (
        <Button
            size="sm"
            variant="destructive"
            onClick={() => deletePlate(id)}
        >
            Delete
        </Button>
    )
}
