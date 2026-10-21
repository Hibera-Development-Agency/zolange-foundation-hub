import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalized } from "@/lib/localized";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error: any) {
        toast({
          title: t("projectDetail.toast.errorTitle"),
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">{t("projectDetail.loading")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t("projectDetail.notFound.title")}</h1>
            <Link to="/projects">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("projectDetail.notFound.backBtn")}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("projectDetail.backToProjects")}
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge 
                  variant={project.status === "active" ? "default" : "secondary"}
                  className="mb-4"
                >
                  {t(`projects.status.${project.status}`)}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {getLocalized(project, "title", language)}
                </h1>
                <p className="text-xl mb-6">
                  {getLocalized(project, "description", language)}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {getLocalized(project, "location", language) && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {getLocalized(project, "location", language)}
                    </div>
                  )}
                  {project.beneficiaries && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {project.beneficiaries}
                    </div>
                  )}
                  {project.start_date && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(project.start_date).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <img
                  src={project.image_urls?.[0] || '/placeholder.svg'}
                  alt={getLocalized(project, "title", language)}
                  className="w-full h-80 object-cover rounded-lg shadow-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      {t("projectDetail.overview.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {getLocalized(project, "description", language)}
                    </p>
                  </CardContent>
                </Card>

                {project.image_urls && project.image_urls.length > 1 && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>{t("projectDetail.gallery.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {project.image_urls.slice(1).map((url: string, index: number) => (
                          <img
                            key={index}
                            src={url}
                            alt={`${getLocalized(project, "title", language)} - Image ${index + 2}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("projectDetail.info.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {getLocalized(project, "category", language) && (
                      <div>
                        <span className="text-sm text-muted-foreground">{t("projectDetail.info.category")}</span>
                        <Badge variant="outline" className="ml-2">
                          {getLocalized(project, "category", language)}
                        </Badge>
                      </div>
                    )}
                    {project.budget && (
                      <div>
                        <span className="text-sm text-muted-foreground">{t("projectDetail.info.budget")}</span>
                        <p className="font-semibold">${project.budget.toLocaleString()}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-muted-foreground">{t("projectDetail.info.status")}</span>
                      <p className="font-semibold capitalize">{t(`projects.status.${project.status}`)}</p>
                    </div>
                    {project.start_date && (
                      <div>
                        <span className="text-sm text-muted-foreground">{t("projectDetail.info.startDate")}</span>
                        <p className="font-semibold">
                          {new Date(project.start_date).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                        </p>
                      </div>
                    )}
                    {project.duration_months && (
                      <div>
                        <span className="text-sm text-muted-foreground">{t("projectDetail.info.duration")}</span>
                        <p className="font-semibold">{project.duration_months} {t("projectDetail.info.months")}</p>
                      </div>
                    )}
                    {project.completion_percentage !== null && (
                      <div>
                        <span className="text-sm text-muted-foreground">{t("projectDetail.info.progress")}</span>
                        <p className="font-semibold">{project.completion_percentage}%</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("projectDetail.support.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {t("projectDetail.support.description")}
                    </p>
                    <Button className="w-full" asChild>
                      <Link to="/donate">{t("projectDetail.support.donateBtn")}</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/volunteer">{t("projectDetail.support.volunteerBtn")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
