import BountyCard from './components/bounty-card'
import StreakCounter from './components/streak-counter'
import MatchesTable from './components/matches/page'
import SubmitMatch from './components/submit-match'
import Footer from './components/footer'
import { cn } from './lib/utils'
import { useStore } from './store/useStore'
import { getMatchData } from './services/matchService'
import { useEffect } from 'react'

function App() {
  const { databaseData, setMatches, refreshDatabaseData } = useStore()

  useEffect(() => {
    refreshDatabaseData()
  }, [refreshDatabaseData])

  const handleMatchSubmit = async (matchId: string) => {
    try {
      const newMatch = await getMatchData(matchId)
      setMatches(newMatch)
    } catch (error) {
      console.error('Failed to submit match:', error)
    }
  }

  return (
    <div className={cn(
      "min-h-screen w-full transition-colors duration-500 min-w-screen",
      databaseData?.isNegative ? "bg-gradient-to-br from-black via-red-950/50 to-black" : "bg-gradient-to-br from-black via-green-950/50 to-black",
    )}>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col items-center justify-between gap-4">
            <StreakCounter />
          </div>
          <BountyCard status={databaseData?.isNegative ? "negative" : "positive"} />

          {/* Main Content */}
          <div className={cn(
            "w-full bg-black/40 backdrop-blur-sm overflow-hidden transition-colors duration-300 p-6 sm:p-8 rounded-lg border",
            databaseData?.isNegative ? "border-red-900/30" : "border-green-900/30",
          )}>
            <div className="space-y-6">
              <MatchesTable />
              <SubmitMatch onMatchSubmit={handleMatchSubmit} />
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
