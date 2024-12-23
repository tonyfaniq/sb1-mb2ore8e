export function formatNumber(num: number = 0): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatLargeNumber(num: number = 0): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return formatNumber(num);
}

export function formatCurrency(amount: number = 0): string {
  if (amount >= 1e9) {
    return '$' + (amount / 1e9).toFixed(1) + 'B';
  }
  if (amount >= 1e6) {
    return '$' + (amount / 1e6).toFixed(1) + 'M';
  }
  if (amount >= 1e3) {
    return '$' + (amount / 1e3).toFixed(1) + 'K';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

export function formatPercent(value: number = 0): string {
  return value.toFixed(2) + '%';
}