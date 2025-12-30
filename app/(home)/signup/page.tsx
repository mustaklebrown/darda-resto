'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { signupSchema } from '@/lib/validators/auth'
import { signUpAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormData = z.infer<typeof signupSchema>

export default function SignupPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: FormData) {
        setLoading(true)
        setServerError('')

        try {
            const result = await signUpAction(values)

            if (!result.success) {
                setServerError(result.error)
                return
            }

            router.push('/admin')
        } catch (error: any) {
            setServerError(error.message || 'Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[2.5rem] border border-border/40 bg-card/40 backdrop-blur-2xl p-8 md:p-10 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Inscription</h1>
                        <p className="text-muted-foreground">
                            Créez votre compte administrateur
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                Nom
                            </label>
                            <Input
                                {...register('name')}
                                placeholder="Admin"
                                className="h-12 rounded-xl bg-background/50"
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive ml-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                Email
                            </label>
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="admin@darda.com"
                                className="h-12 rounded-xl bg-background/50"
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive ml-1">
                                    {errors.email.message}
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
                                {...register('password')}
                                type="password"
                                placeholder="••••••••"
                                className="h-12 rounded-xl bg-background/50"
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive ml-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Server error */}
                        {serverError && (
                            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-xl">
                                {serverError}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading || isSubmitting}
                            className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                        >
                            {loading || isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "S'inscrire"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-muted-foreground">
                            Déjà un compte ?{' '}
                            <Link href="/login" className="text-primary font-semibold hover:underline">
                                Connectez-vous
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
