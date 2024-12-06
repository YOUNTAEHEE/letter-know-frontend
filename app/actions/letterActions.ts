'use server'

import { Letter, User } from '../types/letter'

let letters: Letter[] = []
const exchangeLimit = 5
const users: User[] = [
  { id: '1', name: '사용자1' },
  { id: '2', name: '사용자2' },
  { id: '3', name: '사용자3' },
]

export async function sendLetter(fromId: string, toId: string, content: string) {
  const now = new Date()
  const exchangeCount = letters.filter(l => 
    (l.from === fromId && l.to === toId) || (l.from === toId && l.to === fromId)
  ).length

  if (exchangeCount >= exchangeLimit) {
    return { success: false, message: '편지 교환 횟수를 초과했습니다.' }
  }

  // 여기에서 시간 제한을 확인할 수 있습니다. 예를 들어, 오후 8시부터 10시 사이에만 보낼 수 있도록 설정
  const hour = now.getHours()
  if (hour < 20 || hour >= 22) {
    return { success: false, message: '편지는 오후 8시부터 10시 사이에만 보낼 수 있습니다.' }
  }

  const newLetter: Letter = {
    id: Date.now().toString(),
    from: fromId,
    to: toId,
    content,
    sentAt: now,
  }

  letters.push(newLetter)
  return { success: true, message: '편지를 성공적으로 보냈습니다.' }
}

export async function getLetters(userId: string) {
  return letters.filter(l => l.to === userId || l.from === userId)
}

export async function getUsers() {
  return users
}

