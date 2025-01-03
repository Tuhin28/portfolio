import { Inter, Unbounded, Outfit, Plus_Jakarta_Sans as PlusJakartaSans, IBM_Plex_Sans, Space_Grotesk, Crimson_Pro, Dela_Gothic_One } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const unbounded = Unbounded({ 
  subsets: ['latin'],
  variable: '--font-unbounded'
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit'
})

const plusJakartaSans = PlusJakartaSans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta'
})

const ibmPlexSans = IBM_Plex_Sans({ 
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-crimson-pro'
})

const delaGothicOne = Dela_Gothic_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dela-gothic-one'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${unbounded.variable} ${outfit.variable} ${plusJakartaSans.variable} ${ibmPlexSans.variable} ${spaceGrotesk.variable} ${crimsonPro.variable} ${delaGothicOne.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

