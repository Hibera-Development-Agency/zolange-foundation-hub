import { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Volunteer = () => {
  const { language } = useLanguage();
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const content = {
    hero: {
      title: { en: "Volunteer With Us", fr: "Devenez Bénévole" },
      subtitle: { en: "Join our global community of volunteers and help us spread love, hope, and transformation around the world.", fr: "Rejoignez notre communauté mondiale de bénévoles et aidez-nous à répandre l'amour, l'espoir et la transformation dans le monde entier." }
    },
    meaning: {
      title: { en: "What Volunteering Means at Zolange Foundation", fr: "Ce Que Signifie le Bénévolat à la Fondation Zolange" },
      subtitle: { en: "At Zolange Foundation, volunteering is more than giving your time – it's about becoming part of a family united in purpose, sharing Christ's love through action, and witnessing transformation in both the communities we serve and within ourselves.", fr: "À la Fondation Zolange, le bénévolat est plus que donner de votre temps – il s'agit de devenir membre d'une famille unie dans un but commun, de partager l'amour du Christ par l'action et d'être témoin de la transformation dans les communautés que nous servons et en nous-mêmes." }
    },
    benefits: [
      {
        title: { en: "Love in Action", fr: "L'Amour en Action" },
        description: { en: "Show Christ's love through practical service and genuine care for those in need.", fr: "Montrez l'amour du Christ par un service pratique et un soin authentique pour ceux dans le besoin." }
      },
      {
        title: { en: "Global Impact", fr: "Impact Mondial" },
        description: { en: "Be part of projects spanning multiple countries and touching thousands of lives.", fr: "Faites partie de projets couvrant plusieurs pays et touchant des milliers de vies." }
      },
      {
        title: { en: "Community", fr: "Communauté" },
        description: { en: "Join a supportive community of like-minded individuals committed to service.", fr: "Rejoignez une communauté solidaire de personnes partageant les mêmes idées et engagées dans le service." }
      },
      {
        title: { en: "Flexible Commitment", fr: "Engagement Flexible" },
        description: { en: "Choose from various time commitments that fit your schedule and availability.", fr: "Choisissez parmi divers engagements de temps qui correspondent à votre emploi du temps et à votre disponibilité." }
      }
    ],
    opportunities: {
      title: { en: "Volunteer Opportunities", fr: "Opportunités de Bénévolat" },
      subtitle: { en: "Find the perfect way to contribute your skills and passion to our mission.", fr: "Trouvez le moyen idéal de contribuer vos compétences et votre passion à notre mission." },
      loading: { en: "Loading volunteer positions...", fr: "Chargement des postes de bénévoles..." },
      noPositions: { en: "No volunteer positions available at the moment.", fr: "Aucun poste de bénévole disponible pour le moment." },
      requirements: { en: "Requirements:", fr: "Exigences:" },
      category: { en: "Category:", fr: "Catégorie:" },
      commitment: { en: "Commitment:", fr: "Engagement:" },
      location: { en: "Location:", fr: "Lieu:" }
    },
    application: {
      title: { en: "Apply to Volunteer", fr: "Postuler comme Bénévole" },
      subtitle: { en: "Ready to join our mission? Fill out the application form below and we'll be in touch.", fr: "Prêt à rejoindre notre mission ? Remplissez le formulaire de candidature ci-dessous et nous vous contacterons." },
      submit: { en: "Submit Application", fr: "Soumettre la Candidature" }
    },
    stories: {
      title: { en: "Volunteer Stories", fr: "Témoignages de Bénévoles" },
      subtitle: { en: "Hear from some of our amazing volunteers about their experiences with Zolange Foundation.", fr: "Écoutez certains de nos merveilleux bénévoles parler de leurs expériences avec la Fondation Zolange." }
    }
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const { data, error } = await supabase
          .from('volunteer_positions')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPositions(data || []);
      } catch (error: any) {
        toast({
          title: "Error loading volunteer positions",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [toast]);

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

        {/* What Volunteering Means */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">
                {content.meaning.title[language as keyof typeof content.meaning.title]}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto px-2 sm:px-0">
                {content.meaning.subtitle[language as keyof typeof content.meaning.subtitle]}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {content.benefits.map((item, index) => {
                const Icon = [Heart, Globe, Users, Clock][index];
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        {item.title[language as keyof typeof item.title]}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description[language as keyof typeof item.description]}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-12 sm:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">
                {content.opportunities.title[language as keyof typeof content.opportunities.title]}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                {content.opportunities.subtitle[language as keyof typeof content.opportunities.subtitle]}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {content.opportunities.loading[language as keyof typeof content.opportunities.loading]}
                </p>
              </div>
            ) : positions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {content.opportunities.noPositions[language as keyof typeof content.opportunities.noPositions]}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {positions.map((position) => (
                  <Card key={position.id}>
                    <CardHeader>
                      <CardTitle className="text-primary">{position.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{position.description}</p>
                      {position.requirements && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">
                            {content.opportunities.requirements[language as keyof typeof content.opportunities.requirements]}
                          </p>
                          <p className="text-sm text-muted-foreground">{position.requirements}</p>
                        </div>
                      )}
                      <div className="space-y-2 text-sm">
                        {position.category && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {content.opportunities.category[language as keyof typeof content.opportunities.category]}
                            </span>
                            <span className="font-medium">{position.category}</span>
                          </div>
                        )}
                        {position.time_commitment && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {content.opportunities.commitment[language as keyof typeof content.opportunities.commitment]}
                            </span>
                            <span className="font-medium">{position.time_commitment}</span>
                          </div>
                        )}
                        {position.location && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {content.opportunities.location[language as keyof typeof content.opportunities.location]}
                            </span>
                            <span className="font-medium">{position.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">
                {content.application.title[language as keyof typeof content.application.title]}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground px-2 sm:px-0">
                {content.application.subtitle[language as keyof typeof content.application.subtitle]}
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
                    {content.application.submit[language as keyof typeof content.application.submit]}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">
                {content.stories.title[language as keyof typeof content.stories.title]}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                {content.stories.subtitle[language as keyof typeof content.stories.subtitle]}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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