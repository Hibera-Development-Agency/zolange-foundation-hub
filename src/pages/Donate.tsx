import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Book, CreditCard, Gift, Heart, Monitor, Shirt} from "lucide-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useLanguage} from "@/contexts/LanguageContext";

const Donate = () => {
    const {t} = useLanguage();
    const donationAmounts = [25, 50, 100, 200, 500, 1000];
    const [selectedAmount, setSelectedAmount] = useState(null);

    const inKindItems = [
        {
            icon: Book,
            category: t("donate.inkind.category.schoolSupplies.title"),
            items: [t("donate.inkind.category.schoolSupplies.item.textbooks"), t("donate.inkind.category.schoolSupplies.item.notebooks"), t("donate.inkind.category.schoolSupplies.item.pens"), t("donate.inkind.category.schoolSupplies.item.calculators"), t("donate.inkind.category.schoolSupplies.item.backpacks")],
            description: t("donate.inkind.category.schoolSupplies.description")
        },
        {
            icon: Shirt,
            category: t("donate.inkind.category.clothing.title"),
            items: [t("donate.inkind.category.clothing.item.childrens"), t("donate.inkind.category.clothing.item.uniforms"), t("donate.inkind.category.clothing.item.jackets"), t("donate.inkind.category.clothing.item.shoes"), t("donate.inkind.category.clothing.item.blankets")],
            description: t("donate.inkind.category.clothing.description")
        },
        {
            icon: Monitor,
            category: t("donate.inkind.category.electronics.title"),
            items: [t("donate.inkind.category.electronics.item.laptops"), t("donate.inkind.category.electronics.item.tablets"), t("donate.inkind.category.electronics.item.smartphones"), t("donate.inkind.category.electronics.item.solarPanels"), t("donate.inkind.category.electronics.item.medicalEquipment")],
            description: t("donate.inkind.category.electronics.description")
        },
        {
            icon: Gift,
            category: t("donate.inkind.category.hygiene.title"),
            items: [t("donate.inkind.category.hygiene.item.soap"), t("donate.inkind.category.hygiene.item.toothbrushes"), t("donate.inkind.category.hygiene.item.firstAid"), t("donate.inkind.category.hygiene.item.vitamins"), t("donate.inkind.category.hygiene.item.waterFilters")],
            description: t("donate.inkind.category.hygiene.description")
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation/>

            <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-donation-gradient text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("donate.hero.title")}</h1>
                        <p className="text-xl max-w-3xl mx-auto mb-8">
                            {t("donate.hero.subtitle")}
                        </p>
                    </div>
                </section>

                {/* Donation Tabs */}
                <section className="py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Tabs defaultValue="money" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-12">
                                <TabsTrigger value="money" className="text-lg py-3">
                                    <CreditCard className="w-5 h-5 mr-2"/>
                                    {t("donate.tabs.money")}
                                </TabsTrigger>
                                <TabsTrigger value="inkind" className="text-lg py-3">
                                    <Gift className="w-5 h-5 mr-2"/>
                                    {t("donate.tabs.inkind")}
                                </TabsTrigger>
                            </TabsList>

                            {/* Monetary Donation */}
                            <TabsContent value="money" className="space-y-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* Donation Form */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-2xl text-primary">{t("donate.money.form.title")}</CardTitle>
                                            <p className="text-muted-foreground">
                                                {t("donate.money.form.subtitle")}
                                            </p>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Donation Type */}
                                            <div>
                                                <Label className="text-base mb-4 block">{t("donate.money.form.type")}</Label>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <Button variant="default" className="py-6">
                                                        {t("donate.money.form.oneTime")}
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Amount Selection */}
                                            <div>
                                                <Label className="text-base mb-4 block">{t("donate.money.form.selectAmount")}</Label>
                                                <div className="grid grid-cols-3 gap-3 mb-4">
                                                    {donationAmounts.map((amount) => (
                                                        <Button
                                                            key={amount}
                                                            variant={selectedAmount === amount ? "default" : "outline"}
                                                            className="py-4"
                                                            onClick={() => setSelectedAmount(amount)}
                                                        >
                                                            €{amount}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Donor Information */}
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="donorFirst">{t("donate.money.form.firstName")}</Label>
                                                        <Input id="donorFirst" required/>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="donorLast">{t("donate.money.form.lastName")}</Label>
                                                        <Input id="donorLast" required/>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="donorEmail">{t("donate.money.form.email")}</Label>
                                                    <Input id="donorEmail" type="email" required/>
                                                </div>

                                                <div>
                                                    <Label htmlFor="donorCountry">{t("donate.money.form.country")}</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t("donate.money.form.countryPlaceholder")}/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="nl">{t("donate.money.form.country.nl")}</SelectItem>
                                                            <SelectItem value="drc">{t("donate.money.form.country.drc")}</SelectItem>
                                                            <SelectItem value="us">{t("donate.money.form.country.us")}</SelectItem>
                                                            <SelectItem value="uk">{t("donate.money.form.country.uk")}</SelectItem>
                                                            <SelectItem value="de">{t("donate.money.form.country.de")}</SelectItem>
                                                            <SelectItem value="fr">{t("donate.money.form.country.fr")}</SelectItem>
                                                            <SelectItem value="ca">{t("donate.money.form.country.ca")}</SelectItem>
                                                            <SelectItem value="au">{t("donate.money.form.country.au")}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                {selectedAmount ? (
                                                    <Link
                                                        to={`https://bunq.me/StichtingZolangeFoundation/${selectedAmount}`}>
                                                        <Button className="w-full bg-secondary hover:bg-secondary-dark"
                                                                size="lg">
                                                            {t("donate.money.form.proceedToPayment").replace("{amount}", String(selectedAmount))}
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button disabled className="w-full" size="lg">
                                                        {t("donate.money.form.selectAnAmount")}
                                                    </Button>
                                                )}
                                            </div>

                                            <p className="text-xs text-muted-foreground text-center">
                                                {t("donate.money.form.secureNote")}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Impact Information */}
                                    <div className="space-y-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-xl text-primary">{t("donate.impact.title")}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-3">
                                                    <div
                                                        className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                        <span>{t("donate.impact.25.label")}</span>
                                                        <span
                                                            className="font-medium">{t("donate.impact.25.value")}</span>
                                                    </div>
                                                    <div
                                                        className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                        <span>{t("donate.impact.50.label")}</span>
                                                        <span
                                                            className="font-medium">{t("donate.impact.50.value")}</span>
                                                    </div>
                                                    <div
                                                        className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                        <span>{t("donate.impact.100.label")}</span>
                                                        <span className="font-medium">{t("donate.impact.100.value")}</span>
                                                    </div>
                                                    <div
                                                        className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                        <span>{t("donate.impact.200.label")}</span>
                                                        <span className="font-medium">{t("donate.impact.200.value")}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-xl text-primary">{t("donate.otherWays.title")}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <Button variant="outline" className="w-full justify-start">
                                                    <Gift className="w-4 h-4 mr-2"/>
                                                    {t("donate.otherWays.bankTransfer")}
                                                </Button>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <Heart className="w-4 h-4 mr-2"/>
                                                    {t("donate.otherWays.crypto")}
                                                </Button>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <CreditCard className="w-4 h-4 mr-2"/>
                                                    {t("donate.otherWays.corporate")}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* In-Kind Donation */}
                            <TabsContent value="inkind" className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-foreground mb-4">{t("donate.inkind.title")}</h2>
                                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                        {t("donate.inkind.subtitle")}
                                    </p>
                                </div>

                                {/* Item Categories */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                    {inKindItems.map((category, index) => (
                                        <Card key={index} className="hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6 text-center">
                                                <category.icon className="w-12 h-12 text-primary mx-auto mb-4"/>
                                                <h3 className="text-lg font-semibold text-primary mb-2">{category.category}</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                                                <div className="space-y-1">
                                                    {category.items.map((item, i) => (
                                                        <Badge key={i} variant="outline" className="text-xs">
                                                            {item}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Donation Form */}
                                <div className="max-w-4xl mx-auto">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-2xl text-primary">{t("donate.inkind.form.title")}</CardTitle>
                                            <p className="text-muted-foreground">
                                                {t("donate.inkind.form.subtitle")}
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <form className="space-y-6">
                                                {/* Donor Information */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="itemDonorFirst">{t("donate.inkind.form.firstName")}</Label>
                                                        <Input id="itemDonorFirst" required/>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="itemDonorLast">{t("donate.inkind.form.lastName")}</Label>
                                                        <Input id="itemDonorLast" required/>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="itemDonorEmail">{t("donate.inkind.form.email")}</Label>
                                                        <Input id="itemDonorEmail" type="email" required/>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="itemDonorPhone">{t("donate.inkind.form.phone")}</Label>
                                                        <Input id="itemDonorPhone" type="tel" required/>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="itemDonorAddress">{t("donate.inkind.form.address")}</Label>
                                                    <Input id="itemDonorAddress"
                                                           placeholder={t("donate.inkind.form.addressPlaceholder")}
                                                           required/>
                                                </div>

                                                {/* Item Details */}
                                                <div>
                                                    <Label htmlFor="itemCategory">{t("donate.inkind.form.category")}</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t("donate.inkind.form.categoryPlaceholder")}/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="school-supplies">{t("donate.inkind.form.category.schoolSupplies")}</SelectItem>
                                                            <SelectItem value="clothing">{t("donate.inkind.form.category.clothing")}</SelectItem>
                                                            <SelectItem value="electronics">{t("donate.inkind.form.category.electronics")}</SelectItem>
                                                            <SelectItem value="hygiene-health">{t("donate.inkind.form.category.hygieneHealth")}</SelectItem>
                                                            <SelectItem value="other">{t("donate.inkind.form.category.other")}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label htmlFor="itemDescription">{t("donate.inkind.form.description")}</Label>
                                                    <textarea
                                                        id="itemDescription"
                                                        className="w-full min-h-[120px] p-3 border border-input rounded-md resize-none"
                                                        placeholder={t("donate.inkind.form.descriptionPlaceholder")}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="itemCondition">{t("donate.inkind.form.condition")}</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t("donate.inkind.form.conditionPlaceholder")}/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="new">{t("donate.inkind.form.condition.new")}</SelectItem>
                                                            <SelectItem value="like-new">{t("donate.inkind.form.condition.likeNew")}</SelectItem>
                                                            <SelectItem value="good">{t("donate.inkind.form.condition.good")}</SelectItem>
                                                            <SelectItem value="fair">{t("donate.inkind.form.condition.fair")}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label htmlFor="deliveryPreference">{t("donate.inkind.form.deliveryPreference")}</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={t("donate.inkind.form.deliveryPreferencePlaceholder")}/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pickup">{t("donate.inkind.form.delivery.pickup")}</SelectItem>
                                                            <SelectItem value="dropoff">{t("donate.inkind.form.delivery.dropoff")}</SelectItem>
                                                            <SelectItem value="shipping">{t("donate.inkind.form.delivery.shipping")}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <Button type="submit" className="w-full" size="lg">
                                                    {t("donate.inkind.form.submit")}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Guidelines */}
                                <Card className="max-w-4xl mx-auto">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary">{t("donate.guidelines.title")}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li>• {t("donate.guidelines.item1")}</li>
                                            <li>• {t("donate.guidelines.item2")}</li>
                                            <li>• {t("donate.guidelines.item3")}</li>
                                            <li>• {t("donate.guidelines.item4")}</li>
                                            <li>• {t("donate.guidelines.item5")}</li>
                                            <li>• {t("donate.guidelines.item6")}</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Transparency Section */}
                <section className="py-20 bg-muted">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">{t("donate.transparency.title")}</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                {t("donate.transparency.subtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                {
                                    percentage: "85%",
                                    label: t("donate.transparency.program.label"),
                                    description: t("donate.transparency.program.description")
                                },
                                {percentage: "10%", label: t("donate.transparency.admin.label"), description: t("donate.transparency.admin.description")},
                                {percentage: "5%", label: t("donate.transparency.fundraising.label"), description: t("donate.transparency.fundraising.description")},
                                {percentage: "100%", label: t("donate.transparency.transparency.label"), description: t("donate.transparency.transparency.description")}
                            ].map((item, index) => (
                                <Card key={index} className="text-center">
                                    <CardContent className="p-6">
                                        <div className="text-4xl font-bold text-primary mb-2">{item.percentage}</div>
                                        <div className="font-semibold text-foreground mb-1">{item.label}</div>
                                        <div className="text-sm text-muted-foreground">{item.description}</div>
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

export default Donate;