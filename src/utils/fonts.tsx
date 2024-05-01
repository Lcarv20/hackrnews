import {
  Chakra_Petch,
  Josefin_Sans,
  Silkscreen,
  Space_Grotesk,
  Tourney,
  Outfit,
  Inter,
} from "next/font/google";

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// logo
export const tourney = Tourney({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-tourney",
});

// Titles
export const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra-petch",
});

// body
export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

// Buttons, options and etc
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const silkScreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silk-screen",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})
