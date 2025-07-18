'use client'
import ChildrenInterface from '@/interface/children.interface'
import React, { FC } from 'react'
import Header from './shared/Header'
import Footer from './shared/Footer'
import { usePathname } from 'next/navigation'

const Layout: FC<ChildrenInterface> = ({children}) => {
    const pathname = usePathname();

    return (
        <div className="min-h-screen">
            {
                !(pathname.startsWith('/login') || pathname.startsWith('/signup')) &&
                <Header />
            }
            <main>
                {children}
            </main>
            {
                !(pathname.startsWith('/login') || pathname.startsWith('/signup')) &&
                <Footer />
            }
        </div>
    )
}

export default Layout