'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

import { signupSchema } from '@/lib/validators/auth'
import { signUpAction } from '@/app/actions/auth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User, UserPlus, Loader2, ArrowLeft } from 'lucide-react'

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [serverError, setServerError] = useState('')

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: SignupFormData) {
        setServerError('')

        startTransition(async () => {
            try {
                const result = await signUpAction(values)

                if (result.success === false) {
                    setServerError(result.error)
                    return
                }

                router.push('/admin')
            } catch (error) {
                if (error instanceof Error) {
                    setServerError(error.message)
                } else {
                    setServerError('Une erreur est survenue lors de l\'inscription')
                }
            }
        })
    }

    return (
        <main className="min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center justify-center">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

            <div className="w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-[2.5rem] border border-border/40 bg-card/40 backdrop-blur-2xl p-8 md:p-10 shadow-2xl relative"
                >
                    {/* Decorative elements inside card */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                            <UserPlus className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Inscription</h1>
                        <p className="text-muted-foreground">
                            Créez votre compte administrateur
                        </p>
                    </div>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {serverError && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-2xl text-center flex items-center justify-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                                {serverError}
                            </motion.div>
                        )}

                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold ml-1 flex items-center gap-2 text-foreground/80">
                                <User className="w-4 h-4 text-primary/70" />
                                Nom complet
                            </label>
                            <Input
                                type="text"
                                placeholder="Jean Dupont"
                                {...form.register('name')}
                                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                            />
                            {form.formState.errors.name && (
                                <p className="text-destructive text-[11px] font-medium ml-1 mt-1">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold ml-1 flex items-center gap-2 text-foreground/80">
                                <Mail className="w-4 h-4 text-primary/70" />
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="votre@email.com"
                                {...form.register('email')}
                                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                            />
                            {form.formState.errors.email && (
                                <p className="text-destructive text-[11px] font-medium ml-1 mt-1">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold ml-1 flex items-center gap-2 text-foreground/80">
                                <Lock className="w-4 h-4 text-primary/70" />
                                Mot de passe
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                {...form.register('password')}
                                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                            />
                            {form.formState.errors.password && (
                                <p className="text-destructive text-[11px] font-medium ml-1 mt-1">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all mt-4 group"
                        >
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Créer mon compte
                                </span>
                            )}
                        </Button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-muted-foreground">
                                Vous avez déjà un compte ?{' '}
                                <Link href="/login" className="text-primary font-bold hover:text-primary/80 transition-colors">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Retour au site
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}
