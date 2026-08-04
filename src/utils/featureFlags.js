const FLAGS_KEY = 'waai_feature_flags';

/**
 * Feature flags stored in localStorage for developer convenience.
 * In production, these should come from backend or remote config.
 */

export function setFeatureFlags(obj) {
  try {
    localStorage.setItem(FLAGS_KEY, JSON.stringify(obj));
  } catch {}
}

export function getFeatureFlags() {
  try {
    const v = localStorage.getItem(FLAGS_KEY);
    return v ? JSON.parse(v) : {};
  } catch {
    return {};
  }
}

export function isFeatureEnabled(key) {
  const flags = getFeatureFlags();
  return Boolean(flags[key]);
}
