export function Footer({ children }: any) {
    // return <footer className="self-end mt-auto px-16 py-4 text-center text-xl">{children}</footer>
    return <footer className="self-end px-16 py-4 text-center text-xl md:block hidden">{children}</footer>
}