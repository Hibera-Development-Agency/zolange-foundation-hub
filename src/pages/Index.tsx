import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { getLocalized } from "@/lib/localized";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Users, Globe, BookOpen, Stethoscope, Droplets } from "lucide-react";
import educationImage from "@/assets/education-project.jpg";
import healthcareImage from "@/assets/healthcare-project.jpg";
import waterImage from "@/assets/water-project.jpg";

const Index = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(3);
      if (mounted && !error) setProjects(data ?? []);
    };
    void fetchProjects();
    return () => { mounted = false; };
  }, []);

  const fallbackProjects = [
    {
      id: "education",
      href: "/projects",
      title: t("home.project.education.title"),
      description: t("home.project.education.description"),
      image: educationImage,
      location: t("home.project.education.location"),
      beneficiaries: t("home.project.education.beneficiaries"),
      icon: BookOpen
    },
    {
      id: "healthcare",
      href: "/projects",
      title: t("home.project.healthcare.title"),
      description: t("home.project.healthcare.description"),
      image: healthcareImage,
      location: t("home.project.healthcare.location"),
      beneficiaries: t("home.project.healthcare.beneficiaries"),
      icon: Stethoscope
    },
    {
      id: "water",
      href: "/projects",
      title: t("home.project.water.title"),
      description: t("home.project.water.description"),
      image: waterImage,
      location: t("home.project.water.location"),
      beneficiaries: t("home.project.water.beneficiaries"),
      icon: Droplets
    }
  ];

  const featuredProjects = projects.length > 0 ? projects.map((project) => ({
    id: project.id,
    title: getLocalized(project, "title", language),
    description: getLocalized(project, "description", language),
    location: getLocalized(project, "location", language),
    beneficiaries: project.beneficiaries ?? "",
    image: project.image_urls?.[0] || "/placeholder.svg",
    href: project.slug ? `/projects/${project.slug}` : "/projects",
    icon: BookOpen,
  })) : fallbackProjects;

  const impactStats = [
    { icon: Users, number: "25,000+", label: t("home.impact.lives") },
    { icon: Globe, number: "12", label: t("home.impact.countries") },
    { icon: Heart, number: "50+", label: t("home.impact.projects") },
    { icon: Users, number: "1,200+", label: t("home.impact.volunteers") }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />

        {/* Mission Section */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">
                {t("home.mission.title")}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
                {t("home.mission.text")}
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/about">{t("home.mission.cta")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-12 sm:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">{t("home.projects.title")}</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                {t("home.projects.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <project.icon className="w-6 h-6 text-primary" />
                      <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground text-sm">{project.location}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline">{project.beneficiaries}</Badge>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={project.href}>{t("common.viewDetails")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/projects">{t("home.projects.viewAll")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">{t("home.impact.title")}</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                {t("home.impact.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-20 bg-donation-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">{t("home.cta.title")}</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0">
              {t("home.cta.text")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
              <Button variant="secondary" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link to="/donate">{t("common.donateNow")}</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border-white text-white hover:bg-white hover:text-secondary w-full sm:w-auto"
              >
                <Link to="/volunteer">{t("home.cta.volunteer")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Values Preview */}
        <section className="py-12 sm:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">{t("home.foundation.title")}</h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {t("home.foundation.text")}
                </p>
                <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/about">{t("home.foundation.cta")}</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { title: t("home.value.love.title"), description: t("home.value.love.description") },
                  { title: t("home.value.integrity.title"), description: t("home.value.integrity.description") },
                  { title: t("home.value.community.title"), description: t("home.value.community.description") },
                  { title: t("home.value.sustainable.title"), description: t("home.value.sustainable.description") }
                ].map((value, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-primary mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
