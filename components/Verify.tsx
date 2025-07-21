'use client'

import Link from "next/link";
import Logo from "./shared/Logo";
import { z } from 'zod'
import { verifyAccountSchema } from "@/lib/validations/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "./ui/button";

type VerifyAccountSchema = z.infer<typeof verifyAccountSchema>

const Verify = () => {
    const form = useForm<VerifyAccountSchema>({resolver: zodResolver(verifyAccountSchema), defaultValues: {otp: ''}})

    const onSubmit = (data: VerifyAccountSchema) => {
        console.log(data)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 mt-10 py-20 p-6">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <Logo />
                </Link>
                <div className="flex flex-col gap-6">
                    <Card className="mx-auto max-w-md">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">Enter Verification Code</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="text-center mb-4">
                                        <FormField 
                                            control={form.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="mb-5">
                                                        <FormControl>
                                                            <div className="flex justify-center items-center">
                                                                <InputOTP
                                                                    maxLength={6}
                                                                    pattern={REGEXP_ONLY_DIGITS}
                                                                    {...field}
                                                                >
                                                                    <InputOTPGroup className="space-x-4 *:rounded! *:border!">
                                                                        <InputOTPSlot index={0} />
                                                                        <InputOTPSlot index={1} />
                                                                        <InputOTPSlot index={2} />
                                                                        <InputOTPSlot index={3} />
                                                                        <InputOTPSlot index={4} />
                                                                        <InputOTPSlot index={5} />
                                                                    </InputOTPGroup>
                                                                </InputOTP>
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription>You will be automatically redirected after the code is confirmed.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-300 via-10% to-amber-400 hover:opacity-80">
                                        Verify
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Verify;
