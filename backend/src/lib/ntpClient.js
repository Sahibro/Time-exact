import Sntp from 'sntp';

const defaultOptions = { host: 'time.google.com', port: 123, resolveReference: true, timeout: 2000 };

export async function getAccurateTime() {
  try {
    const time = await Sntp.time(defaultOptions);
    const iso = new Date(time.t).toISOString();
    const epochMs = Math.floor(time.t);
    const accuracyMs = Math.max(1, Math.round(Math.abs(time.t - Date.now())));
    return { iso, epochMs, accuracyMs, source: 'ntp' };
  } catch (err) {
    // simple fallback: use local clock if NTP fails (mark lower accuracy)
    const now = Date.now();
    return { iso: new Date(now).toISOString(), epochMs: now, accuracyMs: 500, source: 'local-fallback' };
  }
}
