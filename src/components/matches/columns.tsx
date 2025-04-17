import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export type Matches = {
  id: string
  date: string
  score: string
  result: string
  frags: string | number
  kdr: string | number
  matchURL: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const columns: ColumnDef<Matches>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({row}) => {
      return (
        <span className="text-white font-light">{formatDate(row.original.date)}</span>
      )
    },
    size: 120
  },
  {
    accessorKey: "score",
    header: "Resultado",
    cell: ({row}) => {
      return (
        <span className={cn(
          "font-semibold",
          row.original.result === 'Win' ? 'text-green-600' : 'text-red-600'
        )}>{row.original.score}</span>
      )
    },
    size: 100
  },
  {
    accessorKey: "frags",
    header: "Frag",
    cell: ({row}) => {
      return (
        <span className="text-red-600 font-medium">{row.original.frags}</span>
      )
    },
    size: 80
  },
  {
    accessorKey: "kdr",
    header: "KDR",
    cell: ({row}) => {
      return (
        <span className="text-red-600 font-medium">{row.original.kdr}</span>
      )
    },
    size: 80
  },
  {
    accessorKey: "matchURL",
    header: 'Partida',
    cell: ({row}) => {
      return (
        <a 
          href={row.original.matchURL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-gray-600 hover:text-gray-900" />
        </a>
      )
    },
    size: 80
  }
]
