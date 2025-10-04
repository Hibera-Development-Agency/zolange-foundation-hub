import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [language] = useState("en");
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
          title: "Error loading projects",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const content = {
    hero: {
      title: { en: "Our Projects", fr: "Nos Projets" },
      subtitle: { en: "Discover the impactful work we're doing in communities around the world.", fr: "Découvrez le travail d'impact que nous faisons dans les communautés du monde entier." }
    },
    impact: {
      title: { en: "Our Impact", fr: "Notre Impact" },
      subtitle: { en: "Together, we're making a real difference in communities around the world.", fr: "Ensemble, nous faisons une vraie différence dans les communautés du monde entier." }
    },
    stats: [
      { number: "25,000+", label: { en: "Lives Impacted", fr: "Vies Impactées" } },
      { number: "12", label: { en: "Countries Served", fr: "Pays Desservis" } },
      { number: "50+", label: { en: "Active Projects", fr: "Projets Actifs" } },
      { number: "1,200+", label: { en: "Volunteers", fr: "Bénévoles" } }
    ],
    cta: {
      title: { en: "Join Our Mission", fr: "Rejoignez Notre Mission" },
      subtitle: { en: "Every contribution helps us expand our reach and deepen our impact in communities worldwide.", fr: "Chaque contribution nous aide à élargir notre portée et à approfondir notre impact dans les communautés du monde entier." },
      donateBtn: { en: "Donate Now", fr: "Faire un Don" },
      volunteerBtn: { en: "Become a Volunteer", fr: "Devenir Bénévole" }
    },
    learnMore: { en: "Learn More", fr: "En Savoir Plus" },
    category: { en: "Category:", fr: "Catégorie:" },
    beneficiaries: { en: "Beneficiaries:", fr: "Bénéficiaires:" }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-hero-gradient text-white py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">
                            {content.hero.title[language as keyof typeof content.hero.title]}
                        </h1>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 sm:px-0">
                            {content.hero.subtitle[language as keyof typeof content.hero.subtitle]}
                        </p>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">Loading projects...</p>
                          </div>
                        ) : projects.length === 0 ? (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">No projects available yet.</p>
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
                                      <span className="text-muted-foreground">Category:</span>
                                      <Badge variant="outline">{project.category}</Badge>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Beneficiaries:</span>
                                      <span className="font-medium">{project.beneficiaries}</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" className="w-full" asChild>
                                    <Link to={`/projects/${project.slug}`}>
                                      Learn More
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
                                {content.impact.title[language as keyof typeof content.impact.title]}
                            </h2>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                                {content.impact.subtitle[language as keyof typeof content.impact.subtitle]}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">
                    {stat.label[language as keyof typeof stat.label]}
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
                            {content.cta.title[language as keyof typeof content.cta.title]}
                        </h2>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
                            {content.cta.subtitle[language as keyof typeof content.cta.subtitle]}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
                            <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
                                <Link to="/donate">
                                    {content.cta.donateBtn[language as keyof typeof content.cta.donateBtn]}
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-secondary w-full sm:w-auto" asChild>
                                <Link to="/volunteer">
                                    {content.cta.volunteerBtn[language as keyof typeof content.cta.volunteerBtn]}
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