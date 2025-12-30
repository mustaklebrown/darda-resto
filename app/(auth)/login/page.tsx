'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { loginSchema } from '@/lib/validators/auth'
import { LoginInput, signInAction } from '@/app/actions/auth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react'

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    async function onSubmit(values: LoginInput) {
        setLoading(true)
        setServerError('')

        try {
            const result = await signInAction(values)

            if ('error' in result) {
                setServerError(result.error)
                return
            }

            router.push('/admin')
        } catch (error: any) {
            setServerError(error?.message ?? 'Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    // async function onSubmit(values: FormData) {
    //     setLoading(true)
    //     setServerError('')

    //     try {
    //         const result = await signInAction(values)

    //         if (!result.success) {
    //             setServerError(result.error)
    //             return
    //         }

    //         router.push('/admin')
    //     } catch (error: any) {
    //         setServerError(error.message || 'Une erreur est survenue')
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <main className="min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[2.5rem] border border-border/40 bg-card/40 backdrop-blur-2xl p-8 md:p-10 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Administration</h1>
                        <p className="text-muted-foreground">
                            Connectez-vous pour gérer le restaurant
                        </p>
                    </div>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="admin@darda.com"
                                {...form.register('email')}
                                className="h-12 rounded-xl bg-background/50"
                            />
                            {form.formState.errors.email && (
                                <p className="text-destructive text-xs ml-1">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-primary" />
                                Mot de passe
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                {...form.register('password')}
                                className="h-12 rounded-xl bg-background/50"
                            />
                            {form.formState.errors.password && (
                                <p className="text-destructive text-xs ml-1">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl"
                        >
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogIn className="w-5 h-5" />
                                    Se connecter
                                </span>
                            )}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </main>
    )
}
