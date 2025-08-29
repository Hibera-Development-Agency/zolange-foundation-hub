import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Globe, Users, Clock } from "lucide-react";

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Volunteer With Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join our global community of volunteers and help us spread love, hope, and transformation around the world.
            </p>
          </div>
        </section>

        {/* What Volunteering Means */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">What Volunteering Means at Zolange Foundation</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                At Zolange Foundation, volunteering is more than giving your time – it's about becoming part of a family 
                united in purpose, sharing Christ's love through action, and witnessing transformation in both the 
                communities we serve and within ourselves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Love in Action",
                  description: "Show Christ's love through practical service and genuine care for those in need."
                },
                {
                  icon: Globe,
                  title: "Global Impact",
                  description: "Be part of projects spanning multiple countries and touching thousands of lives."
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Join a supportive community of like-minded individuals committed to service."
                },
                {
                  icon: Clock,
                  title: "Flexible Commitment",
                  description: "Choose from various time commitments that fit your schedule and availability."
                }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Volunteer Opportunities</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find the perfect way to contribute your skills and passion to our mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Field Volunteers",
                  description: "Work directly in communities on education, healthcare, and development projects.",
                  commitment: "2-12 months",
                  location: "On-site in Africa, Asia, or Latin America"
                },
                {
                  title: "Remote Support",
                  description: "Provide administrative, technical, or professional services from anywhere.",
                  commitment: "5-15 hours/week",
                  location: "Remote/Virtual"
                },
                {
                  title: "Event Coordinators",
                  description: "Help organize fundraising events, awareness campaigns, and community outreach.",
                  commitment: "Project-based",
                  location: "Local/Regional"
                },
                {
                  title: "Medical Volunteers",
                  description: "Healthcare professionals supporting our mobile clinics and health initiatives.",
                  commitment: "1-6 months",
                  location: "Field locations"
                },
                {
                  title: "Educators & Trainers",
                  description: "Develop curricula, train local teachers, and support educational programs.",
                  commitment: "3-12 months",
                  location: "Field or remote"
                },
                {
                  title: "Communications",
                  description: "Help tell our story through photography, writing, social media, and marketing.",
                  commitment: "Flexible",
                  location: "Remote or field"
                }
              ].map((opportunity, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-primary">{opportunity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Commitment:</span>
                        <span className="font-medium">{opportunity.commitment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{opportunity.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-6">Apply to Volunteer</h2>
              <p className="text-xl text-muted-foreground">
                Ready to join our mission? Fill out the application form below and we'll be in touch.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" required />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36-45">36-45</SelectItem>
                          <SelectItem value="46-55">46-55</SelectItem>
                          <SelectItem value="55+">55+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Volunteer Preferences */}
                  <div>
                    <Label htmlFor="interests">Areas of Interest *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="community-development">Community Development</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                        <SelectItem value="communications">Communications</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills & Experience</Label>
                    <Textarea 
                      id="skills" 
                      placeholder="Tell us about your relevant skills, experience, and qualifications..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part-time">Part-time (5-15 hours/week)</SelectItem>
                        <SelectItem value="full-time-remote">Full-time Remote</SelectItem>
                        <SelectItem value="short-term-field">Short-term Field (1-3 months)</SelectItem>
                        <SelectItem value="long-term-field">Long-term Field (6+ months)</SelectItem>
                        <SelectItem value="project-based">Project-based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="motivation">Why do you want to volunteer with us?</Label>
                    <Textarea 
                      id="motivation" 
                      placeholder="Share your motivation and what you hope to contribute..."
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreement1" />
                      <Label htmlFor="agreement1" className="text-sm">
                        I commit to the values and mission of Zolange Foundation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreement2" />
                      <Label htmlFor="agreement2" className="text-sm">
                        I agree to undergo background checks if selected for field positions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreement3" />
                      <Label htmlFor="agreement3" className="text-sm">
                        I understand this is an unpaid volunteer position
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Volunteer Stories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hear from some of our amazing volunteers about their experiences with Zolange Foundation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Emily Rodriguez",
                  role: "Education Volunteer, Ghana",
                  quote: "Working with the children in Ghana changed my life. Seeing their eagerness to learn despite challenges was incredibly inspiring.",
                  duration: "6 months"
                },
                {
                  name: "Daniel Osei",
                  role: "Healthcare Volunteer, Nigeria",
                  quote: "Being able to provide medical care to remote communities was both humbling and rewarding. The gratitude was overwhelming.",
                  duration: "1 year"
                },
                {
                  name: "Rachel Kim",
                  role: "Remote Communications Volunteer",
                  quote: "Even from thousands of miles away, I felt connected to the mission through storytelling and digital outreach.",
                  duration: "2 years"
                }
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">Volunteered for {testimonial.duration}</p>
                    </div>
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

export default Volunteer;