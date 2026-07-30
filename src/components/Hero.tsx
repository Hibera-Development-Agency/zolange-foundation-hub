import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import {useLanguage} from "@/contexts/LanguageContext";

const Hero = () => {
    const {t} = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt={t("hero.imageAlt")}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"/>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
                        {t("hero.title.part1")}{" "}
                        <span className="text-secondary">
                        {t("hero.title.highlight")}</span>
                    </h1>

                    <div className="mt-12">
                        <Button
                            size="lg"
                            variant="secondary"
                            asChild
                            className="text-lg px-8 py-4 shadow-secondary"
                        >
                            <Link to="/donate">{t("common.donateNow")}</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
