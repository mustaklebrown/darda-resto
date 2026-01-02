import { Suspense } from 'react'
import Footer from '../_components/layout/footer'
import Navbar from '../_components/layout/navbar'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Navbar must be OUTSIDE any backdrop-filter */}
            <Navbar />

            {/* Page background */}
            <div className="pt-28 backdrop-blur-xl bg-amber-200/20 dark:bg-amber-800/10">
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
                    {children}
                </Suspense>
            </div>
            <Footer />
        </>
    )
}
