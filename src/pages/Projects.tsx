import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import educationImage from "@/assets/education-project.jpg";
import healthcareImage from "@/assets/healthcare-project.jpg";
import waterImage from "@/assets/water-project.jpg";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Education for All",
      description: "Providing quality education and school supplies to underprivileged children in rural communities.",
      image: educationImage,
      location: "Ghana, West Africa",
      status: "Active",
      beneficiaries: "2,500+ children",
      category: "Education"
    },
    {
      id: 2,
      title: "Community Healthcare Initiative",
      description: "Mobile health clinics and medical supplies for remote villages lacking healthcare access.",
      image: healthcareImage,
      location: "Nigeria, West Africa",
      status: "Active",
      beneficiaries: "15,000+ people",
      category: "Healthcare"
    },
    {
      id: 3,
      title: "Clean Water Access",
      description: "Building water wells and sanitation facilities to provide clean water to communities.",
      image: waterImage,
      location: "Philippines, Southeast Asia",
      status: "Completed",
      beneficiaries: "8,000+ people",
      category: "Infrastructure"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the impactful work we're doing in communities around the world.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                      <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{project.location}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
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
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Impact</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Together, we're making a real difference in communities around the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "25,000+", label: "Lives Impacted" },
                { number: "12", label: "Countries Served" },
                { number: "50+", label: "Active Projects" },
                { number: "1,200+", label: "Volunteers" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-donation-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Every contribution helps us expand our reach and deepen our impact in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Donate Now
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-secondary">
                Become a Volunteer
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