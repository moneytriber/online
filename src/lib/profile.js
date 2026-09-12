export const defaultClientProfile = {
  name: 'MoneyFlex Member',
  headline: 'Building wealth with clarity, structure, and confidence.',
  location: 'Nigeria',
  bio: 'I am building a healthier relationship with money and making more intentional financial decisions.',
  goals: 'Financial stability, Emergency readiness, Long-term wealth',
  shareInvestorProfile: true,
  shareInvestorKnowledge: true,
}

export function createPublicProfile(profile, riskProfile, investorKnowledge) {
  return {
    version: 2,
    name: profile.name.trim() || defaultClientProfile.name,
    headline: profile.headline.trim() || defaultClientProfile.headline,
    location: profile.location.trim(),
    bio: profile.bio.trim(),
    goals: profile.goals
      .split(',')
      .map((goal) => goal.trim())
      .filter(Boolean)
      .slice(0, 6),
    riskProfile: profile.shareInvestorProfile
      ? riskProfile?.result?.name ?? 'Assessment not completed'
      : null,
    investorProfile: profile.shareInvestorKnowledge
      ? investorKnowledge?.result?.name ?? 'Assessment not completed'
      : null,
  }
}

export function encodePublicProfile(profile) {
  const bytes = new TextEncoder().encode(JSON.stringify(profile))
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

export function decodePublicProfile(value) {
  try {
    const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const binary = atob(padded)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    const profile = JSON.parse(new TextDecoder().decode(bytes))

    if (![1, 2].includes(profile.version) || typeof profile.name !== 'string') return null
    return profile
  } catch {
    return null
  }
}

export function getShareUrl(profile) {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/profile?view=${encodePublicProfile(profile)}`
}

export function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'MF'
}
