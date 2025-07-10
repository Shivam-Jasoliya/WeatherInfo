# 🌤️ WeatherPro

**WeatherPro** is a modern React Native weather application that fetches real-time weather data using the OpenWeatherMap API. It delivers smooth animations, a clean interface, and accurate forecasts — all in one lightweight mobile app.

📦 **Repository**: [https://github.com/Shivam-Jasoliya/WeatherProApp.git](https://github.com/Shivam-Jasoliya/WeatherProApp.git)

---

## 🚀 Features

- Real-time weather updates by city name
- Sleek UI with weather-specific icon animations
- Cross-platform support (Android & iOS)
- Pull-to-refresh and error handling
- Modular architecture for better scalability

---

## 🛠️ Tech Stack

- React Native (Bare CLI or Expo)
- Context API for state management
- Axios for API communication
- React Navigation (Stack/Tab)
- OpenWeatherMap API
- Lottie or weather-based animations
- React-Native-Paper for styling

---

## 🧱 Architecture Overview

```
WeatherProApp/
├── src/
│   ├── api/               # API logic (Axios setup)
│   ├── components/        # Reusable UI components (e.g., WeatherCard, Loader)
│   ├── constants/         # Static constants and config values
│   ├── context/           # Context API setup for state management
│   ├── hooks/             # Custom hooks
│   ├── navigation/        # React Navigation stack & tab navigators
│   ├── screens/           # Screens (Home, Search, Details)
│   ├── services/          # Third-party integrations and helpers
│   ├── theme/             # Light/Dark theme configuration
│   ├── utils/     
├── package.json
└── README.md
```

**Design Decisions:**
- Clean separation of concerns (logic, UI, services)
- Scalable with Redux for global weather state
- Easy to replace API service or animation library
- Safe environment variables for API key handling

---

## ⚙️ Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/Shivam-Jasoliya/WeatherProApp.git
cd WeatherProApp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the App

#### For Android

```bash
npx react-native run-android
```

#### For iOS

```bash
npx react-native run-ios
```

#### Or using Expo

```bash
npx expo start
```

---

## 🔮 Future Improvements

- Weather by searched city name
- Show geolocation-based weather
- Hourly and weekly forecasts
- Offline caching for recent data
- Unit switching (°C/°F)
- Theme switching (Light/Dark)


---

## 👤 Author

**Shivam Jasoliya**  
🔗 [GitHub Profile](https://github.com/Shivam-Jasoliya)

---

## 📄 License

This project is open-sourced under the **MIT License**.  
You’re free to fork, contribute, or use it commercially with proper attribution.
