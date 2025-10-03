import React from 'react'

const Footer = () => {
  return (
    <div>
        <section className="max-w-4xl mx-auto mt-16 px-6 py-10 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">
          About SleekShort
        </h2>
        <p className="text-gray-700">
          SleekShort is a simple and elegant tool to turn your long and messy
          URLs into clean, short links. Built using the MERN stack, it's fast,
          reliable, and user-friendly. Perfect for sharing on social media,
          emails, or wherever short links are needed.
        </p>
      </section>

      <footer className="mt-20 bg-purple-700 text-white text-center py-6">
        <p>
          &copy; {new Date().getFullYear()} SleekShort. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
