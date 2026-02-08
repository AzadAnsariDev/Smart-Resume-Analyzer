const Footer = () => {
  return (
    <footer id="contact" className="relative z-20 mt-32 pb-20 ">
       
      <div className="flex flex-col items-center gap-8 text-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-white font-semibold">
            S
          </div>
          <span className="text-white text-lg font-medium tracking-tight">
            Smart Resume Analyzer
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#solutions" className="hover:text-white transition">Solutions</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=azadansaridev@gmail.com&su=Smart%20Resume%20Analyzer%20-%20Contact"
  target="_blank"
  rel="noreferrer"
 className="hover:text-white transition">Contact</a>
        </div>


        {/* Socials */}
        <div className="flex gap-6 text-gray-400 text-lg">
        <a href="https://github.com/azadansaridev/Smart-Resume-Analyzer" target="_blank"><span className="hover:text-white cursor-pointer transition">GitHub</span></a>
          <span className="hover:text-white cursor-pointer transition">Portfolio</span>
        <a href="https://www.notion.so/301b77866a24803b9410c8cf80c8b73e?source=copy_link" target="_blank"> <span className="hover:text-white cursor-pointer transition">Blog</span></a>
        </div>

        {/* Divider */}
        <div className="w-40 h-px bg-white/10 mt-6" />

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Smart Resume Analyzer · Built by Azad
        </p>

      </div>

    </footer>
  );
};

export default Footer;
