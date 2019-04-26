import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link
      to="/"
      style={{ fontFamily: "'Lobster', cursive" }}
      className="no-underline text-black text-4xl"
    >
      Shopping advisor builder
    </Link>
  )
}
