'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import Logo from './shared/Logo'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { forgotPasswordSchema } from '@/lib/validations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

const ForgotPassword = () => {
    const form = useForm<ForgotPasswordSchema>({resolver: zodResolver(forgotPasswordSchema), defaultValues: {email: ''}})

    const onSubmit = (data: ForgotPasswordSchema) => {
        console.log(data)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 mt-10 py-20 p-6">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                    <Logo />
                </Link>
                <div className="flex flex-col gap-6">
                    <Card className="mx-auto max-w-md">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                            <CardDescription>Enter your email below to receive a password reset link</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField 
                                        control={form.control} 
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="m@example.com" {...field} />
                                                </FormControl>
                                                <FormDescription>A password reset link will be sent to the provided email address.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-300 via-10% to-amber-400 hover:opacity-80">
                                        Send Reset Link
                                    </Button>
                                </form>
                            </Form>
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