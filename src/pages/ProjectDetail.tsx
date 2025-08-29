import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Target } from "lucide-react";
import educationImage from "@/assets/education-project.jpg";
import healthcareImage from "@/assets/healthcare-project.jpg";
import waterImage from "@/assets/water-project.jpg";

const ProjectDetail = () => {
  const { slug } = useParams();

  const projects = {
    "education-for-all": {
      id: 1,
      title: { en: "Education for All", fr: "Éducation pour Tous" },
      description: { 
        en: "Providing quality education and school supplies to underprivileged children in rural communities.",
        fr: "Fournir une éducation de qualité et des fournitures scolaires aux enfants défavorisés des communautés rurales."
      },
      fullDescription: {
        en: "Our Education for All project transforms lives by bringing quality education to children in remote villages across Ghana. We establish learning centers, provide textbooks and school supplies, and train local teachers to ensure sustainable educational development. Through partnerships with local communities, we've built 15 schools and provided scholarships to over 2,500 students.",
        fr: "Notre projet Éducation pour Tous transforme des vies en apportant une éducation de qualité aux enfants des villages reculés du Ghana. Nous établissons des centres d'apprentissage, fournissons des manuels et des fournitures scolaires, et formons des enseignants locaux pour assurer un développement éducatif durable. Grâce à des partenariats avec les communautés locales, nous avons construit 15 écoles et fourni des bourses à plus de 2 500 élèves."
      },
      image: educationImage,
      location: { en: "Ghana, West Africa", fr: "Ghana, Afrique de l'Ouest" },
      status: { en: "Active", fr: "Actif" },
      beneficiaries: { en: "2,500+ children", fr: "2 500+ enfants" },
      category: { en: "Education", fr: "Éducation" },
      startDate: { en: "January 2022", fr: "Janvier 2022" },
      budget: "$450,000",
      goals: {
        en: [
          "Build 20 schools by 2025",
          "Train 100 local teachers",
          "Provide scholarships to 5,000 students",
          "Establish computer labs in each school"
        ],
        fr: [
          "Construire 20 écoles d'ici 2025",
          "Former 100 enseignants locaux",
          "Fournir des bourses à 5 000 élèves",
          "Établir des laboratoires informatiques dans chaque école"
        ]
      }
    },
    "community-healthcare": {
      id: 2,
      title: { en: "Community Healthcare Initiative", fr: "Initiative de Santé Communautaire" },
      description: { 
        en: "Mobile health clinics and medical supplies for remote villages lacking healthcare access.",
        fr: "Cliniques de santé mobiles et fournitures médicales pour les villages reculés manquant d'accès aux soins de santé."
      },
      fullDescription: {
        en: "Our Community Healthcare Initiative brings essential medical services to underserved populations in Nigeria. Through mobile clinics, we provide primary healthcare, vaccinations, and health education. Our trained medical staff conducts regular visits to remote villages, ensuring continuous care and building local healthcare capacity.",
        fr: "Notre Initiative de Santé Communautaire apporte des services médicaux essentiels aux populations mal desservies au Nigéria. Grâce aux cliniques mobiles, nous fournissons des soins de santé primaires, des vaccinations et une éducation sanitaire. Notre personnel médical formé effectue des visites régulières dans les villages reculés, assurant des soins continus et renforçant les capacités de santé locales."
      },
      image: healthcareImage,
      location: { en: "Nigeria, West Africa", fr: "Nigéria, Afrique de l'Ouest" },
      status: { en: "Active", fr: "Actif" },
      beneficiaries: { en: "15,000+ people", fr: "15 000+ personnes" },
      category: { en: "Healthcare", fr: "Santé" },
      startDate: { en: "March 2021", fr: "Mars 2021" },
      budget: "$680,000",
      goals: {
        en: [
          "Reach 25,000 people by end of 2024",
          "Establish 5 permanent health posts",
          "Train 50 community health workers",
          "Conduct monthly health education sessions"
        ],
        fr: [
          "Atteindre 25 000 personnes d'ici fin 2024",
          "Établir 5 postes de santé permanents",
          "Former 50 agents de santé communautaires",
          "Organiser des sessions mensuelles d'éducation sanitaire"
        ]
      }
    },
    "clean-water-access": {
      id: 3,
      title: { en: "Clean Water Access", fr: "Accès à l'Eau Potable" },
      description: { 
        en: "Building water wells and sanitation facilities to provide clean water to communities.",
        fr: "Construction de puits d'eau et d'installations sanitaires pour fournir de l'eau potable aux communautés."
      },
      fullDescription: {
        en: "Our Clean Water Access project addresses the critical need for safe drinking water in rural Philippines. We construct deep water wells, install solar-powered pumps, and build sanitation facilities. Each project includes community training on water system maintenance and hygiene practices to ensure long-term sustainability.",
        fr: "Notre projet d'Accès à l'Eau Potable répond au besoin critique d'eau potable dans les zones rurales des Philippines. Nous construisons des puits profonds, installons des pompes solaires et construisons des installations sanitaires. Chaque projet inclut une formation communautaire sur la maintenance du système d'eau et les pratiques d'hygiène pour assurer une durabilité à long terme."
      },
      image: waterImage,
      location: { en: "Philippines, Southeast Asia", fr: "Philippines, Asie du Sud-Est" },
      status: { en: "Completed", fr: "Terminé" },
      beneficiaries: { en: "8,000+ people", fr: "8 000+ personnes" },
      category: { en: "Infrastructure", fr: "Infrastructure" },
      startDate: { en: "June 2020", fr: "Juin 2020" },
      budget: "$320,000",
      goals: {
        en: [
          "Provided clean water to 8,000+ people",
          "Built 12 community wells",
          "Constructed 25 sanitation facilities",
          "Trained 60 community maintenance workers"
        ],
        fr: [
          "Fourni de l'eau potable à 8 000+ personnes",
          "Construit 12 puits communautaires",
          "Construit 25 installations sanitaires",
          "Formé 60 ouvriers de maintenance communautaires"
        ]
      }
    }
  };

  const project = projects[slug as keyof typeof projects];

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

  // For now, we'll use English. In a real app, you'd get this from context or state
  const language = "en";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "en" ? "Back to Projects" : "Retour aux Projets"}
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge 
                  variant={project.status.en === "Active" ? "default" : "secondary"}
                  className="mb-4"
                >
                  {project.status[language as keyof typeof project.status]}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {project.title[language as keyof typeof project.title]}
                </h1>
                <p className="text-xl mb-6">
                  {project.description[language as keyof typeof project.description]}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location[language as keyof typeof project.location]}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {project.beneficiaries[language as keyof typeof project.beneficiaries]}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.startDate[language as keyof typeof project.startDate]}
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title[language as keyof typeof project.title]}
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
                      {language === "en" ? "Project Overview" : "Aperçu du Projet"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.fullDescription[language as keyof typeof project.fullDescription]}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" ? "Project Goals" : "Objectifs du Projet"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.goals[language as keyof typeof project.goals].map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Project Info" : "Informations du Projet"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-sm text-muted-foreground">{language === "en" ? "Category" : "Catégorie"}</span>
                      <Badge variant="outline" className="ml-2">
                        {project.category[language as keyof typeof project.category]}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{language === "en" ? "Budget" : "Budget"}</span>
                      <p className="font-semibold">{project.budget}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{language === "en" ? "Status" : "Statut"}</span>
                      <p className="font-semibold">
                        {project.status[language as keyof typeof project.status]}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{language === "en" ? "Start Date" : "Date de Début"}</span>
                      <p className="font-semibold">
                        {project.startDate[language as keyof typeof project.startDate]}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Support This Project" : "Soutenir ce Projet"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" 
                        ? "Help us continue making a difference in this community." 
                        : "Aidez-nous à continuer à faire la différence dans cette communauté."
                      }
                    </p>
                    <Button className="w-full" asChild>
                      <Link to="/donate">
                        {language === "en" ? "Donate Now" : "Faire un Don"}
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/volunteer">
                        {language === "en" ? "Become a Volunteer" : "Devenir Bénévole"}
                      </Link>
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