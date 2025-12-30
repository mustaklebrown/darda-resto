import Footer from '../_components/Footer'
import Navbar from '../_components/Navbar'

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
                {children}
            </div>
            <Footer />
        </>
    )
}
