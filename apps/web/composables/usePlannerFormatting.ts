export function usePlannerFormatting() {
  function formatIntermediateValue(value: number | string): string {
    if (typeof value === 'string') {
      const match = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/)

      if (!match) {
        return value
      }

      const numericValue = Number(match[1])

      if (!Number.isFinite(numericValue)) {
        return value
      }

      return `${numericValue.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')}${match[2]}`
    }

    if (!Number.isFinite(value)) {
      return String(value)
    }

    return value.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')
  }

  return {
    formatIntermediateValue,
  }
}