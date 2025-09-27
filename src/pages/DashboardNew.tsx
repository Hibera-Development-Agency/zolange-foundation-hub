import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Users, DollarSign, Calendar, MapPin, LogOut, Loader2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  location: string;
  status: string;
  budget: number;
  beneficiaries: number;
  duration_months: number;
  start_date: string;
  end_date: string;
  category: string;
  completion_percentage: number;
  created_at: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image_url: string;
  email: string;
  linkedin_url: string;
  display_order: number;
  is_active: boolean;
}

interface VolunteerPosition {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  time_commitment: string;
  category: string;
  is_active: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut, canManage } = useAuth();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [volunteerPositions, setVolunteerPositions] = useState<VolunteerPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'project' | 'team' | 'volunteer' | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || !canManage()) {
      navigate("/auth");
      return;
    }
    
    fetchData();
  }, [user, authLoading, canManage, navigate]);

  const fetchData = async () => {
    try {
      const [projectsRes, teamRes, volunteerRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('team_members').select('*').order('display_order'),
        supabase.from('volunteer_positions').select('*').order('created_at', { ascending: false })
      ]);

      if (projectsRes.data) setProjects(projectsRes.data);
      if (teamRes.data) setTeamMembers(teamRes.data);
      if (volunteerRes.data) setVolunteerPositions(volunteerRes.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate("/");
    }
  };

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const projectData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        slug: createSlug(formData.get('title') as string || ''),
        location: formData.get('location') as string,
        status: formData.get('status') as string,
        budget: parseFloat(formData.get('budget') as string) || null,
        beneficiaries: parseInt(formData.get('beneficiaries') as string) || null,
        duration_months: parseInt(formData.get('duration_months') as string) || null,
        category: formData.get('category') as string,
        completion_percentage: parseInt(formData.get('completion_percentage') as string) || 0,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Project updated successfully" });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert({ ...projectData, created_by: user?.id });
        
        if (error) throw error;
        toast({ title: "Success", description: "Project created successfully" });
      }
      
      fetchData();
      setEditingItem(null);
      setEditingType(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleSaveTeamMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const memberData = {
        name: formData.get('name') as string,
        position: formData.get('position') as string,
        description: formData.get('description') as string,
        email: formData.get('email') as string,
        linkedin_url: formData.get('linkedin_url') as string,
        display_order: parseInt(formData.get('display_order') as string) || 0,
        is_active: formData.get('is_active') === 'true',
      };

      if (editingItem) {
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Team member updated successfully" });
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert(memberData);
        
        if (error) throw error;
        toast({ title: "Success", description: "Team member added successfully" });
      }
      
      fetchData();
      setEditingItem(null);
      setEditingType(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleSaveVolunteerPosition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const positionData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        requirements: formData.get('requirements') as string,
        location: formData.get('location') as string,
        time_commitment: formData.get('time_commitment') as string,
        category: formData.get('category') as string,
        is_active: formData.get('is_active') === 'true',
      };

      if (editingItem) {
        const { error } = await supabase
          .from('volunteer_positions')
          .update(positionData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Volunteer position updated successfully" });
      } else {
        const { error } = await supabase
          .from('volunteer_positions')
          .insert(positionData);
        
        if (error) throw error;
        toast({ title: "Success", description: "Volunteer position added successfully" });
      }
      
      fetchData();
      setEditingItem(null);
      setEditingType(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Item deleted successfully" });
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error", 
        description: error.message,
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-hero-gradient text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-white/80">
                  Welcome {profile?.full_name || profile?.email} ({profile?.role})
                </p>
              </div>
              <Button variant="secondary" onClick={handleSignOut}>
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 -mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
                      <p className="text-3xl font-bold">{projects.length}</p>
                    </div>
                    <DollarSign className="w-12 h-12 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Team Members</p>
                      <p className="text-3xl font-bold">{teamMembers.length}</p>
                    </div>
                    <Users className="w-12 h-12 text-secondary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
                      <p className="text-3xl font-bold">{projects.filter(p => p.status === 'active').length}</p>
                    </div>
                    <Calendar className="w-12 h-12 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Volunteer Positions</p>
                      <p className="text-3xl font-bold">{volunteerPositions.length}</p>
                    </div>
                    <MapPin className="w-12 h-12 text-secondary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Dashboard Tabs */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="team">Team Members</TabsTrigger>
                <TabsTrigger value="volunteers">Volunteer Positions</TabsTrigger>
              </TabsList>

              {/* Projects */}
              <TabsContent value="projects" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Projects Management</h2>
                  <Button 
                    onClick={() => {
                      setEditingItem(null);
                      setEditingType('project');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary mb-2">{project.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {project.location}
                              </div>
                              {project.beneficiaries && (
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {project.beneficiaries.toLocaleString()} beneficiaries
                                </div>
                              )}
                              {project.budget && (
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  €{project.budget.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={project.status === "active" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{project.completion_percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${project.completion_percentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Created: {new Date(project.created_at).toLocaleDateString()}
                          </span>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setEditingItem(project);
                                setEditingType('project');
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDelete(project.id, 'projects')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Team Members */}
              <TabsContent value="team" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Team Members</h2>
                  <Button 
                    onClick={() => {
                      setEditingItem(null);
                      setEditingType('team');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                        <p className="text-primary font-medium mb-2">{member.position}</p>
                        <p className="text-sm text-muted-foreground mb-4">{member.description}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant={member.is_active ? "default" : "secondary"}>
                            {member.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setEditingItem(member);
                                setEditingType('team');
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDelete(member.id, 'team_members')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Volunteer Positions */}
              <TabsContent value="volunteers" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">Volunteer Positions</h2>
                  <Button 
                    onClick={() => {
                      setEditingItem(null);
                      setEditingType('volunteer');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Position
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {volunteerPositions.map((position) => (
                    <Card key={position.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary mb-2">{position.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{position.location} • {position.time_commitment}</p>
                          </div>
                          <Badge variant={position.is_active ? "default" : "secondary"}>
                            {position.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm mb-4">{position.description}</p>
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setEditingItem(position);
                              setEditingType('volunteer');
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleDelete(position.id, 'volunteer_positions')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Edit Dialogs */}
      <Dialog 
        open={editingType !== null} 
        onOpenChange={() => {
          setEditingType(null);
          setEditingItem(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add'} {
                editingType === 'project' ? 'Project' :
                editingType === 'team' ? 'Team Member' : 'Volunteer Position'
              }
            </DialogTitle>
          </DialogHeader>
          
          {editingType === 'project' && (
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  defaultValue={editingItem?.title || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  defaultValue={editingItem?.description || ''} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    defaultValue={editingItem?.location || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingItem?.status || 'planning'}>
                    <SelectTrigger>
                      <SelectValue />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="budget">Budget (EUR)</Label>
                  <Input 
                    id="budget" 
                    name="budget" 
                    type="number" 
                    defaultValue={editingItem?.budget || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiaries">Beneficiaries</Label>
                  <Input 
                    id="beneficiaries" 
                    name="beneficiaries" 
                    type="number" 
                    defaultValue={editingItem?.beneficiaries || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="completion_percentage">Progress %</Label>
                  <Input 
                    id="completion_percentage" 
                    name="completion_percentage" 
                    type="number" 
                    min="0" 
                    max="100" 
                    defaultValue={editingItem?.completion_percentage || 0} 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingItem?.category || ''}>
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
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Create'} Project
              </Button>
            </form>
          )}

          {editingType === 'team' && (
            <form onSubmit={handleSaveTeamMember} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={editingItem?.name || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input 
                  id="position" 
                  name="position" 
                  defaultValue={editingItem?.position || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  defaultValue={editingItem?.description || ''} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    defaultValue={editingItem?.email || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input 
                    id="display_order" 
                    name="display_order" 
                    type="number" 
                    defaultValue={editingItem?.display_order || 0} 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input 
                  id="linkedin_url" 
                  name="linkedin_url" 
                  defaultValue={editingItem?.linkedin_url || ''} 
                />
              </div>
              <div>
                <Label htmlFor="is_active">Status</Label>
                <Select name="is_active" defaultValue={editingItem?.is_active ? 'true' : 'false'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Add'} Team Member
              </Button>
            </form>
          )}

          {editingType === 'volunteer' && (
            <form onSubmit={handleSaveVolunteerPosition} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  defaultValue={editingItem?.title || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  defaultValue={editingItem?.description || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea 
                  id="requirements" 
                  name="requirements" 
                  defaultValue={editingItem?.requirements || ''} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    defaultValue={editingItem?.location || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="time_commitment">Time Commitment</Label>
                  <Input 
                    id="time_commitment" 
                    name="time_commitment" 
                    defaultValue={editingItem?.time_commitment || ''} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    defaultValue={editingItem?.category || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="is_active">Status</Label>
                  <Select name="is_active" defaultValue={editingItem?.is_active ? 'true' : 'false'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Add'} Position
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Dashboard;