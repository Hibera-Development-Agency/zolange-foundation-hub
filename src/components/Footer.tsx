import {Link} from "react-router-dom";
import {Facebook, Instagram, Linkedin, Mail, MapPin, Phone} from "lucide-react";
import {Button} from "@/components/ui/button";

const Footer = () => {
    const socialLinks = [
        {icon: Facebook, href: "https://www.facebook.com/profile.php?id=100064883794680", label: "Facebook"},
        {icon: Instagram, href: "https://www.instagram.com/zolangefoundation", label: "Instagram"},
        {icon: Linkedin, href: "https://www.linkedin.com/company/zolange-foundation/", label: "LinkedIn"},
    ];

    const quickLinks = [
        {href: "/about", label: "About Us"},
        {href: "/projects", label: "Projects"},
        {href: "/team", label: "Team"},
        {href: "/volunteer", label: "Volunteer"},
        {href: "/contact", label: "Contact"},
    ];

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Mission */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center">
                                <img src="/logo.jpeg" alt="Zolange Foundation Logo"/>
                            </div>
                            <span className="text-xl font-bold">Zolange Foundation</span>
                        </div>
                        <p className="text-primary-foreground/80 mb-6 max-w-md">
                            The Zolange Foundation is empowering lives worldwide through hope and the love of
                            Jesus Christ, creating profound differences in communities regardless of backgrounds or
                            ages.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map(({icon: Icon, href, label}) => (
                                <Button
                                    key={label}
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10"
                                >
                                    <a href={href} aria-label={label}>
                                        <Icon className="w-5 h-5"/>
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-secondary"/>
                                <span className="text-primary-foreground/80 text-sm">Almere, The netherlands</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-secondary"/>
                                <a href="tel:+31 6 12345678">
                                    <span className="text-primary-foreground/80 text-sm">+31 6 12345678</span>
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-secondary"/>
                                <a href="mailto:zolangefoundation@gmail.com">
                                    <span
                                        className="text-primary-foreground/80 text-sm">zolangefoundation@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-primary-foreground/60 text-sm">
                        © 2025 Zolange Foundation. All rights reserved.
                    </p>
                    <p className="text-primary-foreground/60 text-sm mt-2 md:mt-0">
                        Built with love for the community by <a href="https://hibera-agency.com">Hibera Agency</a> 💙
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;