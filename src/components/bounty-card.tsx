import cn from 'clsx'
import { Card, CardContent } from './ui/card'
import { DollarSign, Target, Clock, Award, AlertTriangle, RefreshCw } from 'lucide-react'
import { Progress } from './ui/progress'
import { useStore } from '@/store/useStore'

function BountyCard() {
  const databaseData = useStore((state) => state.databaseData)
  const isPositivo = !databaseData?.isNegative

  const bountyReward = 50
  const bountyTarget = 10
  const bountyProgress = 5
  const bountyPercentage = (bountyProgress / bountyTarget) * 100
  const recordStreak = databaseData?.recordStreak || 0

  return (
  <div>
        <div className="w-full mb-4">
            <Card
              className={cn(
                "overflow-hidden",
                isPositivo ? "bg-yellow-950/30 border-yellow-600/30" : "bg-red-950/30 border-red-900/30",
              )}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <h3 className="text-base font-bold text-white">BOUNTY: R$ {bountyReward},00</h3>
                  </div>
                  <div className="flex items-center">
                    <Target className={cn("h-3 w-3 mr-1", isPositivo ? "text-yellow-500" : "text-red-400")} />
                    <span className={cn("text-sm font-bold", isPositivo ? "text-yellow-500" : "text-red-400")}>
                      Meta: {bountyTarget}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{isPositivo ? "Progresso atual" : "Progresso perdido 💸"}</span>
                    <span className="text-white font-medium">
                      {isPositivo ? `${bountyProgress}/${bountyTarget}` : "0/10"}
                    </span>
                  </div>

                  {isPositivo ? (
                    <Progress
                      value={bountyPercentage}
                    />
                  ) : (
                    <div className="relative">
                      <Progress value={0} className="h-1.5 bg-red-950/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full border-t border-dashed border-red-500/50"></div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    {isPositivo ? (
                      <>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-gray-400 text-[10px]">Faltam {bountyTarget - bountyProgress}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-gray-400 text-[10px]">Recorde: {recordStreak}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <AlertTriangle className="h-3 w-3 text-red-400 mr-1" />
                          <span className="text-red-400 text-[10px]">Sequência negativa zera</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-gray-400 text-[10px]">Recorde: {recordStreak}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
  </div>
  )
}

export default BountyCard
