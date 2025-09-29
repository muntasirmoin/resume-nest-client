import { Button } from "@/components/ui/button";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
// import { Button } from "../ui/button";

const socialLinks = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/muntasirmoin" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muntasir-moin-chowdhury-baa948207/",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    href: "mailto:muntasirmoinchowdhury099@gmail.com",
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/muntasirmoin.chowdhury",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/muntasir_moin_chowdhury/",
  },
];

const Footer = () => {
  return (
    <footer
      className="text-gray-400 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 text-sm md:text-base"
      style={{
        background: `linear-gradient(
      135deg,
      rgba(8, 13, 32, 0.8),
      rgba(5, 8, 24, 0.9),
      rgba(23, 37, 84, 0.8)
    )`,
      }}
    >
      {/* Social Media Links - Left */}
      <div className="flex items-center gap-4">
        {socialLinks.map(({ icon: Icon, label, href }, idx) => (
          <Button
            key={idx}
            asChild
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
          >
            <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon className="w-5 h-5" />
            </a>
          </Button>
        ))}
      </div>

      {/* Copyright Text - Right */}
      <p className="text-center md:text-right text-white font-medium">
        © {new Date().getFullYear()} All rights reserved by{" "}
        <span className="text-blue-400">Muntasir Moin Chowdhury</span>
      </p>
    </footer>
  );
};

export default Footer;
