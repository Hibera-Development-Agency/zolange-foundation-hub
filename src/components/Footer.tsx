import {Link} from "react-router-dom";
import {Facebook, Instagram, Linkedin, Mail, MapPin, Phone} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useLanguage} from "@/contexts/LanguageContext";

const Footer = () => {
    const {t} = useLanguage();

    const socialLinks = [
        {icon: Facebook, href: "https://www.facebook.com/profile.php?id=100064883794680", label: "Facebook"},
        {icon: Instagram, href: "https://www.instagram.com/zolangefoundation", label: "Instagram"},
        {icon: Linkedin, href: "https://www.linkedin.com/company/zolange-foundation/", label: "LinkedIn"},
    ];

    const quickLinks = [
        {href: "/about", labelKey: "footer.aboutUs"},
        {href: "/projects", labelKey: "nav.projects"},
        {href: "/team", labelKey: "nav.team"},
        {href: "/volunteer", labelKey: "nav.volunteer"},
        {href: "/contact", labelKey: "nav.contact"},
    ];

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Logo & Mission */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center">
                                <img src="/logo.jpeg" alt={t("common.logoAlt")}/>
                            </div>
                            <span className="text-xl font-bold">Zolange Foundation</span>
                        </div>
                        <p className="text-primary-foreground/80 mb-6 max-w-md">
                            {t("footer.mission")}
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
                        <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
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
                    className="border-t border-primary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    <p className="text-primary-foreground/60 text-sm">
                        {t("footer.rights")}
                    </p>
                    <p className="text-primary-foreground/60 text-sm mt-2 sm:mt-0">
                        {t("footer.builtWith")} <a href="https://hibera-agency.com">Hibera Agency</a> 💙
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;