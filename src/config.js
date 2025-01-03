const getEnvVar = (key, defaultValue = undefined) => {
  const value = import.meta.env[key];

  if (value === undefined || value === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return value;
};

const config = {
  appMode: getEnvVar("VITE_APP_MODE", "development"),
  backendURL: getEnvVar("VITE_BACKEND_URL"),
  supabaseURL: getEnvVar("VITE_SUPABASE_URL"),
  supabaseAnonKey: getEnvVar("VITE_SUPABASE_ANON_KEY"),
};

console.log("App mode: ", config.appMode);

export default config;
