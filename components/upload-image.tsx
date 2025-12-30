'use client'

import { UploadButton } from '@/lib/uploadthing'

export function UploadImage({
    onUploaded,
}: {
    onUploaded: (url: string) => void
}) {
    return (
        <UploadButton
            endpoint="plateImage"
            onClientUploadComplete={(res) => {
                onUploaded(res[0].url)
            }}
            appearance={{
                button:
                    'bg-primary text-primary-foreground rounded-xl px-4 py-2',
            }}
        />
    )
}
