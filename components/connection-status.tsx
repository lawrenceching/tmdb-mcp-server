'use client'

import { useEffect, useState } from 'react'

type Status = 'checking' | 'connected' | 'error'

interface ConnectionStatusProps {
  checkUrl: string
}

export function ConnectionStatus({ checkUrl }: ConnectionStatusProps) {
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    fetch(checkUrl)
      .then(res => res.ok ? setStatus('connected') : setStatus('error'))
      .catch(() => setStatus('error'))
  }, [checkUrl])

  const statusColor = {
    checking: 'bg-gray-400 animate-pulse',
    connected: 'bg-green-500',
    error: 'bg-red-500',
  }[status]

  return (
    <div className={`h-3 w-3 rounded-full ${statusColor}`} title={status} />
  )
}
