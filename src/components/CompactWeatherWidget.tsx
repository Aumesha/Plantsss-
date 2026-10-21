import React, { useState } from 'react';
import {
  MapPin,
  RefreshCw,
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  AlertTriangle,
  ChevronDown,
  Navigation,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { WeatherInfo, Language } from '../types/plants';
import { KARNATAKA_DISTRICTS, DistrictLocation } from '../utils/weatherService';

interface CompactWeatherWidgetProps {
  language: Language;
  weather: WeatherInfo;
  isLoading: boolean;
  onRefreshLocation: () => void;
  onSelectDistrict: (district: DistrictLocation) => void;
}

export const CompactWeatherWidget: React.FC<CompactWeatherWidgetProps> = ({
  language,
  weather,
  isLoading,
  onRefreshLocation,
  onSelectDistrict,
}) => {
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);

  // Choose appropriate weather icon based on condition & code
  const getWeatherIcon = () => {
    const code = weather.weatherCode ?? 2;
    if (code === 0) return <Sun className="w-6 h-6 text-amber-500 animate-spin-slow" />;
    if (code === 1 || code === 2) return <CloudSun className="w-6 h-6 text-amber-500" />;
    if (code === 3 || code === 45 || code === 48) return <Cloud className="w-6 h-6 text-slate-500" />;
    if (code >= 95) return <CloudLightning className="w-6 h-6 text-amber-600 animate-pulse" />;
    if (code >= 51) return <CloudRain className="w-6 h-6 text-blue-500" />;
    return <CloudSun className="w-6 h-6 text-amber-500" />;
  };

  return (
    <div className="relative bg-gradient-to-br from-emerald-50/90 via-white to-sky-50/70 rounded-2xl border border-emerald-200/90 shadow-sm p-3.5 sm:p-4 transition-all hover:shadow-md">
      {/* Top row: Location bar with live indicator & refresh button */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-emerald-100/80">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-emerald-700" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                {weather.location}
              </span>
              {weather.isLiveLocation ? (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  {language === 'kn' ? 'ಲೈವ್ ಸ್ಥಳ' : 'Live GPS'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {language === 'kn' ? 'ಆಯ್ಕೆ ಸ್ಥಳ' : 'Selected'}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              {language === 'kn' ? 'ಸ್ಥಳೀಯ ಹವಾಮಾನ ವರದಿ' : 'Current Agro-Weather'}
              {weather.lastUpdated && ` • ${weather.lastUpdated}`}
            </p>
          </div>
        </div>

        {/* Location Actions: Refresh GPS & District Dropdown */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowDistrictPicker(!showDistrictPicker)}
            className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-emerald-50 text-slate-700 rounded-lg border border-slate-200 text-[11px] font-semibold transition-colors shadow-2xs"
            title={language === 'kn' ? 'ಬೇರೆ ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ' : 'Change District'}
          >
            <span>{language === 'kn' ? 'ಜಿಲ್ಲೆ' : 'District'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button
            onClick={onRefreshLocation}
            disabled={isLoading}
            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shadow-xs active:scale-95 disabled:opacity-50"
            title={language === 'kn' ? 'ಸ್ಥಳ ಮತ್ತು ಹವಾಮಾನ ಮರುಪಡೆಯಿರಿ' : 'Refresh GPS & Weather'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main weather info: Temperature, condition icon, mini metrics */}
      <div className="pt-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Temp and weather condition */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-xs flex items-center justify-center">
            {getWeatherIcon()}
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {weather.temp}°C
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-800">
                {language === 'kn' ? weather.conditionKn : weather.conditionEn}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {language === 'kn' ? 'ಸ್ಥಳೀಯ ಉಷ್ಣಾಂಶ' : 'Local temperature'}
            </p>
          </div>
        </div>

        {/* Right: Quick Agro-metrics (Humidity, Wind, Rain probability) */}
        <div className="flex items-center gap-2 text-xs">
          {/* Humidity pill */}
          <div className="flex items-center gap-1 bg-white/90 px-2.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">
                {language === 'kn' ? 'ತೇವಾಂಶ' : 'Humidity'}
              </p>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {weather.humidity}%
              </p>
            </div>
          </div>

          {/* Wind pill */}
          <div className="flex items-center gap-1 bg-white/90 px-2.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <Wind className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">
                {language === 'kn' ? 'ಗಾಳಿ' : 'Wind'}
              </p>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {weather.windSpeedKmH} km/h
              </p>
            </div>
          </div>

          {/* Rain chance pill */}
          <div className="flex items-center gap-1 bg-white/90 px-2.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">
                {language === 'kn' ? 'ಮಳೆ ಸಂಭವ' : 'Rain'}
              </p>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {weather.rainChance}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Advice Strip: Farm Spraying & Disease advisory */}
      {(weather.sprayAdviceKn || weather.pestRiskWarningKn) && (
        <div className="mt-2.5 pt-2 border-t border-emerald-100/60 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-900 font-semibold min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">
              {language === 'kn'
                ? `ಕೃಷಿ ಸಲಹೆ: ${weather.sprayAdviceKn || weather.pestRiskWarningKn}`
                : `Agro Tip: ${weather.sprayAdviceEn || weather.pestRiskWarningEn}`}
            </span>
          </div>

          <span
            className={`shrink-0 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
              weather.pestRiskLevel === 'High'
                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                : weather.pestRiskLevel === 'Medium'
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            {language === 'kn'
              ? `ರೋಗ ಅಪಾಯ: ${weather.pestRiskLevel === 'High' ? 'ಹೆಚ್ಚು' : weather.pestRiskLevel === 'Medium' ? 'ಮಧ್ಯಮ' : 'ಕಡಿಮೆ'}`
              : `Risk: ${weather.pestRiskLevel}`}
          </span>
        </div>
      )}

      {/* District Picker Popup / Modal */}
      {showDistrictPicker && (
        <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-slate-800">
              {language === 'kn' ? 'ಕರ್ನಾಟಕದ ಜಿಲ್ಲೆಗಳು' : 'Select Karnataka District'}
            </span>
            <button
              onClick={() => setShowDistrictPicker(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {KARNATAKA_DISTRICTS.map((dist) => (
              <button
                key={dist.id}
                onClick={() => {
                  onSelectDistrict(dist);
                  setShowDistrictPicker(false);
                }}
                className="text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition-colors flex items-center justify-between"
              >
                <span className="font-medium">
                  {language === 'kn' ? dist.nameKn : dist.nameEn}
                </span>
                <span className="text-[10px] text-slate-400">
                  {language === 'kn' ? dist.nameEn : dist.nameKn}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
