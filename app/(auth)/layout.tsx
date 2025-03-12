


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return<main className="bg-slate-100 flex justify-center items-center h-screen w-screen">
        {children}
    </main>
  }