import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Clock, Mail, MapPin, Phone, Send} from "lucide-react";
import {useLanguage} from "@/contexts/LanguageContext";

const Contact = () => {
    const {t} = useLanguage();

    const contactInfo = [
        {
            icon: MapPin,
            title: t("contact.info.headOffice.title"),
            details: [t("contact.info.headOffice.detail1")]
        },
        {
            icon: Phone,
            title: t("contact.info.phone.title"),
            details: [t("contact.info.phone.detail1")]
        },
        {
            icon: Mail,
            title: t("contact.info.email.title"),
            details: [t("contact.info.email.detail1")]
        },
        {
            icon: Clock,
            title: t("contact.info.hours.title"),
            details: [t("contact.info.hours.detail1"), t("contact.info.hours.detail2")]
        }
    ];

    const offices = [
        {
            location: t("contact.offices.nl.location"),
            address: t("contact.offices.nl.address"),
            phone: t("contact.offices.nl.phone"),
            email: t("contact.offices.nl.email")
        },
        {
            location: t("contact.offices.drc.location"),
            address: t("contact.offices.drc.address"),
            phone: t("contact.offices.drc.phone"),
            email: t("contact.offices.drc.email")
        },


    ];

    const faqs = [
        {
            question: t("contact.faq.q1"),
            answer: t("contact.faq.a1")
        },
        {
            question: t("contact.faq.q2"),
            answer: t("contact.faq.a2")
        },
        {
            question: t("contact.faq.q3"),
            answer: t("contact.faq.a3")
        },
        {
            question: t("contact.faq.q4"),
            answer: t("contact.faq.a4")
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation/>

            <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-hero-gradient text-white py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">{t("contact.hero.title")}</h1>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 sm:px-0">
                            {t("contact.hero.subtitle")}
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
                                    <CardTitle className="text-2xl text-primary">{t("contact.form.title")}</CardTitle>
                                    <p className="text-muted-foreground">
                                        {t("contact.form.subtitle")}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="firstName">{t("contact.form.firstName")}</Label>
                                                <Input id="firstName" required/>
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName">{t("contact.form.lastName")}</Label>
                                                <Input id="lastName" required/>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="email">{t("contact.form.email")}</Label>
                                            <Input id="email" type="email" required/>
                                        </div>

                                        <div>
                                            <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("contact.form.subjectPlaceholder")}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="general">{t("contact.form.subject.general")}</SelectItem>
                                                    <SelectItem value="volunteer">{t("contact.form.subject.volunteer")}</SelectItem>
                                                    <SelectItem value="donation">{t("contact.form.subject.donation")}</SelectItem>
                                                    <SelectItem value="partnership">{t("contact.form.subject.partnership")}</SelectItem>
                                                    <SelectItem value="media">{t("contact.form.subject.media")}</SelectItem>
                                                    <SelectItem value="other">{t("contact.form.subject.other")}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="message">{t("contact.form.message")}</Label>
                                            <Textarea
                                                id="message"
                                                placeholder={t("contact.form.messagePlaceholder")}
                                                className="min-h-[120px]"
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="w-full" size="lg">
                                            <Send className="w-4 h-4 mr-2"/>
                                            {t("contact.form.submit")}
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
                                                <p className="text-muted-foreground">{t("contact.map.comingSoon")}</p>
                                                <p className="text-sm text-muted-foreground">{t("contact.map.findOffices")}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Contact */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary">{t("contact.quick.title")}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-secondary"/>
                                            <div>
                                                <p className="font-medium">{t("contact.quick.emergency")}</p>
                                                <p className="text-sm text-muted-foreground">+31 6 12345678</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-secondary"/>
                                            <div>
                                                <p className="font-medium">{t("contact.quick.partnerships")}</p>
                                                <p className="text-sm text-muted-foreground">[PLACEHOLDER EMAIL]</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-secondary"/>
                                            <div>
                                                <p className="font-medium">{t("contact.quick.media")}</p>
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
                            <h2 className="text-4xl font-bold text-foreground mb-6">{t("contact.offices.title")}</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                {t("contact.offices.subtitle")}
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
                            <h2 className="text-4xl font-bold text-foreground mb-6">{t("contact.faq.title")}</h2>
                            <p className="text-xl text-muted-foreground">
                                {t("contact.faq.subtitle")}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
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
