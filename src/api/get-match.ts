export async function getMatch(matchId: string) {
    const response = await fetch(`https://gamersclub.com.br/lobby/match/${matchId}/1`)
    const data = await response.json()
    return data
}