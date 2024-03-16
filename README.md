# ClearView Horizons

Welcome to **ClearView Horizons**, the straightforward and sleek weather app designed for those who prefer a clean, ad-free experience and value quick loading times alongside essential weather information.

## Live Site

https://weather-app-zeta-sage.vercel.app/

## Getting Started

To use **ClearView Horizons**, you'll first need to secure an API key from OpenWeatherMap, which allows the app to fetch the latest weather data. Follow these steps to get everything set up:

### Step 1: Obtain an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/) and create a free account if you haven't already. You can [sign up here](https://home.openweathermap.org/users/sign_up).
2. If you already have an account, simply [log in](https://home.openweathermap.org/users/sign_in).
3. Once logged in, navigate to the [API keys section](https://home.openweathermap.org/api_keys) and create a new API key for your application.

### Step 2: Configure Your Application

1. Copy the newly created API key.
2. Find the `.env.example` file in the root directory of your application.
3. Paste your API key into this file where specified.
4. Rename the file from `.env.example` to `.env`. This ensures your API key is utilized by the application and kept secure.

### Step 3: Run the Application Locally

With your API key configured, you're ready to launch the app locally. Execute the following commands in your terminal:

```bash
npm install    # Installs the necessary packages
npm run dev    # Runs the application in development mode
```