import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import dynamic from "next/dynamic";
const PediFooter = dynamic(() => import("../components/PediFooter/PediFooter"), { ssr: false });
const PediNavbar = dynamic(() => import("../components/PediNavbar/PediNavbar"), { ssr: false });
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pediatra Cuernavaca",
  description: "Dra. Martha Iris Ocampo - Pediatra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
        <ReduxProvider>
          <PediNavbar />
        {children}
        <PediFooter />
        </ReduxProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
        </body>
    </html>
  );
}
