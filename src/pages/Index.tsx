import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Users, Globe, BookOpen, Stethoscope, Droplets } from "lucide-react";
import educationImage from "@/assets/education-project.jpg";
import healthcareImage from "@/assets/healthcare-project.jpg";
import waterImage from "@/assets/water-project.jpg";

const Index = () => {
  const featuredProjects = [
    {
      id: 1,
      title: "Education for All",
      description: "Providing quality education and school supplies to underprivileged children.",
      image: educationImage,
      location: "Ghana, West Africa",
      beneficiaries: "2,500+ children",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Healthcare Initiative",
      description: "Mobile health clinics bringing medical care to remote villages.",
      image: healthcareImage,
      location: "Nigeria, West Africa", 
      beneficiaries: "15,000+ people",
      icon: Stethoscope
    },
    {
      id: 3,
      title: "Clean Water Access",
      description: "Building wells and sanitation facilities for clean water access.",
      image: waterImage,
      location: "Philippines, Southeast Asia",
      beneficiaries: "8,000+ people",
      icon: Droplets
    }
  ];

  const impactStats = [
    { icon: Users, number: "25,000+", label: "Lives Impacted" },
    { icon: Globe, number: "12", label: "Countries Served" },
    { icon: Heart, number: "50+", label: "Active Projects" },
    { icon: Users, number: "1,200+", label: "Volunteers" }
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
                We are the Zolange Foundation
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
                Our vision centers on creating a profound difference in the lives of 
                people worldwide, regardless of their backgrounds or ages. We aim to 
                inspire and empower individuals, renewing hope, offering comfort, 
                and fostering joy and peace through the transformative love of our 
                Lord Jesus Christ.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-12 sm:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">Our Featured Projects</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                Discover the impactful work we're doing in communities around the world.
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
                      <Link to="/projects">View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">Our Global Impact</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                Together, we're making a real difference in communities around the world.
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">Join Our Mission Today</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0">
              Every contribution, whether through donation or volunteering, helps us expand 
              our reach and deepen our impact in communities worldwide. Be part of the transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
              <Button variant="secondary" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link to="/donate">Donate Now</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border-white text-white hover:bg-white hover:text-secondary w-full sm:w-auto"
              >
                <Link to="/volunteer">Become a Volunteer</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Values Preview */}
        <section className="py-12 sm:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">Our Foundation</h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Built on the love of Christ and driven by compassion, we serve communities 
                  with integrity, unity, and unwavering commitment to transformation. Our work 
                  is guided by biblical principles and a deep understanding of local needs.
                </p>
                <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/about">Discover Our Values</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { title: "Love & Compassion", description: "Leading with Christ's love in all we do" },
                  { title: "Integrity & Truth", description: "Operating with transparency and honesty" },
                  { title: "Community & Unity", description: "Building bridges across cultures" },
                  { title: "Sustainable Impact", description: "Creating lasting positive change" }
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
