import './globals.css'

export const metadata = {
  title: 'Hypatia',
  description: 'Boosting Productivity with Language AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
