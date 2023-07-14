'use client'
import { sessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
  return (
    <sessionProvider session = {session}>
      { children }
      </sessionProvider>
  )
}

export default Provider;