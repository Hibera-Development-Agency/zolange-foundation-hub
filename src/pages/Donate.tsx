import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Shirt, Book, Monitor, Gift, CreditCard } from "lucide-react";

const Donate = () => {
  const donationAmounts = [25, 50, 100, 200, 500, 1000];
  
  const inKindItems = [
    {
      icon: Book,
      category: "School Supplies",
      items: ["Textbooks", "Notebooks", "Pencils & Pens", "Calculators", "Backpacks"],
      description: "Support education with learning materials"
    },
    {
      icon: Shirt,
      category: "Clothing",
      items: ["Children's Clothing", "School Uniforms", "Warm Jackets", "Shoes", "Blankets"],
      description: "Provide clothing and comfort items"
    },
    {
      icon: Monitor,
      category: "Electronics",
      items: ["Laptops", "Tablets", "Smartphones", "Solar Panels", "Medical Equipment"],
      description: "Technology for education and healthcare"
    },
    {
      icon: Gift,
      category: "Hygiene & Health",
      items: ["Soap & Sanitizers", "Toothbrushes", "First Aid Kits", "Vitamins", "Water Filters"],
      description: "Essential health and hygiene products"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-donation-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Support Our Mission</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Your generosity helps us spread love, hope, and transformation to communities around the world.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-6 h-6 text-white" />
              <span className="text-lg">"We love because He first loved us" - 1 John 4:19</span>
            </div>
          </div>
        </section>

        {/* Donation Tabs */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="money" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="money" className="text-lg py-3">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Monetary Donation
                </TabsTrigger>
                <TabsTrigger value="inkind" className="text-lg py-3">
                  <Gift className="w-5 h-5 mr-2" />
                  In-Kind Donation
                </TabsTrigger>
              </TabsList>

              {/* Monetary Donation */}
              <TabsContent value="money" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Donation Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">Make a Donation</CardTitle>
                      <p className="text-muted-foreground">
                        Choose your donation amount and frequency to support our ongoing work.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Donation Type */}
                      <div>
                        <Label className="text-base mb-4 block">Donation Type</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="default" className="py-6">
                            One Time
                          </Button>
                          <Button variant="outline" className="py-6">
                            Monthly
                          </Button>
                        </div>
                      </div>

                      {/* Amount Selection */}
                      <div>
                        <Label className="text-base mb-4 block">Select Amount (EUR)</Label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {donationAmounts.map((amount) => (
                            <Button key={amount} variant="outline" className="py-4">
                              €{amount}
                            </Button>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>€</span>
                          <Input placeholder="Enter custom amount" type="number" />
                          <span>EUR</span>
                        </div>
                      </div>

                      {/* Donor Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="donorFirst">First Name *</Label>
                            <Input id="donorFirst" required />
                          </div>
                          <div>
                            <Label htmlFor="donorLast">Last Name *</Label>
                            <Input id="donorLast" required />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="donorEmail">Email Address *</Label>
                          <Input id="donorEmail" type="email" required />
                        </div>

                        <div>
                          <Label htmlFor="donorCountry">Country</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button className="w-full bg-secondary hover:bg-secondary-dark" size="lg">
                        Proceed to Payment
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Your donation is secure and encrypted. You will receive a receipt via email.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Impact Information */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Your Impact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <span>€25 provides</span>
                            <span className="font-medium">School supplies for 5 children</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <span>€50 provides</span>
                            <span className="font-medium">Medical care for 10 families</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <span>€100 provides</span>
                            <span className="font-medium">Clean water for 1 month</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <span>€200 provides</span>
                            <span className="font-medium">Teacher training workshop</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Other Ways to Give</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Gift className="w-4 h-4 mr-2" />
                          Bank Transfer
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Heart className="w-4 h-4 mr-2" />
                          Cryptocurrency
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Corporate Sponsorship
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* In-Kind Donation */}
              <TabsContent value="inkind" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Donate Items & Supplies</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Support our mission by donating essential items that directly benefit our communities.
                  </p>
                </div>

                {/* Item Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {inKindItems.map((category, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <category.icon className="w-12 h-12 text-primary mx-auto mb-4" />
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
                      <CardTitle className="text-2xl text-primary">Item Donation Form</CardTitle>
                      <p className="text-muted-foreground">
                        Tell us about the items you'd like to donate and we'll coordinate pickup or delivery.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        {/* Donor Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="itemDonorFirst">First Name *</Label>
                            <Input id="itemDonorFirst" required />
                          </div>
                          <div>
                            <Label htmlFor="itemDonorLast">Last Name *</Label>
                            <Input id="itemDonorLast" required />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="itemDonorEmail">Email Address *</Label>
                            <Input id="itemDonorEmail" type="email" required />
                          </div>
                          <div>
                            <Label htmlFor="itemDonorPhone">Phone Number *</Label>
                            <Input id="itemDonorPhone" type="tel" required />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="itemDonorAddress">Address *</Label>
                          <Input id="itemDonorAddress" placeholder="Street address for pickup/delivery coordination" required />
                        </div>

                        {/* Item Details */}
                        <div>
                          <Label htmlFor="itemCategory">Item Category *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="school-supplies">School Supplies</SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="hygiene-health">Hygiene & Health</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="itemDescription">Item Description *</Label>
                          <textarea
                            id="itemDescription"
                            className="w-full min-h-[120px] p-3 border border-input rounded-md resize-none"
                            placeholder="Please provide detailed information about the items you're donating (quantity, condition, brand, etc.)"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="itemCondition">Condition</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="like-new">Like New</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="deliveryPreference">Delivery Preference</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="How would you like to deliver the items?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pickup">Schedule Pickup</SelectItem>
                              <SelectItem value="dropoff">Drop Off at Office</SelectItem>
                              <SelectItem value="shipping">Ship Items</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          Submit Donation Request
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Guidelines */}
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Donation Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• All items should be in good or better condition</li>
                      <li>• Electronics should be functional and include necessary cables/chargers</li>
                      <li>• Clothing should be clean and appropriate for all ages</li>
                      <li>• We cannot accept expired medications or perishable items</li>
                      <li>• Large donations may require special coordination - please contact us first</li>
                      <li>• Tax-deductible receipts will be provided for eligible donations</li>
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
              <h2 className="text-4xl font-bold text-foreground mb-6">Financial Transparency</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe in complete transparency about how your donations are used to create maximum impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { percentage: "85%", label: "Program Services", description: "Direct impact on communities" },
                { percentage: "10%", label: "Administration", description: "Operational efficiency" },
                { percentage: "5%", label: "Fundraising", description: "Sustainable growth" },
                { percentage: "100%", label: "Transparency", description: "Full accountability" }
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

      <Footer />
    </div>
  );
};

export default Donate;