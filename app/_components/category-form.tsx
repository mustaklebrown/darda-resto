'use client'

import { useState } from 'react'

export default function CategoryForm() {
    const [name, setName] = useState('')

    async function submit() {
        await fetch('/admin/categories/action', {
            method: 'POST',
            body: JSON.stringify({ name }),
        })
        location.reload()
    }

    return (
        <div className="
      rounded-3xl border border-border/40
      bg-background/70 dark:bg-card/60
      backdrop-blur-xl p-6
    ">
            <h3 className="font-medium mb-4">
                Nouvelle Catégorie
            </h3>

            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nom de la catégorie"
                className="w-full rounded-xl border px-4 py-3"
            />

            <button
                onClick={submit}
                className="mt-4 rounded-xl bg-primary px-5 py-2 text-primary-foreground"
            >
                Ajouter
            </button>
        </div>
    )
}
