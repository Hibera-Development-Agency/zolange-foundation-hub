import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import educationImage from "@/assets/education-project.jpg";
import healthcareImage from "@/assets/healthcare-project.jpg";
import waterImage from "@/assets/water-project.jpg";

const Projects = () => {
  const [language] = useState("en"); // In a real app, this would come from context or state

  const projects = [
    {
      id: 1,
      slug: "education-for-all",
      title: { en: "Education for All", fr: "Éducation pour Tous" },
      description: { 
        en: "Providing quality education and school supplies to underprivileged children in rural communities.",
        fr: "Fournir une éducation de qualité et des fournitures scolaires aux enfants défavorisés des communautés rurales."
      },
      image: educationImage,
      location: { en: "Ghana, West Africa", fr: "Ghana, Afrique de l'Ouest" },
      status: { en: "Active", fr: "Actif" },
      beneficiaries: { en: "2,500+ children", fr: "2 500+ enfants" },
      category: { en: "Education", fr: "Éducation" }
    },
    {
      id: 2,
      slug: "community-healthcare",
      title: { en: "Community Healthcare Initiative", fr: "Initiative de Santé Communautaire" },
      description: { 
        en: "Mobile health clinics and medical supplies for remote villages lacking healthcare access.",
        fr: "Cliniques de santé mobiles et fournitures médicales pour les villages reculés manquant d'accès aux soins de santé."
      },
      image: healthcareImage,
      location: { en: "Nigeria, West Africa", fr: "Nigéria, Afrique de l'Ouest" },
      status: { en: "Active", fr: "Actif" },
      beneficiaries: { en: "15,000+ people", fr: "15 000+ personnes" },
      category: { en: "Healthcare", fr: "Santé" }
    },
    {
      id: 3,
      slug: "clean-water-access",
      title: { en: "Clean Water Access", fr: "Accès à l'Eau Potable" },
      description: { 
        en: "Building water wells and sanitation facilities to provide clean water to communities.",
        fr: "Construction de puits d'eau et d'installations sanitaires pour fournir de l'eau potable aux communautés."
      },
      image: waterImage,
      location: { en: "Philippines, Southeast Asia", fr: "Philippines, Asie du Sud-Est" },
      status: { en: "Completed", fr: "Terminé" },
      beneficiaries: { en: "8,000+ people", fr: "8 000+ personnes" },
      category: { en: "Infrastructure", fr: "Infrastructure" }
    }
  ];

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
        <section className="bg-hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content.hero.title[language as keyof typeof content.hero.title]}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {content.hero.subtitle[language as keyof typeof content.hero.subtitle]}
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
                      alt={project.title[language as keyof typeof project.title]}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl text-primary">
                        {project.title[language as keyof typeof project.title]}
                      </CardTitle>
                      <Badge variant={project.status.en === "Active" ? "default" : "secondary"}>
                        {project.status[language as keyof typeof project.status]}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {project.location[language as keyof typeof project.location]}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {project.description[language as keyof typeof project.description]}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {content.category[language as keyof typeof content.category]}
                        </span>
                        <Badge variant="outline">
                          {project.category[language as keyof typeof project.category]}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {content.beneficiaries[language as keyof typeof content.beneficiaries]}
                        </span>
                        <span className="font-medium">
                          {project.beneficiaries[language as keyof typeof project.beneficiaries]}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/projects/${project.slug}`}>
                        {content.learnMore[language as keyof typeof content.learnMore]}
                      </Link>
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
              <h2 className="text-4xl font-bold text-foreground mb-6">
                {content.impact.title[language as keyof typeof content.impact.title]}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {content.impact.subtitle[language as keyof typeof content.impact.subtitle]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
        <section className="py-20 bg-donation-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              {content.cta.title[language as keyof typeof content.cta.title]}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {content.cta.subtitle[language as keyof typeof content.cta.subtitle]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/donate">
                  {content.cta.donateBtn[language as keyof typeof content.cta.donateBtn]}
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-secondary" asChild>
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