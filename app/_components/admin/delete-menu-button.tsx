'use client'

import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { deleteMenuAction } from "@/app/actions/menu"

export default function DeleteMenuButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            size="sm"
            variant="destructive"
            disabled={isPending}
            onClick={() => {
                if (!confirm("Delete this menu?")) return
                startTransition(() => deleteMenuAction(id))
            }}
        >
            Delete
        </Button>
    )
}
