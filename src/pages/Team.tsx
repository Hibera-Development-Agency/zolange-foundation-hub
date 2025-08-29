import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Executive Director",
      bio: "With over 15 years in international development, Sarah leads our global initiatives with passion and expertise.",
      department: "Leadership",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "sarah.johnson@zolangefoundation.org",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Michael Adeyemi",
      position: "Programs Director",
      bio: "Michael oversees all our field operations across Africa, bringing deep cultural understanding and operational excellence.",
      department: "Programs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "michael.adeyemi@zolangefoundation.org",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Dr. Maria Santos",
      position: "Healthcare Coordinator",
      bio: "Dr. Santos leads our healthcare initiatives, ensuring quality medical care reaches underserved communities.",
      department: "Healthcare",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "maria.santos@zolangefoundation.org",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "James Thompson",
      position: "Education Director",
      bio: "James develops and implements our educational programs, focusing on sustainable learning solutions.",
      department: "Education",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "james.thompson@zolangefoundation.org",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Grace Okafor",
      position: "Community Outreach Manager",
      bio: "Grace builds relationships with local communities, ensuring our programs meet real needs.",
      department: "Outreach",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "grace.okafor@zolangefoundation.org",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "David Kim",
      position: "Technology & Innovation",
      bio: "David leverages technology to amplify our impact and streamline our operations globally.",
      department: "Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "david.kim@zolangefoundation.org",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const departments = ["All", "Leadership", "Programs", "Healthcare", "Education", "Outreach", "Technology"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Team</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Meet the dedicated individuals who make our mission possible through their expertise, passion, and commitment.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {departments.map((dept) => (
                <Badge
                  key={dept}
                  variant={dept === "All" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                >
                  {dept}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                      <p className="text-secondary font-medium">{member.position}</p>
                      <Badge variant="outline" className="mt-2">
                        {member.department}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`mailto:${member.social.email}`} aria-label="Email">
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={member.social.linkedin} aria-label="LinkedIn">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={member.social.twitter} aria-label="Twitter">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-6">Join Our Team</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're always looking for passionate individuals who share our mission and want to make a difference in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg">
                  View Open Positions
                </Button>
                <Button variant="outline" size="lg">
                  Volunteer With Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Why Work With Us</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join a team that's committed to making a lasting impact while fostering personal and professional growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Meaningful Work",
                  description: "Every day, you'll know that your work is directly improving lives and communities."
                },
                {
                  title: "Global Impact",
                  description: "Be part of projects that span continents and create lasting change."
                },
                {
                  title: "Growth & Development",
                  description: "Continuous learning opportunities and career advancement in a supportive environment."
                }
              ].map((benefit, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent>
                    <h3 className="text-xl font-semibold text-primary mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;