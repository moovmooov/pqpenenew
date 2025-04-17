import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useStore } from "../store/useStore"

export default function Footer() {
  const { databaseData } = useStore()
  return (
    <footer className="p-4">
      <p className="text-center text-[12px] font-light text-gray-900 dark:text-gray-300">São válidas apenas partidas com no mínimo 3 <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="underline">
              membros da Pirulandia
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Moov, Tomahawk, Madrugadão, Nervous Bear, Bixo Preto ou Callegari.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> (contando com o próprio penenew) e a partir da data {new Date(databaseData?.matches[0].date).toLocaleDateString('pt-BR')}.</p>
    </footer>
  )
}