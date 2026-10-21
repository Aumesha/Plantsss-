# 🌿 Plants - AI Crop Doctor & Krishi Advisor (AI ಬೆಳೆ ವೈದ್ಯ & ಕೃಷಿ ಸಲಹೆಗಾರ)

> **ಕನ್ನಡ ಮತ್ತು English:** Plantix-ಮಾದರಿಯ ಕೃಷಿ ರೋಗ ಪತ್ತೆ AI ಆಪ್, ಅಸಲಿ ಕೀಟನಾಶಕ/ಶಿಲೀಂಧ್ರನಾಶಕ ಔಷಧಿಗಳ ಫೋಟೋ, ಎಕರೆವಾರು ನಿಖರ ಡೋಸೇಜ್ ಲೆಕ್ಕಾಚಾರ, ಮತ್ತು ಸ್ಥಳೀಯ ನೇರ ಹವಾಮಾನ ವರದಿ.

---

## 📱 GitHub ನಲ್ಲಿ ಹಾಕಿ Android APK ಆಪ್ ಮಾಡಿಕೊಳ್ಳುವ ವಿಧಾನ (GitHub Actions Workflow)

ಈ ಪ್ರಾಜೆಕ್ಟ್‌ನಲ್ಲಿ GitHub Actions ಮೂಲಕ ಸ್ವಯಂಚಾಲಿತವಾಗಿ **Android APK** ಬಿಲ್ಡ್ ಆಗುವಂತೆ workflow ಫೈಲ್ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ (`.github/workflows/android-apk-build.yml`).

### ಹಂತ 1: GitHub ನಲ್ಲಿ ಹೊಸ Repository ರಚಿಸಿ ಮತ್ತು ಕೋಡ್ ಪುಶ್ ಮಾಡಿ
ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ನ ಟರ್ಮಿನಲ್‌ನಲ್ಲಿ ಕೆಳಗಿನ ಕಮಾಂಡ್‌ಗಳನ್ನು ರನ್ ಮಾಡಿ:

```bash
# 1. ಗಿಟ್ ಆರಂಭಿಸಿ
git init

# 2. ಎಲ್ಲಾ ಫೈಲ್‌ಗಳನ್ನು ಸೇರಿಸಿ
git add .

# 3. ಕಮಿಟ್ ಮಾಡಿ
git commit -m "Initial Plants App with GitHub Actions & Weather"

# 4. ನಿಮ್ಮ GitHub ರಿಪೋಸಿಟರಿ ಲಿಂಕ್ ಸೇರಿಸಿ (ನಿಮ್ಮ username ಮತ್ತು repo ಹೆಸರನ್ನು ಬದಲಾಯಿಸಿ)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# 5. ಮುಖ್ಯ ಬ್ರಾಂಚ್‌ಗೆ ಪುಶ್ ಮಾಡಿ
git branch -M main
git push -u origin main
```

### ಹಂತ 2: GitHub Actions ನಲ್ಲಿ APK ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳುವುದು
1. ನಿಮ್ಮ GitHub ರಿಪೋಸಿಟರಿ ಪೇಜಿಗೆ ಹೋಗಿ.
2. ಮೇಲಿನ ಮೆನುವಿನಲ್ಲಿ **Actions** ಟ್ಯಾಬ್ ಕ್ಲಿಕ್ ಮಾಡಿ.
3. ಅಲ್ಲಿ **"Build Android APK (Plants App)"** ಎಂಬ workflow ತಾನಾಗಿಯೇ ರನ್ ಆಗುವುದನ್ನು ಕಾಣಬಹುದು.
4. ಬಿಲ್ಡ್ ಮುಗಿದ ನಂತರ (ಹಸಿರು ಟಿಕ್ ಬಂದ ನಂತರ), ಆ ರನ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.
5. ಕೆಳಭಾಗದಲ್ಲಿರುವ **Artifacts** ಸೆಕ್ಷನ್‌ನಲ್ಲಿ **`Plants-CropDoctor-Android-APK`** ಎಂಬ ಜಿಪ್ ಫೈಲ್ ಇರುತ್ತದೆ.
6. ಅದನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಅನ್‌ಜಿಪ್ ಮಾಡಿದರೆ ನಿಮ್ಮ ಮೊಬೈಲ್‌ಗೆ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿಕೊಳ್ಳಬಹುದಾದ `.apk` ಫೈಲ್ ಸಿಗುತ್ತದೆ!

---

## ⛅ ಸ್ಥಳೀಯ ಹವಾಮಾನ ಪತ್ತೆ (Live Geolocation & Weather Radar)
ಈ ಆಪ್‌ನಲ್ಲಿ ನಿಮ್ಮ ನಿಖರ ಸ್ಥಳವನ್ನು (GPS Geolocation) ತಾನಾಗಿಯೇ ಗುರುತಿಸಿ, ಆ ಸ್ಥಳದ ಇತ್ತೀಚಿನ ಹವಾಮಾನವನ್ನು ಮುಖಪುಟದಲ್ಲಿ ಸಣ್ಣದಾಗಿ ತೋರಿಸಲಾಗುತ್ತದೆ:
- **ನೈಜ ತಾಪಮಾನ (°C)** & ಮೋಡ/ಮಳೆಯ ಸ್ಥಿತಿ
- **ತೇವಾಂಶ (Humidity)** & **ಗಾಳಿಯ ವೇಗ (Wind Speed)**
- **ಕೃಷಿ ಸಿಂಪಡಣೆ ಸಲಹೆ (Pest & Spray Advisory):** ಮಳೆ ಸಂಭವವಿದ್ದಾಗ ಅಥವಾ ತೇವಾಂಶ ಹೆಚ್ಚಿದ್ದಾಗ ಬೆಳೆ ರೋಗ ತಡೆಗಟ್ಟುವ ಮುನ್ನೆಚ್ಚರಿಕೆ ಸಂದೇಶ
- ಸ್ಥಳವನ್ನು ಮರುಪಡೆಯಲು (GPS Refresh) ಅಥವಾ ಕರ್ನಾಟಕದ ಯಾವುದೇ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಲು ಸುಲಭ ಅವಕಾಶ.

---

## 💻 ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ರನ್ ಮಾಡುವುದು (Local Development)

```bash
# 1. ಪ್ಯಾಕೇಜ್‌ಗಳನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ
npm install

# 2. ಡೆವಲಪ್‌ಮೆಂಟ್ ಸರ್ವರ್ ರನ್ ಮಾಡಿ (ಪೋರ್ಟ್ 3000)
npm run dev

# 3. ಪ್ರೊಡಕ್ಷನ್ ಬಿಲ್ಡ್
npm run build
```

---

## 📲 Capacitor ಮೂಲಕ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲೇ ನೇರ Android ಬಿಲ್ಡ್
```bash
# 1. ಬಿಲ್ಡ್ ಮಾಡಿ
npm run build

# 2. ಆಂಡ್ರಾಯ್ಡ್ ಸಿಂಕ್ ಮಾಡಿ
npx cap sync android

# 3. ಆಂಡ್ರಾಯ್ಡ್ ಸ್ಟುಡಿಯೋದಲ್ಲಿ ತೆರೆಯಿರಿ
npx cap open android
```
