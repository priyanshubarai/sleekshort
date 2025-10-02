import React from 'react'

const Header = () => {
  return (
    <header className="text-center p-8 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-4xl font-bold text-purple-700">SleekShort</h1>
        <p className="text-sm text-gray-600 mt-2">
          Your personal URL shortening service
        </p>
      </header>
  )
}

export default Header
