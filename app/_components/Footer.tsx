

const Footer = () => {
    return (
        <footer className="relative mt-24 border-t border-border/40">
            {/* Glass background */}
            <div className="absolute inset-0 bg-background/70 dark:bg-card/60 backdrop-blur-xl" />

            <div className="relative mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h4 className="text-xl font-semibold">
                            Comores Kitchen
                        </h4>
                        <p className="mt-3 text-sm text-foreground/70">
                            Cuisine comorienne authentique faite maison,
                            préparée avec passion et tradition.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h5 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            Navigation
                        </h5>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary transition">Accueil</a></li>
                            <li><a href="#" className="hover:text-primary transition">Menu</a></li>
                            <li><a href="#" className="hover:text-primary transition">Réservation</a></li>
                            <li><a href="#" className="hover:text-primary transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            Contact
                        </h5>
                        <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                            <li>Moroni, Comores</li>
                            <li>+269 123 456</li>
                            <li>contact@comoreskitchen.com</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h5 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            Suivez-nous
                        </h5>
                        <div className="mt-4 flex gap-4">
                            <a className="hover:text-primary transition" href="#">Instagram</a>
                            <a className="hover:text-primary transition" href="#">Facebook</a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-14 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
                    <span>© {new Date().getFullYear()} Comores Kitchen. Tous droits réservés.</span>
                    <span className="mt-4 sm:mt-0">
                        Conçu avec soin & tradition
                    </span>
                </div>
            </div>
        </footer>

    )
}

export default Footer