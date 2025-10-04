import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {Card, CardContent} from "@/components/ui/card";
import {Linkedin, Mail} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Team = () => {
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const { data, error } = await supabase
                    .from('team_members')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true });

                if (error) throw error;
                setTeamMembers(data || []);
            } catch (error: any) {
                toast({
                    title: "Error loading team members",
                    description: error.message,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, [toast]);

    return (
        <div className="min-h-screen bg-background">
            <Navigation/>

            <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-hero-gradient text-white py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">Our Team</h1>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 sm:px-0">
                            Meet the dedicated individuals who make our mission possible through their expertise,
                            passion, and commitment.
                        </p>
                    </div>
                </section>

                {/* Team Grid */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Loading team members...</p>
                            </div>
                        ) : teamMembers.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No team members available yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {teamMembers.map((member) => (
                                    <Card key={member.id}
                                          className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <div className="aspect-square overflow-hidden bg-muted">
                                            <img
                                                src={member.image_url || '/placeholder.svg'}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="mb-3">
                                                <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                                                <p className="text-secondary font-medium">{member.position}</p>
                                            </div>

                                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                                {member.description}
                                            </p>

                                            <div className="flex space-x-2">
                                                {member.email && (
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <a href={`mailto:${member.email}`} aria-label="Email">
                                                            <Mail className="w-4 h-4"/>
                                                        </a>
                                                    </Button>
                                                )}
                                                {member.linkedin_url && (
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                                            <Linkedin className="w-4 h-4"/>
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Join Our Team */}
                <section className="py-12 sm:py-20 bg-muted">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">Join Our Team</h2>
                            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-2 sm:px-0">
                                We're always looking for passionate individuals who share our mission and want to make a
                                difference in the world.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
                                <Link to={'/volunteer'}>
                                    <Button variant="default" size="lg">
                                        Volunteer With Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2 sm:px-0">Why Work With Us</h2>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
                                Join a team that's committed to making a lasting impact while fostering personal and
                                professional growth.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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

            <Footer/>
        </div>
    );
};

export default Team;