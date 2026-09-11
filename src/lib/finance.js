export const storageKeys = {
  netWorth: 'moneyflex-net-worth',
  budget: 'moneyflex-budget',
  investments: 'moneyflex-investments',
  investorProfile: 'moneyflex-investor-profile',
  financialHealth: 'moneyflex-financial-health',
}

export function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function formatMoney(value, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'NGN' ? 0 : 2,
  }).format(Number(value) || 0)
}

export function parseNumberInput(value) {
  const cleaned = String(value ?? '').replaceAll(',', '').replace(/[^\d.]/g, '')
  const [whole = '', ...decimalParts] = cleaned.split('.')
  const decimal = decimalParts.join('').slice(0, 2)

  if (!decimalParts.length) return whole
  return `${whole || '0'}.${decimal}`
}

export function formatNumberInput(value) {
  const normalized = parseNumberInput(value)
  if (!normalized) return ''

  const [whole, decimal] = normalized.split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimal === undefined ? grouped : `${grouped}.${decimal}`
}

export function percent(value) {
  const numeric = Number(value) || 0
  return `${numeric >= 0 ? '+' : ''}${numeric.toFixed(1)}%`
}

export function toNumber(value) {
  return Number.parseFloat(String(value ?? '').replaceAll(',', '')) || 0
}
