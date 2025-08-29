import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Users, DollarSign, Calendar, MapPin } from "lucide-react";

const Dashboard = () => {
  const projects = [
    {
      id: 1,
      title: "Education for All - Ghana",
      status: "Active",
      location: "Ghana, West Africa",
      beneficiaries: 2500,
      budget: 50000,
      startDate: "2024-01-15",
      completion: 75
    },
    {
      id: 2,
      title: "Community Healthcare Initiative",
      status: "Active",
      location: "Nigeria, West Africa", 
      beneficiaries: 15000,
      budget: 120000,
      startDate: "2024-03-01",
      completion: 60
    },
    {
      id: 3,
      title: "Clean Water Access",
      status: "Completed",
      location: "Philippines, Southeast Asia",
      beneficiaries: 8000,
      budget: 80000,
      startDate: "2023-06-01",
      completion: 100
    }
  ];

  const stats = [
    { icon: Users, label: "Total Beneficiaries", value: "25,500+", color: "text-primary" },
    { icon: DollarSign, label: "Funds Raised", value: "€250K", color: "text-secondary" },
    { icon: Calendar, label: "Active Projects", value: "12", color: "text-primary" },
    { icon: MapPin, label: "Countries", value: "8", color: "text-secondary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-hero-gradient text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Project Dashboard</h1>
                <p className="text-white/80">Manage and monitor all Zolange Foundation projects</p>
              </div>
              <Button variant="secondary" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 -mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-12 h-12 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Tabs */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="add-project">Add Project</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Projects List */}
              <TabsContent value="projects" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">All Projects</h2>
                  <div className="flex space-x-2">
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary mb-2">{project.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {project.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {project.beneficiaries.toLocaleString()} beneficiaries
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                €{project.budget.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{project.completion}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Started: {new Date(project.startDate).toLocaleDateString()}
                          </span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Add New Project */}
              <TabsContent value="add-project">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Add New Project</CardTitle>
                    <p className="text-muted-foreground">
                      Create a new project to showcase your foundation's work.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div>
                        <Label htmlFor="projectTitle">Project Title *</Label>
                        <Input id="projectTitle" placeholder="Enter project title" required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="projectLocation">Location *</Label>
                          <Input id="projectLocation" placeholder="Country, Region" required />
                        </div>
                        <div>
                          <Label htmlFor="projectStatus">Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="planning">Planning</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="paused">Paused</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="projectDescription">Project Description *</Label>
                        <Textarea 
                          id="projectDescription" 
                          placeholder="Describe the project goals, activities, and expected outcomes..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="projectBudget">Budget (EUR)</Label>
                          <Input id="projectBudget" type="number" placeholder="50000" />
                        </div>
                        <div>
                          <Label htmlFor="projectBeneficiaries">Beneficiaries</Label>
                          <Input id="projectBeneficiaries" type="number" placeholder="1000" />
                        </div>
                        <div>
                          <Label htmlFor="projectDuration">Duration (months)</Label>
                          <Input id="projectDuration" type="number" placeholder="12" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="projectStart">Start Date</Label>
                          <Input id="projectStart" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="projectEnd">Expected End Date</Label>
                          <Input id="projectEnd" type="date" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="projectCategory">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="community-development">Community Development</SelectItem>
                            <SelectItem value="emergency-relief">Emergency Relief</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="projectImages">Project Images</Label>
                        <Input id="projectImages" type="file" multiple accept="image/*" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload images to showcase your project (max 5 files, 10MB each)
                        </p>
                      </div>

                      <div className="flex space-x-4">
                        <Button type="submit" className="flex-1">
                          Create Project
                        </Button>
                        <Button type="button" variant="outline" className="flex-1">
                          Save as Draft
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics */}
              <TabsContent value="analytics">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">Project Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Analytics dashboard coming soon. This will include project performance metrics, 
                        donation tracking, beneficiary impact reports, and more.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">Dashboard Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Dashboard configuration options will be available here, including user permissions, 
                        notification preferences, and data export settings.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;