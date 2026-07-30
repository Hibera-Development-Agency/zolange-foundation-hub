import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error: any) {
        toast({
          title: t("projects.toast.errorTitle"),
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const stats = [
    { number: "25,000+", label: t("projects.stats.livesImpacted") },
    { number: "12", label: t("projects.stats.countriesServed") },
    { number: "50+", label: t("projects.stats.activeProjects") },
    { number: "1,200+", label: t("projects.stats.volunteers") }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-hero-gradient text-white py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">
                            {t("projects.hero.title")}
                        </h1>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 sm:px-0">
                            {t("projects.hero.subtitle")}
                        </p>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">{t("projects.loading")}</p>
                          </div>
                        ) : projects.length === 0 ? (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">{t("projects.noProjects")}</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {projects.map((project) => (
                              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-video overflow-hidden">
                                  <img
                                    src={project.image_urls?.[0] || '/placeholder.svg'}
                                    alt={project.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <CardHeader>
                                  <div className="flex items-start justify-between">
                                    <CardTitle className="text-xl text-primary">
                                      {project.title}
                                    </CardTitle>
                                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                                      {project.status}
                                    </Badge>
                                  </div>
                                  <p className="text-muted-foreground text-sm">
                                    {project.location}
                                  </p>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-muted-foreground mb-4">
                                    {project.description}
                                  </p>
                                  <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">{t("projects.category")}</span>
                                      <Badge variant="outline">{project.category}</Badge>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">{t("projects.beneficiaries")}</span>
                                      <span className="font-medium">{project.beneficiaries}</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" className="w-full" asChild>
                                    <Link to={`/projects/${project.slug}`}>
                                      {t("projects.learnMore")}
                                    </Link>
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="py-12 sm:py-20 bg-muted">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">
                                {t("projects.impact.title")}
                            </h2>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                                {t("projects.impact.subtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* CTA Section */}
                <section className="py-12 sm:py-20 bg-donation-gradient text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">
                            {t("projects.cta.title")}
                        </h2>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
                            {t("projects.cta.subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
                            <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
                                <Link to="/donate">
                                    {t("projects.cta.donateBtn")}
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-secondary w-full sm:w-auto" asChild>
                                <Link to="/volunteer">
                                    {t("projects.cta.volunteerBtn")}
                                </Link>
                            </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
