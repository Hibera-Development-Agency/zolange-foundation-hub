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
import { getLocalized } from "@/lib/localized";

const Volunteer = () => {
  const { t, language } = useLanguage();
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const benefits = [
    {
      title: t("volunteer.benefit.love.title"),
      description: t("volunteer.benefit.love.description")
    },
    {
      title: t("volunteer.benefit.impact.title"),
      description: t("volunteer.benefit.impact.description")
    },
    {
      title: t("volunteer.benefit.community.title"),
      description: t("volunteer.benefit.community.description")
    },
    {
      title: t("volunteer.benefit.flexible.title"),
      description: t("volunteer.benefit.flexible.description")
    }
  ];

  const testimonials = [
    {
      name: t("volunteer.testimonial1.name"),
      role: t("volunteer.testimonial1.role"),
      quote: t("volunteer.testimonial1.quote"),
      duration: t("volunteer.testimonial1.duration")
    },
    {
      name: t("volunteer.testimonial2.name"),
      role: t("volunteer.testimonial2.role"),
      quote: t("volunteer.testimonial2.quote"),
      duration: t("volunteer.testimonial2.duration")
    },
    {
      name: t("volunteer.testimonial3.name"),
      role: t("volunteer.testimonial3.role"),
      quote: t("volunteer.testimonial3.quote"),
      duration: t("volunteer.testimonial3.duration")
    }
  ];

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
          title: t("volunteer.toast.errorTitle"),
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
              {t("volunteer.hero.title")}
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 sm:px-0">
              {t("volunteer.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* What Volunteering Means */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">
                {t("volunteer.meaning.title")}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto px-2 sm:px-0">
                {t("volunteer.meaning.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {benefits.map((item, index) => {
                const Icon = [Heart, Globe, Users, Clock][index];
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
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
                {t("volunteer.opportunities.title")}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                {t("volunteer.opportunities.subtitle")}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t("volunteer.opportunities.loading")}
                </p>
              </div>
            ) : positions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t("volunteer.opportunities.noPositions")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {positions.map((position) => (
                  <Card key={position.id}>
                    <CardHeader>
                      <CardTitle className="text-primary">{getLocalized(position, "title", language)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{getLocalized(position, "description", language)}</p>
                      {getLocalized(position, "requirements", language) && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">
                            {t("volunteer.opportunities.requirements")}
                          </p>
                          <p className="text-sm text-muted-foreground">{getLocalized(position, "requirements", language)}</p>
                        </div>
                      )}
                      <div className="space-y-2 text-sm">
                        {getLocalized(position, "category", language) && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("volunteer.opportunities.category")}
                            </span>
                            <span className="font-medium">{getLocalized(position, "category", language)}</span>
                          </div>
                        )}
                        {getLocalized(position, "time_commitment", language) && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("volunteer.opportunities.commitment")}
                            </span>
                            <span className="font-medium">{getLocalized(position, "time_commitment", language)}</span>
                          </div>
                        )}
                        {getLocalized(position, "location", language) && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("volunteer.opportunities.location")}
                            </span>
                            <span className="font-medium">{getLocalized(position, "location", language)}</span>
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
                {t("volunteer.application.title")}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground px-2 sm:px-0">
                {t("volunteer.application.subtitle")}
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">{t("volunteer.form.firstName")}</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t("volunteer.form.lastName")}</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">{t("volunteer.form.email")}</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t("volunteer.form.phone")}</Label>
                      <Input id="phone" type="tel" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">{t("volunteer.form.country")}</Label>
                      <Input id="country" required />
                    </div>
                    <div>
                      <Label htmlFor="age">{t("volunteer.form.age")}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t("volunteer.form.agePlaceholder")} />
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
                    <Label htmlFor="interests">{t("volunteer.form.interests")}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("volunteer.form.interestsPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">{t("volunteer.form.interest.education")}</SelectItem>
                        <SelectItem value="healthcare">{t("volunteer.form.interest.healthcare")}</SelectItem>
                        <SelectItem value="community-development">{t("volunteer.form.interest.communityDevelopment")}</SelectItem>
                        <SelectItem value="administration">{t("volunteer.form.interest.administration")}</SelectItem>
                        <SelectItem value="communications">{t("volunteer.form.interest.communications")}</SelectItem>
                        <SelectItem value="technology">{t("volunteer.form.interest.technology")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="skills">{t("volunteer.form.skills")}</Label>
                    <Textarea 
                      id="skills" 
                      placeholder={t("volunteer.form.skillsPlaceholder")}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">{t("volunteer.form.availability")}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("volunteer.form.availabilityPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part-time">{t("volunteer.form.availability.partTime")}</SelectItem>
                        <SelectItem value="full-time-remote">{t("volunteer.form.availability.fullTimeRemote")}</SelectItem>
                        <SelectItem value="short-term-field">{t("volunteer.form.availability.shortTermField")}</SelectItem>
                        <SelectItem value="long-term-field">{t("volunteer.form.availability.longTermField")}</SelectItem>
                        <SelectItem value="project-based">{t("volunteer.form.availability.projectBased")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="motivation">{t("volunteer.form.motivation")}</Label>
                    <Textarea 
                      id="motivation" 
                      placeholder={t("volunteer.form.motivationPlaceholder")}
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreement1" />
                      <Label htmlFor="agreement1" className="text-sm">
                        {t("volunteer.form.agreement1")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreement2" />
                      <Label htmlFor="agreement2" className="text-sm">
                        {t("volunteer.form.agreement2")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agreement3" />
                      <Label htmlFor="agreement3" className="text-sm">
                        {t("volunteer.form.agreement3")}
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {t("volunteer.application.submit")}
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
                {t("volunteer.stories.title")}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                {t("volunteer.stories.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t("volunteer.stories.volunteeredFor")} {testimonial.duration}</p>
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
