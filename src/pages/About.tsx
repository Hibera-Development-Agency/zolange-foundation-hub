import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
                <section className="bg-hero-gradient text-white py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">{t("about.hero.title")}</h1>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 sm:px-0">
                            {t("about.hero.subtitle")}
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <Card className="shadow-primary">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-primary mb-6">{t("about.mission.title")}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t("about.mission.text")}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-secondary">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-secondary mb-6">{t("about.vision.title")}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t("about.vision.text")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

                {/* Values */}
                <section className="py-12 sm:py-20 bg-muted">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">{t("about.values.title")}</h2>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                                {t("about.values.subtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: t("about.values.love.title"),
                  description: t("about.values.love.description")
                },
                {
                  title: t("about.values.integrity.title"),
                  description: t("about.values.integrity.description")
                },
                {
                  title: t("about.values.community.title"),
                  description: t("about.values.community.description")
                }
              ].map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

                {/* History */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 sm:mb-8 px-2 sm:px-0">{t("about.story.title")}</h2>
                            <div className="prose prose-lg max-w-none text-muted-foreground px-2 sm:px-0">
                <p className="mb-6">
                  {t("about.story.p1")}
                </p>
                <p className="mb-6">
                  {t("about.story.p2")}
                </p>
                <p>
                  {t("about.story.p3")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
