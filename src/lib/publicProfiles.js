const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const publicProfilesConfigured = Boolean(supabaseUrl && publishableKey)

export function normalizeUsername(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 30)
}

export function validateUsername(value) {
  if (!value) return 'Choose a username to publish your profile.'
  if (!/^[a-z0-9][a-z0-9_-]{1,28}[a-z0-9]$/.test(value)) {
    return 'Use 3-30 lowercase letters, numbers, underscores, or hyphens.'
  }
  return ''
}

function getStoredTokens() {
  try {
    return JSON.parse(window.localStorage.getItem('moneyflex-profile-edit-tokens') ?? '{}')
  } catch {
    return {}
  }
}

function getEditToken(username) {
  const tokens = getStoredTokens()
  if (!tokens[username]) {
    const bytes = crypto.getRandomValues(new Uint8Array(32))
    tokens[username] = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
    window.localStorage.setItem('moneyflex-profile-edit-tokens', JSON.stringify(tokens))
  }
  return tokens[username]
}

async function callProfileRpc(name, body) {
  if (!publicProfilesConfigured) throw new Error('Public profile publishing is not configured yet.')

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.message === 'This username is already claimed.'
      ? 'That username has already been claimed. Please choose another one.'
      : data?.message || 'The public profile service could not complete this request.'
    throw new Error(message)
  }
  return data
}

export async function publishInvestorProfile(username, profile) {
  return callProfileRpc('publish_investor_profile', {
    p_username: username,
    p_edit_token: getEditToken(username),
    p_profile: profile,
  })
}

export async function fetchInvestorProfile(username) {
  return callProfileRpc('get_investor_profile', { p_username: username })
}

export async function checkUsernameAvailability(username) {
  const profile = await fetchInvestorProfile(username)
  return !profile
}
