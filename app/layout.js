import "./globals.css";
import { Toaster } from "sonner";
import SessionProviderWrapper from "../components/providers/SessionProviderWrapper";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
          <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}