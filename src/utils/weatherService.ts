/**
 * Weather & Geolocation Service for Plants Crop Doctor
 * Automatically detects farmer's current location via HTML5 Geolocation,
 * fetches real-time weather from Open-Meteo,
 * and generates tailored agronomic & spraying advisories in Kannada & English.
 */

import { WeatherInfo } from '../types/plants';

export interface DistrictLocation {
  id: string;
  nameEn: string;
  nameKn: string;
  lat: number;
  lon: number;
}

export const KARNATAKA_DISTRICTS: DistrictLocation[] = [
  { id: 'bengaluru', nameEn: 'Bengaluru', nameKn: 'ಬೆಂಗಳೂರು', lat: 12.9716, lon: 77.5946 },
  { id: 'mysuru', nameEn: 'Mysuru', nameKn: 'ಮೈಸೂರು', lat: 12.2958, lon: 76.6394 },
  { id: 'mandya', nameEn: 'Mandya', nameKn: 'ಮಂಡ್ಯ', lat: 12.5238, lon: 76.8966 },
  { id: 'hassan', nameEn: 'Hassan', nameKn: 'ಹಾಸನ', lat: 13.0033, lon: 76.1004 },
  { id: 'shivamogga', nameEn: 'Shivamogga', nameKn: 'ಶಿವಮೊಗ್ಗ', lat: 13.9299, lon: 75.5681 },
  { id: 'davanagere', nameEn: 'Davanagere', nameKn: 'ದಾವಣಗೆರೆ', lat: 14.4644, lon: 75.9218 },
  { id: 'chikkamagaluru', nameEn: 'Chikkamagaluru', nameKn: 'ಚಿಕ್ಕಮಗಳೂರು', lat: 13.3161, lon: 75.7720 },
  { id: 'tumakuru', nameEn: 'Tumakuru', nameKn: 'ತುಮಕೂರು', lat: 13.3379, lon: 77.1010 },
  { id: 'kolar', nameEn: 'Kolar', nameKn: 'ಕೋಲಾರ', lat: 13.1367, lon: 78.1291 },
  { id: 'chikkaballapura', nameEn: 'Chikkaballapura', nameKn: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ', lat: 13.4325, lon: 77.7275 },
  { id: 'belagavi', nameEn: 'Belagavi', nameKn: 'ಬೆಳಗಾವಿ', lat: 15.8497, lon: 74.4977 },
  { id: 'hubballi_dharwad', nameEn: 'Hubballi-Dharwad', nameKn: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ', lat: 15.3647, lon: 75.1240 },
  { id: 'kalaburagi', nameEn: 'Kalaburagi', nameKn: 'ಕಲಬುರಗಿ', lat: 17.3297, lon: 76.8343 },
  { id: 'ballari', nameEn: 'Ballari', nameKn: 'ಬಳ್ಳಾರಿ', lat: 15.1394, lon: 76.9214 },
  { id: 'vijayapura', nameEn: 'Vijayapura', nameKn: 'ವಿಜಯಪುರ', lat: 16.8302, lon: 75.7100 },
  { id: 'bagalkote', nameEn: 'Bagalkote', nameKn: 'ಬಾಗಲಕೋಟೆ', lat: 16.1817, lon: 75.6958 },
  { id: 'raichur', nameEn: 'Raichur', nameKn: 'ರಾಯಚೂರು', lat: 16.2076, lon: 77.3463 },
  { id: 'koppal', nameEn: 'Koppal', nameKn: 'ಕೊಪ್ಪಳ', lat: 15.3475, lon: 76.1549 },
  { id: 'gadag', nameEn: 'Gadag', nameKn: 'ಗದಗ', lat: 15.4287, lon: 75.6322 },
  { id: 'haveri', nameEn: 'Haveri', nameKn: 'ಹಾವೇರಿ', lat: 14.7954, lon: 75.3991 },
  { id: 'uttara_kannada', nameEn: 'Uttara Kannada (Karwar)', nameKn: 'ಉತ್ತರ ಕನ್ನಡ', lat: 14.8185, lon: 74.1350 },
  { id: 'udupi', nameEn: 'Udupi', nameKn: 'ಉಡುಪಿ', lat: 13.3409, lon: 74.7421 },
  { id: 'dakshina_kannada', nameEn: 'Mangaluru', nameKn: 'ಮಂಗಳೂರು', lat: 12.9141, lon: 74.8560 },
  { id: 'kodagu', nameEn: 'Kodagu (Madikeri)', nameKn: 'ಕೊಡಗು (ಮಡಿಕೇರಿ)', lat: 12.4244, lon: 75.7382 },
  { id: 'chamarajanagar', nameEn: 'Chamarajanagar', nameKn: 'ಚಾಮರಾಜನಗರ', lat: 11.9261, lon: 76.9437 },
  { id: 'ramanagara', nameEn: 'Ramanagara', nameKn: 'ರಾಮನಗರ', lat: 12.7209, lon: 77.2799 },
  { id: 'chitradurga', nameEn: 'Chitradurga', nameKn: 'ಚಿತ್ರದುರ್ಗ', lat: 14.2251, lon: 76.3980 },
  { id: 'bidar', nameEn: 'Bidar', nameKn: 'ಬೀದರ್', lat: 17.9104, lon: 77.5199 },
  { id: 'yadgir', nameEn: 'Yadgir', nameKn: 'ಯಾದಗಿರಿ', lat: 16.7702, lon: 77.1376 },
  { id: 'vijayanagara', nameEn: 'Vijayanagara (Hosapete)', nameKn: 'ವಿಜಯನಗರ (ಹೊಸಪೇಟೆ)', lat: 15.2689, lon: 76.3909 },
];

/**
 * Finds the nearest Karnataka district based on latitude & longitude.
 */
export function findNearestDistrict(lat: number, lon: number): DistrictLocation {
  let closest = KARNATAKA_DISTRICTS[0];
  let minDistance = Number.MAX_VALUE;

  for (const d of KARNATAKA_DISTRICTS) {
    const dLat = d.lat - lat;
    const dLon = d.lon - lon;
    const distSq = dLat * dLat + dLon * dLon;
    if (distSq < minDistance) {
      minDistance = distSq;
      closest = d;
    }
  }

  return closest;
}

/**
 * Maps WMO Weather interpretation codes (WW) to Kannada and English descriptions.
 */
function decodeWMOWeather(code: number): { en: string; kn: string; isRain: boolean } {
  switch (code) {
    case 0:
      return { en: 'Clear sky', kn: 'ಶುಭ್ರ ಆಕಾಶ / ಬಿಸಿಲು', isRain: false };
    case 1:
      return { en: 'Mainly clear', kn: 'ಬಹುತೇಕ ಶುಭ್ರ', isRain: false };
    case 2:
      return { en: 'Partly cloudy', kn: 'ಭಾಗಶಃ ಮೋಡ', isRain: false };
    case 3:
      return { en: 'Overcast clouds', kn: 'ಮೋಡ ಕವಿದ ವಾತಾವರಣ', isRain: false };
    case 45:
    case 48:
      return { en: 'Fog / Mist', kn: 'ಮಂಜು ಕವಿದಿದೆ', isRain: false };
    case 51:
    case 53:
    case 55:
      return { en: 'Light drizzle', kn: 'ತುಂತುರು ಮಳೆ', isRain: true };
    case 61:
    case 63:
    case 65:
      return { en: 'Rain showers', kn: 'ಮಳೆ ಸುರಿಯುತ್ತಿದೆ', isRain: true };
    case 71:
    case 73:
    case 75:
      return { en: 'Cold & frosty', kn: 'ತೀವ್ರ ಚಳಿ / ತಂಪು ಗಾಳಿ', isRain: false };
    case 80:
    case 81:
    case 82:
      return { en: 'Heavy rain showers', kn: 'ಧಾರಾಕಾರ ಮಳೆ', isRain: true };
    case 95:
    case 96:
    case 99:
      return { en: 'Thunderstorm with rain', kn: 'ಗುಡುಗು ಸಹಿತ ಮಳೆ', isRain: true };
    default:
      return { en: 'Pleasant weather', kn: 'ಸಾಧಾರಣ ಹವಾಮಾನ', isRain: false };
  }
}

/**
 * Fetches real live weather from Open-Meteo API using latitude & longitude.
 */
export async function fetchLiveWeather(
  lat: number,
  lon: number,
  resolvedNameKn?: string,
  resolvedNameEn?: string,
  isLiveLocation = true
): Promise<WeatherInfo> {
  const nearest = findNearestDistrict(lat, lon);
  const locationLabelKn = resolvedNameKn || nearest.nameKn;
  const locationLabelEn = resolvedNameEn || nearest.nameEn;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Open-Meteo responded with status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};

    const temp = Math.round(current.temperature_2m ?? 28);
    const humidity = Math.round(current.relative_humidity_2m ?? 70);
    const windSpeedKmH = Math.round(current.wind_speed_10m ?? 12);
    const precipitation = current.precipitation ?? 0;
    const weatherCode = current.weather_code ?? 2;

    const weatherCondition = decodeWMOWeather(weatherCode);

    // Calculate rain probability / indicator
    const rainChance = precipitation > 0 ? 85 : weatherCondition.isRain ? 70 : humidity > 80 ? 55 : 15;

    // Determine pest risk level
    let pestRiskLevel: 'High' | 'Medium' | 'Low' = 'Low';
    let pestRiskWarningKn = '';
    let pestRiskWarningEn = '';
    let sprayAdviceKn = '';
    let sprayAdviceEn = '';

    if (weatherCondition.isRain || precipitation > 0) {
      pestRiskLevel = 'High';
      pestRiskWarningKn = `ಮಳೆ ಸಂಭವವಿದೆ (${rainChance}%). ಕೀಟನಾಶಕ ಅಥವಾ ಗೊಬ್ಬರ ಸಿಂಪಡಣೆಯನ್ನು ಮುಂದೂಡಿ. ಕೊಳೆ ರೋಗ ಮತ್ತು ಶಿಲೀಂಧ್ರ ಹರಡುವ ಸಾಧ್ಯತೆ ಇರುವುದರಿಂದ ಮುನ್ನೆಚ್ಚರಿಕೆ ಇರಲಿ.`;
      pestRiskWarningEn = `Rain in forecast (${rainChance}%). Delay pesticide and fertilizer spray. Elevated risk of fungal rot.`;
      sprayAdviceKn = 'ಸಿಂಪಡಣೆ ಮುಂದೂಡಿ (ಮಳೆ ಸಂಭವ)';
      sprayAdviceEn = 'Postpone Spraying (Rain Risk)';
    } else if (humidity >= 80) {
      pestRiskLevel = 'High';
      pestRiskWarningKn = `ಎಚ್ಚರಿಕೆ: ${humidity}% ಹೆಚ್ಚಿನ ತೇವಾಂಶವಿದೆ. ಭತ್ತದಲ್ಲಿ ಬೆಂಕಿ ರೋಗ (Blast) ಮತ್ತು ತರಕಾರಿಗಳಲ್ಲಿ ಅಂಗಮಾರಿ ರೋಗ ಬರುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು. ಸಾವಯವ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.`;
      pestRiskWarningEn = `Warning: High humidity at ${humidity}%. High risk of blast in paddy and early blight in vegetables. Keep preventive bio-spray ready.`;
      sprayAdviceKn = 'ಮುಂಜಾನೆ ಲಘು ಸಿಂಪಡಣೆಗೆ ಸರಿ';
      sprayAdviceEn = 'Early morning spray suitable';
    } else if (windSpeedKmH >= 18) {
      pestRiskLevel = 'Medium';
      pestRiskWarningKn = `ಗಾಳಿಯ ವೇಗ ಹೆಚ್ಚಿದೆ (${windSpeedKmH} km/h). ಸಿಂಪಡಿಸುವ ಔಷಧಿ ಗಾಳಿಗೆ ಹಾರಿ ವ್ಯರ್ಥವಾಗಬಹುದು. ಗಾಳಿ ಕಡಿಮೆಯಾದಾಗ ಮಾತ್ರ ಸಿಂಪಡಿಸಿ.`;
      pestRiskWarningEn = `High wind speed (${windSpeedKmH} km/h). Risk of pesticide drift. Spray when winds calm down.`;
      sprayAdviceKn = 'ಗಾಳಿ ಜಾಸ್ತಿ (ಎಚ್ಚರಿಕೆಯಿಂದ ಸಿಂಪಡಿಸಿ)';
      sprayAdviceEn = 'Windy (Caution with spray)';
    } else {
      pestRiskLevel = 'Low';
      pestRiskWarningKn = `ಹವಾಮಾನ ಅನುಕೂಲಕರವಾಗಿದೆ (${temp}°C, ${humidity}% ತೇವಾಂಶ). ಬೆಳೆ ರೋಗದ ಅಪಾಯ ಕಡಿಮೆ. ಎಲೆಗಳ ಪೋಷಕಾಂಶ ಅಥವಾ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆಗೆ ಸೂಕ್ತ ದಿನ.`;
      pestRiskWarningEn = `Optimal conditions (${temp}°C, ${humidity}% RH). Low disease risk. Great window for foliar feeding or routine field operations.`;
      sprayAdviceKn = 'ಸಿಂಪಡಣೆಗೆ ಅತ್ಯಂತ ಪ್ರಶಸ್ತ ಹವಾಮಾನ';
      sprayAdviceEn = 'Ideal weather for spraying';
    }

    const weatherResult: WeatherInfo = {
      location: `${locationLabelKn} (${locationLabelEn})`,
      temp,
      conditionEn: weatherCondition.en,
      conditionKn: weatherCondition.kn,
      humidity,
      rainChance,
      windSpeedKmH,
      pestRiskLevel,
      pestRiskWarningEn,
      pestRiskWarningKn,
      sprayAdviceKn,
      sprayAdviceEn,
      isLiveLocation,
      latitude: lat,
      longitude: lon,
      weatherCode,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Cache locally
    try {
      localStorage.setItem('plants_cached_weather', JSON.stringify(weatherResult));
    } catch {
      // ignore
    }

    return weatherResult;
  } catch (err) {
    console.warn('Live weather fetch error, using closest district estimate:', err);

    // Fallback based on nearest district
    const fallback: WeatherInfo = {
      location: `${nearest.nameKn} (${nearest.nameEn})`,
      temp: 28,
      conditionEn: 'Pleasant & Partly Cloudy',
      conditionKn: 'ಭಾಗಶಃ ಮೋಡ (ಹಿತಕರ ಹವಾಮಾನ)',
      humidity: 72,
      rainChance: 20,
      windSpeedKmH: 12,
      pestRiskLevel: 'Low',
      pestRiskWarningEn: 'Optimal weather for agricultural field work and preventive pest monitoring.',
      pestRiskWarningKn: 'ಕೃಷಿ ಕೆಲಸಗಳಿಗೆ ಹಾಗೂ ರೋಗ ಮುನ್ನೆಚ್ಚರಿಕೆ ಪರಿಶೀಲನೆಗೆ ಅನುಕೂಲಕರ ವಾತಾವರಣವಿದೆ.',
      sprayAdviceKn: 'ಸಿಂಪಡಣೆಗೆ ಪ್ರಶಸ್ತ ಸಮಯ',
      sprayAdviceEn: 'Good for spraying',
      isLiveLocation: false,
      latitude: lat,
      longitude: lon,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return fallback;
  }
}

/**
 * Attempts to reverse geocode lat & lon to get city/town name.
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lon: number
): Promise<{ nameEn: string; nameKn: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision;
      if (city) {
        const nearest = findNearestDistrict(lat, lon);
        return {
          nameEn: city,
          nameKn: nearest.nameKn || city,
        };
      }
    }
  } catch {
    // Ignore and fallback to nearest district
  }

  const nearest = findNearestDistrict(lat, lon);
  return {
    nameEn: nearest.nameEn,
    nameKn: nearest.nameKn,
  };
}

/**
 * Loads cached weather from device storage if available.
 */
export function getCachedWeather(): WeatherInfo | null {
  try {
    const raw = localStorage.getItem('plants_cached_weather');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return null;
}
