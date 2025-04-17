import { create } from 'zustand'
import { MatchData, DatabaseData, handleMatchStatus } from '@/services/matchService'
import getMatchFromDatabase from '@/db/getData'

interface StoreState {
  isNegative: boolean
  matches: MatchData
  databaseData: DatabaseData | null
  updateDatabaseData: (data: DatabaseData) => void
  setMatches: (matches: MatchData) => void
  refreshDatabaseData: () => Promise<void>
}

export const useStore = create<StoreState>((set) => ({
  isNegative: true,
  matches: {} as MatchData,
  databaseData: null,
  updateDatabaseData: (data: DatabaseData) => set({ databaseData: data }),
  setMatches: async (matches) => {
    set({ matches })
    await handleMatchStatus(matches)
  },
  refreshDatabaseData: async () => {
    try {
      const data = await getMatchFromDatabase()
      set({ databaseData: data })
    } catch (error) {
      console.error('Error fetching database data:', error)
    }
  }
})) 