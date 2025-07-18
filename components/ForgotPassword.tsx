'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import Logo from './shared/Logo'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { forgotPasswordSchema } from '@/lib/validations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

const ForgotPassword = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ForgotPasswordSchema>({resolver: zodResolver(forgotPasswordSchema)})

    const onSubmit = (data: ForgotPasswordSchema) => {
        console.log(data)
    }

    return (
        <div className="bg-muted flex flex-col items-center justify-center gap-6 mt-10 py-20 p-6">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                    <Logo />
                </Link>
                <div className="flex flex-col gap-6">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                            <CardDescription>Enter your email below to receive a password reset link</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" required {...register('email')} />
                                    {errors.email && (
                                        <p className='text-sm text-red-500'>
                                            {errors.email.message}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500">A password reset link will be sent to the provided email address.</p>
                                </div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-amber-300 via-10% to-amber-400 hover:opacity-80">
                                    Send Reset Link
                                </Button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Remembered your password?{" "}
                                <Link href="/login" className="underline" prefetch={false}>
                                    Go back to login
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword