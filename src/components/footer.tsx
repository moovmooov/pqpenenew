import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
export default function Footer() {
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
      </TooltipProvider> (contando com o próprio penenew) e a partir da data 06/05/2025.</p>
    </footer>
  )
}