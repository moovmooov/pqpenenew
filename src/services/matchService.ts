import { toast } from 'sonner'
import { getMatch } from '../api/get-match'
import { PIRULANDIA_MEMBERS } from '../utils/pirulandia-members'
import getMatchFromDatabase from '@/db/getData'
import updateData from '@/db/updateData'
import { useStore } from '@/store/useStore'
// Types
interface Player {
  player: {
    id: string
  }
  nb_kill: number
  death: number
  kdr: number
}

interface MatchPlayers {
  team_a: Player[]
  team_b: Player[]
}

interface Jogos {
  players: MatchPlayers
  score_a: number
  score_b: number
  updated_at: string
  color_a: string
  color_b: string
}

export interface MatchData {
  id: string
  jogos: Jogos
}

interface MatchDetails {
  matchId: string
  date: string
  score: string
  frag: string
  kdr: number
  result: 'Win' | 'Lose'
}

export interface DatabaseData {
  isNegative: boolean
  streak: number
  matches: MatchDetails[]
}

const getTeamDetails = (match: MatchData): Player[] => {
  const teamA = match.jogos.players.team_a.filter((player) => PIRULANDIA_MEMBERS.includes(player.player.id))
  const teamB = match.jogos.players.team_b.filter((player) => PIRULANDIA_MEMBERS.includes(player.player.id))

  return teamA.length > teamB.length ? teamA : teamB
}

const hasEnoughPirulandiaMembers = (match: MatchData): boolean => {
  const allTeamMatches = [
    ...match.jogos.players.team_a,
    ...match.jogos.players.team_b
  ].filter((player) => PIRULANDIA_MEMBERS.includes(player.player.id))
  
  return allTeamMatches.length >= 3
}

const getMatchDetails = (players: Player[], match: MatchData): MatchDetails | null => {
  const penenew = players.find((player) => player.player.id === '1784219')
  if (!penenew) {
    toast.error('Penenew não encontrado na partida')
    return null
  }

  const isTeamA = match.jogos.players.team_a.some(p => p.player.id === '1784219')
  const teamColor = isTeamA ? match.jogos.color_a : match.jogos.color_b

  return {
    matchId: match.id,
    date: match.jogos.updated_at,
    score: `${match.jogos.score_a}:${match.jogos.score_b}`,
    frag: `${penenew.nb_kill}/${penenew.death}`,
    kdr: penenew.kdr,
    result: teamColor === 'red' ? 'Lose' : 'Win'
  }
}

export const getMatchData = async (matchId: string): Promise<MatchData> => {
  try {
    return await getMatch(matchId)
  } catch (error) {
    console.error('Error submitting match:', error)
    throw error
  }
}

export const handleMatchStatus = async (match: MatchData): Promise<boolean> => {
  try {
    if(!match.jogos){
      toast.error('Partida não encontrada')
      return false
    }
    const teamDetails = getTeamDetails(match)
    const matchDetails = getMatchDetails(teamDetails, match)
    
    const hasEnoughMembers = hasEnoughPirulandiaMembers(match)
    if (!hasEnoughMembers) {
      toast.error('Não há membros suficientes da pirulandia na partida.')
      return false
    }

    const databaseData = await getMatchFromDatabase()

    if (!databaseData) {
      throw new Error('Failed to fetch database data')
    }

    if (databaseData.matches.find((m) => m.matchId === matchDetails.matchId)) {
      toast.error('Partida já registrada.')
      return false
    }

    if (databaseData.matches[0] && new Date(databaseData.matches[0].date) > new Date(matchDetails.date)) {
      toast.error('Partida fora do período de registro')
      return false
    }

    const isPositiveKDR = matchDetails.kdr >= 1.0
    const newStreak = databaseData.isNegative !== !isPositiveKDR ? 1 : databaseData.streak + 1
    const payload = {
      isNegative: !isPositiveKDR,
      streak: newStreak,
      matches: databaseData.isNegative !== !isPositiveKDR ? [matchDetails] : [...databaseData.matches, matchDetails],
      recordStreak: !isPositiveKDR 
        ? databaseData.recordStreak || 0 
        : Math.max(newStreak, databaseData.recordStreak || 0)
    }
    await updateData(payload)
    useStore.getState().updateDatabaseData(payload)
    toast.success('Partida registrada com sucesso!')

    return true
  } catch (error) {
    console.error('Error handling match status:', error)
    return false
  }
} 