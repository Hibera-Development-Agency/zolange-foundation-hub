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

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
          title: "Error loading project",
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
          <p className="text-muted-foreground">Loading project...</p>
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
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link to="/projects">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
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
              Back to Projects
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge 
                  variant={project.status === "active" ? "default" : "secondary"}
                  className="mb-4"
                >
                  {project.status}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {project.title}
                </h1>
                <p className="text-xl mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {project.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location}
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
                      {new Date(project.start_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <img
                  src={project.image_urls?.[0] || '/placeholder.svg'}
                  alt={project.title}
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
                      Project Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>

                {project.image_urls && project.image_urls.length > 1 && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Project Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {project.image_urls.slice(1).map((url: string, index: number) => (
                          <img
                            key={index}
                            src={url}
                            alt={`${project.title} - Image ${index + 2}`}
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
                    <CardTitle>Project Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.category && (
                      <div>
                        <span className="text-sm text-muted-foreground">Category</span>
                        <Badge variant="outline" className="ml-2">
                          {project.category}
                        </Badge>
                      </div>
                    )}
                    {project.budget && (
                      <div>
                        <span className="text-sm text-muted-foreground">Budget</span>
                        <p className="font-semibold">${project.budget.toLocaleString()}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-muted-foreground">Status</span>
                      <p className="font-semibold capitalize">{project.status}</p>
                    </div>
                    {project.start_date && (
                      <div>
                        <span className="text-sm text-muted-foreground">Start Date</span>
                        <p className="font-semibold">
                          {new Date(project.start_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {project.duration_months && (
                      <div>
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <p className="font-semibold">{project.duration_months} months</p>
                      </div>
                    )}
                    {project.completion_percentage !== null && (
                      <div>
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <p className="font-semibold">{project.completion_percentage}%</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support This Project</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Help us continue making a difference in this community.
                    </p>
                    <Button className="w-full" asChild>
                      <Link to="/donate">Donate Now</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/volunteer">Become a Volunteer</Link>
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