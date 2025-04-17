'use client'

import { useEffect, useState } from 'react'
import { DataTable } from "./datatable"
import { columns } from "./columns"
import { Matches } from './columns'
import { useStore } from '@/store/useStore'

export default function MatchesTable() {
  const [data, setData] = useState<Matches[]>([])
  const databaseData = useStore((state) => state.databaseData)

  useEffect(() => {
    if (databaseData) {
      const transformedData: Matches[] = databaseData.matches.map(match => ({
        id: match.matchId,
        date: match.date,
        score: match.score,
        result: match.result,
        frags: match.frag,
        kdr: match.kdr,
        matchURL: `https://gamersclub.com.br/lobby/match/${match.matchId}`
      }))
      transformedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setData(transformedData)
    }
  }, [databaseData])

  return <DataTable columns={columns} data={data} />
}
