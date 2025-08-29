import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Zolange Foundation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We are the Zolange Foundation - empowering lives worldwide through hope and the love of Jesus Christ.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="shadow-primary">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our mission centers on creating a profound difference in the lives of 
                    people worldwide, regardless of their backgrounds or ages. We aim to 
                    inspire and empower individuals, renewing hope, offering comfort, 
                    and fostering joy and peace through the transformative love of our 
                    Lord Jesus Christ.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-secondary">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-secondary mb-6">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To be a beacon of hope and transformation in communities across the globe, 
                    where every person experiences the love of Christ through practical acts 
                    of service, education, healthcare, and spiritual nurturing, creating 
                    sustainable positive change for generations to come.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These core values guide every decision we make and every action we take in our mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Love & Compassion",
                  description: "We lead with love, showing Christ's compassion to all we serve."
                },
                {
                  title: "Integrity & Truth",
                  description: "We operate with transparency, honesty, and unwavering ethical standards."
                },
                {
                  title: "Community & Unity",
                  description: "We believe in the power of community and work together toward common goals."
                }
              ].map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-8">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  Founded with a heart for service and a calling to spread God's love, the Zolange Foundation 
                  began as a small initiative to help local communities. What started as a simple desire to 
                  make a difference has grown into a global movement of hope and transformation.
                </p>
                <p className="mb-6">
                  Today, we continue to grow our impact across multiple continents, always guided by our 
                  founding principle: "We love because He first loved us" (1 John 4:19). This biblical 
                  foundation shapes every program we implement and every relationship we build.
                </p>
                <p>
                  Our work spans education, healthcare, community development, and spiritual growth, 
                  always with the goal of empowering individuals and communities to thrive.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;