import React from 'react'
import Navbar from '../Pages/Navbar'
import Footer from '../Pages/Footer'
import Spinner from '../Pages/Spinner'
import Header from '../Pages/Header'

/**
 * Layout Component
 * Wraps page routes with common global elements to prevent repetition.
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - The inner page component to render
 * @param {string} props.headerName - Optional title to pass to the underlying Header component
 */
export default function Layout({ children, headerName }) {
  return (
    <>
      <Spinner />
      <Navbar />
      {headerName && <Header name={headerName} />}
      {children}
      <Footer />
    </>
  )
}
