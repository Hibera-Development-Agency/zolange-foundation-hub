import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Clock, Mail, MapPin, Phone, Send} from "lucide-react";

const Contact = () => {
    const contactInfo = [
        {
            icon: MapPin,
            title: "Head Office",
            details: ["Almere, The Netherlands"]
        },
        {
            icon: Phone,
            title: "Phone",
            details: ["+31 6 12345678"]
        },
        {
            icon: Mail,
            title: "Email",
            details: ["zolangefoundation@gmail.com"]
        },
        {
            icon: Clock,
            title: "Office Hours",
            details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM"]
        }
    ];

    const offices = [
        {
            location: "NL Office",
            address: "[PLACHOLDER ADDRESS]",
            phone: "[PLACEHOLDER PHONENUMBER]",
            email: "[PLACEHOLDER EMAIL]"
        },
        {
            location: "DRC Office",
            address: "[PLACHOLDER ADDRESS]",
            phone: "[PLACEHOLDER PHONENUMBER]",
            email: "[PLACEHOLDER EMAIL]"
        },


    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation/>

            <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-hero-gradient text-white py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">Contact Us</h1>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 sm:px-0">
                            We'd love to hear from you. Get in touch with us for any questions, partnerships, or
                            volunteer opportunities.
                        </p>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {contactInfo.map((item, index) => (
                                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <item.icon className="w-12 h-12 text-primary mx-auto mb-4"/>
                                        <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                                        <div className="space-y-1">
                                            {item.details.map((detail, i) => (
                                                <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form & Map */}
                <section className="py-12 sm:py-20 bg-muted">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                            {/* Contact Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
                                    <p className="text-muted-foreground">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input id="firstName" required/>
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input id="lastName" required/>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input id="email" type="email" required/>
                                        </div>

                                        <div>
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a subject"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="general">General Inquiry</SelectItem>
                                                    <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                                                    <SelectItem value="donation">Donation Information</SelectItem>
                                                    <SelectItem value="partnership">Partnership</SelectItem>
                                                    <SelectItem value="media">Media & Press</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us how we can help you..."
                                                className="min-h-[120px]"
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="w-full" size="lg">
                                            <Send className="w-4 h-4 mr-2"/>
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Map Placeholder */}
                            <div className="space-y-6">
                                <Card>
                                    <CardContent className="p-0">
                                        <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2"/>
                                                <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                                                <p className="text-sm text-muted-foreground">Find our offices
                                                    worldwide</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Contact */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary">Quick Contact</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-secondary"/>
                                            <div>
                                                <p className="font-medium">Emergency Line</p>
                                                <p className="text-sm text-muted-foreground">+31 6 12345678</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-secondary"/>
                                            <div>
                                                <p className="font-medium">Partnerships</p>
                                                <p className="text-sm text-muted-foreground">[PLACEHOLDER EMAIL]</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-secondary"/>
                                            <div>
                                                <p className="font-medium">Media Inquiries</p>
                                                <p className="text-sm text-muted-foreground">[PLACEHOLDER EMAIL]</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Regional Offices */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">Our Global Offices</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                We have offices around the world to better serve our communities and coordinate our
                                projects.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {offices.map((office, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-primary">{office.location}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-secondary mt-0.5"/>
                                            <p className="text-sm text-muted-foreground">{office.address}</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-secondary"/>
                                            <p className="text-sm text-muted-foreground">{office.phone}</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-secondary"/>
                                            <p className="text-sm text-muted-foreground">{office.email}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-muted">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                            <p className="text-xl text-muted-foreground">
                                Find quick answers to common questions about our work and how to get involved.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    question: "How can I volunteer with Zolange Foundation?",
                                    answer: "Visit our Volunteer page to learn about opportunities and submit an application. We have both field and remote positions available."
                                },
                                {
                                    question: "Where do my donations go?",
                                    answer: "Your donations directly support our projects in education, healthcare, and community development. We maintain full transparency in our financial reporting."
                                },
                                {
                                    question: "Can I visit your project sites?",
                                    answer: "Yes! We welcome visitors to our project sites. Please contact us in advance to arrange visits and ensure safety protocols are followed."
                                },
                                {
                                    question: "How can my organization partner with you?",
                                    answer: "We're always open to partnerships. Contact us at partners@zolangefoundation.org to discuss collaboration opportunities."
                                }
                            ].map((faq, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-primary mb-3">{faq.question}</h3>
                                        <p className="text-muted-foreground">{faq.answer}</p>
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

export default Contact;