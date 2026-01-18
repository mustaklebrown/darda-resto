'use client'

import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { User, Lock, Monitor } from "lucide-react"

export default function SettingsPage() {
    const { data: session } = useSession()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (!session) {
        return (
            <div className="container max-w-4xl mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <h1 className="text-3xl font-bold">Accès refusé</h1>
                <p className="text-muted-foreground">Vous devez être connecté pour accéder à cette page.</p>
                <Button asChild>
                    <a href="/login">Se connecter</a>
                </Button>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-2">Paramètres</h1>
            <p className="text-muted-foreground mb-8">Gérez vos préférences et les informations de votre compte.</p>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-8">
                    <TabsTrigger value="general" className="gap-2"><User className="h-4 w-4" /> Général</TabsTrigger>
                    <TabsTrigger value="security" className="gap-2"><Lock className="h-4 w-4" /> Sécurité</TabsTrigger>
                    <TabsTrigger value="preferences" className="gap-2"><Monitor className="h-4 w-4" /> Préférences</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations personnelles</CardTitle>
                            <CardDescription>
                                Mettez à jour vos informations de profil.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                                    <AvatarFallback className="text-lg">{session.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline">Changer l'avatar</Button>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input id="name" defaultValue={session.user?.name || ''} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" defaultValue={session.user?.email || ''} disabled />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => toast.success("Modifications enregistrées (Simulation)")}>
                                Enregistrer
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mot de passe</CardTitle>
                            <CardDescription>
                                Modifiez votre mot de passe pour sécuriser votre compte.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Mot de passe actuel</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => toast.success("Mot de passe mis à jour (Simulation)")}>
                                Mettre à jour
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences">
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Apparence</CardTitle>
                            <CardDescription>
                                Personnalisez l'apparence de l'application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Thème sombre</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Activer le mode sombre pour l'interface.
                                    </p>
                                </div>
                                <Switch
                                    checked={theme === 'dark'}
                                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Gérez vos préférences de notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Notifications email</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recevoir des emails concernant vos commandes.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Notifications commerciales</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recevoir des offres spéciales et nouveautés.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
