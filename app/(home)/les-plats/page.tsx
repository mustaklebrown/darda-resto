import { getMenus, getPlates, getPlateCategories, getMenuCategories } from '@/app/actions/menu';
import LesPlatsClient from './les-plats-client';
import { connection } from 'next/server';

export default async function LesPlatsPage() {
    await connection();
    const [menus, plates, plateCategories, menuCategories] = await Promise.all([
        getMenus(),
        getPlates(),
        getPlateCategories(),
        getMenuCategories()
    ]);

    return (
        <div className="min-h-screen bg-background pt-28 pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 tracking-tight">
                        Nos Créations Culinaires
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Explorez notre carte raffinée, des plats signature aux menus dégustation soigneusement composés.
                    </p>
                </div>
                <LesPlatsClient
                    initialMenus={menus}
                    initialPlates={plates}
                    plateCategories={plateCategories}
                    menuCategories={menuCategories}
                />
            </div>
        </div>
    );
}
