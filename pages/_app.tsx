import type { AppProps } from "next/app"
import { ParallaxProvider } from "react-scroll-parallax"

function App({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  )
}
export default App
