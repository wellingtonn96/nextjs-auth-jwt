import "tailwindcss/tailwind.css";
import { AuthProvider } from "../context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
