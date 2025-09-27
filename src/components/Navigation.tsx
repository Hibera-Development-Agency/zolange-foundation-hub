import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Globe, Menu, X} from "lucide-react";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState("en");
    const location = useLocation();

    const navItems = [
        {href: "/", label: {en: "Home", fr: "Accueil"}},
        {href: "/about", label: {en: "About", fr: "À Propos"}},
        {href: "/projects", label: {en: "Projects", fr: "Projets"}},
        {href: "/team", label: {en: "Team", fr: "Équipe"}},
        {href: "/volunteer", label: {en: "Volunteer", fr: "Bénévole"}},
        {href: "/contact", label: {en: "Contact", fr: "Contact"}},
    ];

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "fr" : "en");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
                            <img src="/logo.jpeg" alt="Zolange Foundation Logo"/>
                        </div>
                        <span className="text-xl font-bold text-foreground">Zolange Foundation</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`transition-colors ${
                                    location.pathname === item.href
                                        ? "text-primary font-medium"
                                        : "text-foreground hover:text-primary"
                                }`}
                            >
                                {item.label[language as keyof typeof item.label]}
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleLanguage}
                            className="flex items-center space-x-2"
                        >
                            <Globe className="w-4 h-4"/>
                            <span>{language.toUpperCase()}</span>
                        </Button>
                        <Button variant="secondary" asChild>
                            <Link to="/donate">
                                {language === "en" ? "Donate" : "Faire un Don"}
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link to="/auth">
                                {language === "en" ? "Dashboard" : "Tableau de Bord"}
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-2 bg-background/95 backdrop-blur-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`block py-3 px-2 rounded-md transition-colors ${
                                    location.pathname === item.href
                                        ? "text-primary font-medium bg-primary/10"
                                        : "text-foreground hover:text-primary hover:bg-muted/50"
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label[language as keyof typeof item.label]}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleLanguage}
                                className="flex items-center justify-start space-x-2 w-full"
                            >
                                <Globe className="w-4 h-4"/>
                                <span>{language === "en" ? "Français" : "English"}</span>
                            </Button>
                            <Button variant="secondary" asChild className="w-full">
                                <Link to="/donate" onClick={() => setIsOpen(false)}>
                                    {language === "en" ? "Donate" : "Faire un Don"}
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full">
                                <Link to="/auth" onClick={() => setIsOpen(false)}>
                                    {language === "en" ? "Dashboard" : "Tableau de Bord"}
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;