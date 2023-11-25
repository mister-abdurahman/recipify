export function Footer({ children }: any) {
  // return <footer className="self-end mt-auto px-16 py-4 text-center text-xl">{children}</footer>
  return (
    <footer className="self-end px-6 py-4 text-gray-500 text-center text-xs md:block hidden">
      {children}
    </footer>
  );
}
