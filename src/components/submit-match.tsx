import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2, Plus } from "lucide-react"
import { Label } from "./ui/label"
import { useState } from "react"

interface SubmitMatchProps {
  onMatchSubmit: (matchId: string) => void;
}

export default function SubmitMatch({ onMatchSubmit }: SubmitMatchProps) {
  const [matchId, setMatchId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const isValidMatchId = (id: string) => /^\d+$/.test(id.trim()) && id.trim().length > 0

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    setError("")
    
    if (!isValidMatchId(matchId)) {
      setError("Por favor, insira um ID de partida válido (apenas números)")
      return
    }
    
    setIsLoading(true)
    try {
      await onMatchSubmit(matchId.trim())
      setMatchId("")
    } catch (error) {
      console.error("Error submitting match:", error)
      setError("Erro ao adicionar partida. Verifique o ID e tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Label htmlFor="matchId" className="text-sm font-medium">
        Adicione o ID da partida da GC aqui:
      </Label>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Input 
            id="matchId"
            type="text" 
            placeholder="ID da partida" 
            className={`rounded-sm p-2 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            value={matchId}
            onChange={(e) => {
              setMatchId(e.target.value)
              if (error) setError("")
            }}
            disabled={isLoading}
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading || !matchId.trim()} 
          className="min-w-24"
        >
          {isLoading ? (
            <span className="flex items-center gap-2 text-white">
              <Loader2 className="animate-spin" size={16} />
              Adicionando...
            </span>
          ) : (
            <span className="flex items-center gap-2 text-white">
              <Plus size={16} />
              Adicionar
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}