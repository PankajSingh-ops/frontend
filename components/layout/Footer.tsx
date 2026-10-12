import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/content";
import { InstagramIcon, LinkedinIcon, YoutubeIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="relative bg-bg pt-20 md:pt-32 pb-10 overflow-hidden border-t border-line">
      {/* Giant Background Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-5 z-0">
        <h2 className="font-display text-[20vw] leading-none text-stroke text-transparent whitespace-nowrap">
          ANKUR
        </h2>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Col 1 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded bg-transparent">
              <Image src="/ankur logo.webp" alt="Ankur Chandrakant Logo" fill className="object-contain" sizes="40px" />
            </div>
            <span className="font-display text-xl tracking-wider">ANKUR CHANDRAKANT</span>
          </div>
          <p className="text-muted text-sm max-w-xs mt-2">
            Cybersecurity Expert · Digital Forensics · Social Entrepreneur
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Useful Links</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            <li><Link href="/#home" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/#about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            <li><Link href="/cyber-warrior" className="hover:text-primary transition-colors">Cyber Warrior</Link></li>
            <li><Link href="/media" className="hover:text-primary transition-colors">Media</Link></li>
            <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Help</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">T&C</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Sitemap</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Connect</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            <li><a href={LINKS.contact} className="hover:text-primary transition-colors">info@ankurchandrakant.com</a></li>
            <li className="mt-4 flex items-center gap-4">
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="Instagram"><InstagramIcon className="w-5 h-5" /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="LinkedIn"><LinkedinIcon className="w-5 h-5" /></a>
              <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="YouTube"><YoutubeIcon className="w-5 h-5" /></a>
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="Facebook"><FacebookIcon className="w-5 h-5" /></a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted">Copyright 2026 | AnkurChandrakant.com</p>
      </div>
    </footer>
  );
}
