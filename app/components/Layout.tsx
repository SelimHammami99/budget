const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <div className="flex flex-col flex-wrap items-center justify-center mt-[1rem] mb-[2rem] p-3 w-full max-w-[1240px]">
        {children}
      </div>
    </main>
  );
};
export default Layout;
