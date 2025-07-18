import ChildrenInterface from '@/interface/children.interface'
import React, { FC } from 'react'
import Header from './home/Header'
import Footer from './home/Footer'

const Layout: FC<ChildrenInterface> = ({children}) => {
  return (
    <div className="min-h-screen">
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout