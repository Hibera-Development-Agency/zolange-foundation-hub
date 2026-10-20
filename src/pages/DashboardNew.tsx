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
import { Plus, Edit, Trash2, Eye, Users, DollarSign, Calendar, MapPin, LogOut, Loader2, Upload } from "lucide-react";

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
  image_urls?: string[];
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

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'editor';
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut, canManage } = useAuth();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [volunteerPositions, setVolunteerPositions] = useState<VolunteerPosition[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'project' | 'team' | 'volunteer' | 'user' | null>(null);
  const [newUserPassword, setNewUserPassword] = useState('');
  const [resetPasswordUser, setResetPasswordUser] = useState<UserProfile | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [teamMemberImage, setTeamMemberImage] = useState<string>('');

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

      // Fetch users if admin
      if (profile?.role === 'admin') {
        const { data: usersData } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (usersData) setUsers(usersData);
      }
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

  const uploadImage = async (file: File, bucket: string): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: error.message,
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i], 'project-images');
      if (url) uploadedUrls.push(url);
    }

    setProjectImages([...projectImages, ...uploadedUrls]);
  };

  const handleTeamImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file, 'team-images');
    if (url) setTeamMemberImage(url);
  };

  const removeProjectImage = (index: number) => {
    setProjectImages(projectImages.filter((_, i) => i !== index));
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
      const projectData: any = {
        title: formData.get('title') as string,
        title_fr: (formData.get('title_fr') as string) || null,
        description: formData.get('description') as string,
        description_fr: (formData.get('description_fr') as string) || null,
        slug: createSlug(formData.get('title') as string || ''),
        location: formData.get('location') as string,
        location_fr: (formData.get('location_fr') as string) || null,
        status: formData.get('status') as string,
        budget: parseFloat(formData.get('budget') as string) || null,
        beneficiaries: parseInt(formData.get('beneficiaries') as string) || null,
        duration_months: parseInt(formData.get('duration_months') as string) || null,
        category: formData.get('category') as string,
        category_fr: (formData.get('category_fr') as string) || null,
        completion_percentage: parseInt(formData.get('completion_percentage') as string) || 0,
      };

      // Add images if any were uploaded
      if (projectImages.length > 0) {
        projectData.image_urls = editingItem?.image_urls 
          ? [...editingItem.image_urls, ...projectImages]
          : projectImages;
      }

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
      setProjectImages([]);
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
      const memberData: any = {
        name: formData.get('name') as string,
        position: formData.get('position') as string,
        position_fr: (formData.get('position_fr') as string) || null,
        description: formData.get('description') as string,
        description_fr: (formData.get('description_fr') as string) || null,
        email: formData.get('email') as string,
        linkedin_url: formData.get('linkedin_url') as string,
        display_order: parseInt(formData.get('display_order') as string) || 0,
        is_active: formData.get('is_active') === 'true',
      };

      // Add image if uploaded
      if (teamMemberImage) {
        memberData.image_url = teamMemberImage;
      }

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
      setTeamMemberImage('');
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
        title_fr: (formData.get('title_fr') as string) || null,
        description: formData.get('description') as string,
        description_fr: (formData.get('description_fr') as string) || null,
        requirements: formData.get('requirements') as string,
        requirements_fr: (formData.get('requirements_fr') as string) || null,
        location: formData.get('location') as string,
        location_fr: (formData.get('location_fr') as string) || null,
        time_commitment: formData.get('time_commitment') as string,
        time_commitment_fr: (formData.get('time_commitment_fr') as string) || null,
        category: formData.get('category') as string,
        category_fr: (formData.get('category_fr') as string) || null,
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

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      if (editingItem) {
        // Update existing user
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: formData.get('full_name') as string,
            role: formData.get('role') as 'admin' | 'editor',
          })
          .eq('user_id', editingItem.user_id);
        
        if (error) throw error;
        toast({ title: "Success", description: "User updated successfully" });
      } else {
        // Create new user
        const email = formData.get('email') as string;
        const password = newUserPassword;
        const fullName = formData.get('full_name') as string;
        const role = formData.get('role') as 'admin' | 'editor';

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: undefined,
          },
        });

        if (authError) throw authError;

        if (role === 'admin' && authData.user) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('user_id', authData.user.id);
          
          if (updateError) throw updateError;
        }

        toast({ title: "Success", description: "User created successfully" });
      }
      
      fetchData();
      setEditingItem(null);
      setEditingType(null);
      setNewUserPassword('');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: string, table: string, userId?: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      // Special handling for user deletion
      if (table === 'profiles' && userId) {
        const { error } = await supabase.rpc('admin_delete_user', { 
          user_id_to_delete: userId 
        });
        
        if (error) throw error;
        toast({ title: "Success", description: "User deleted successfully" });
      } else {
        const { error } = await supabase
          .from(table as any)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Item deleted successfully" });
      }
      
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error", 
        description: error.message,
      });
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resetPasswordUser) return;

    try {
      const { error } = await supabase.rpc('admin_reset_user_password', {
        target_user_id: resetPasswordUser.user_id,
        new_password: resetPassword
      });

      if (error) throw error;
      
      toast({ 
        title: "Success", 
        description: `Password reset for ${resetPasswordUser.email}` 
      });
      
      setResetPasswordUser(null);
      setResetPassword('');
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
              <TabsList className={`grid w-full mb-8 ${profile?.role === 'admin' ? 'grid-cols-4' : 'grid-cols-3'}`}>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="team">Team Members</TabsTrigger>
                <TabsTrigger value="volunteers">Volunteer Positions</TabsTrigger>
                {profile?.role === 'admin' && (
                  <TabsTrigger value="users">User Management</TabsTrigger>
                )}
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

              {/* User Management (Admin Only) */}
              {profile?.role === 'admin' && (
                <TabsContent value="users" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-foreground">User Management</h2>
                    <Button 
                      onClick={() => {
                        setEditingItem(null);
                        setEditingType('user');
                        setNewUserPassword('');
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {users.map((userProfile) => (
                      <Card key={userProfile.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-primary mb-1">
                                {userProfile.full_name || 'No name'}
                              </h3>
                              <p className="text-muted-foreground mb-2">{userProfile.email}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant={userProfile.role === "admin" ? "default" : "secondary"}>
                                  {userProfile.role}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  Created: {new Date(userProfile.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setResetPasswordUser(userProfile);
                                  setResetPassword('');
                                }}
                              >
                                Reset Password
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setEditingItem(userProfile);
                                  setEditingType('user');
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => handleDelete(userProfile.id, 'profiles', userProfile.user_id)}
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
              )}
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
          setProjectImages([]);
          setTeamMemberImage('');
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add'} {
                editingType === 'project' ? 'Project' :
                editingType === 'team' ? 'Team Member' : 
                editingType === 'user' ? 'User' : 'Volunteer Position'
              }
            </DialogTitle>
            {editingType === 'user' && !editingItem && (
              <DialogDescription>
                Create a new user account. No email confirmation required - they can sign in immediately.
              </DialogDescription>
            )}
          </DialogHeader>
          
          {editingType === 'project' && (
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <Label htmlFor="title">Title (English) *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  defaultValue={editingItem?.title || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="title_fr">Title (French)</Label>
                <Input 
                  id="title_fr" 
                  name="title_fr" 
                  defaultValue={editingItem?.title_fr || ''} 
                  placeholder="Leave empty to use the English title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (English)</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  defaultValue={editingItem?.description || ''} 
                />
              </div>
              <div>
                <Label htmlFor="description_fr">Description (French)</Label>
                <Textarea 
                  id="description_fr" 
                  name="description_fr" 
                  defaultValue={editingItem?.description_fr || ''} 
                  placeholder="Leave empty to use the English description"
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
              <div>
                <Label htmlFor="location_fr">Location (French)</Label>
                <Input 
                  id="location_fr" 
                  name="location_fr" 
                  defaultValue={editingItem?.location_fr || ''} 
                  placeholder="Leave empty to use the English location"
                />
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
              <div>
                <Label htmlFor="category_fr">Category (French)</Label>
                <Input 
                  id="category_fr" 
                  name="category_fr" 
                  defaultValue={editingItem?.category_fr || ''} 
                  placeholder="e.g. Éducation — leave empty to use the English category"
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4 border-t pt-4">
                <Label>Project Images</Label>
                <p className="text-sm text-muted-foreground">
                  Upload images for the project. The first image will be the cover image.
                </p>
                
                {editingItem?.image_urls && editingItem.image_urls.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Existing Images:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {editingItem.image_urls.map((url: string, idx: number) => (
                        <div key={idx} className="relative">
                          <img src={url} alt={`Project ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                          {idx === 0 && (
                            <Badge className="absolute top-1 left-1 text-xs">Cover</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projectImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">New Images:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {projectImages.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                            onClick={() => removeProjectImage(idx)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleProjectImageUpload}
                  disabled={uploadingImage}
                />
                {uploadingImage && <p className="text-sm text-muted-foreground">Uploading...</p>}
              </div>

              <Button type="submit" className="w-full" disabled={uploadingImage}>
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
                <Label htmlFor="position">Position (English) *</Label>
                <Input 
                  id="position" 
                  name="position" 
                  defaultValue={editingItem?.position || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="position_fr">Position (French)</Label>
                <Input 
                  id="position_fr" 
                  name="position_fr" 
                  defaultValue={editingItem?.position_fr || ''} 
                  placeholder="Leave empty to use the English position"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (English)</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  defaultValue={editingItem?.description || ''} 
                />
              </div>
              <div>
                <Label htmlFor="description_fr">Description (French)</Label>
                <Textarea 
                  id="description_fr" 
                  name="description_fr" 
                  defaultValue={editingItem?.description_fr || ''} 
                  placeholder="Leave empty to use the English description"
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

              {/* Image Upload Section */}
              <div className="space-y-4 border-t pt-4">
                <Label>Team Member Photo</Label>
                
                {editingItem?.image_url && (
                  <div>
                    <p className="text-sm font-medium mb-2">Current Photo:</p>
                    <img src={editingItem.image_url} alt={editingItem.name} className="w-32 h-32 object-cover rounded" />
                  </div>
                )}

                {teamMemberImage && (
                  <div>
                    <p className="text-sm font-medium mb-2">New Photo:</p>
                    <div className="relative inline-block">
                      <img src={teamMemberImage} alt="Upload preview" className="w-32 h-32 object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                        onClick={() => setTeamMemberImage('')}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                )}

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleTeamImageUpload}
                  disabled={uploadingImage}
                />
                {uploadingImage && <p className="text-sm text-muted-foreground">Uploading...</p>}
              </div>

              <Button type="submit" className="w-full" disabled={uploadingImage}>
                {editingItem ? 'Update' : 'Add'} Team Member
              </Button>
            </form>
          )}

          {editingType === 'volunteer' && (
            <form onSubmit={handleSaveVolunteerPosition} className="space-y-4">
              <div>
                <Label htmlFor="title">Title (English) *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  defaultValue={editingItem?.title || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="title_fr">Title (French)</Label>
                <Input 
                  id="title_fr" 
                  name="title_fr" 
                  defaultValue={editingItem?.title_fr || ''} 
                  placeholder="Leave empty to use the English title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (English) *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  defaultValue={editingItem?.description || ''} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="description_fr">Description (French)</Label>
                <Textarea 
                  id="description_fr" 
                  name="description_fr" 
                  defaultValue={editingItem?.description_fr || ''} 
                  placeholder="Leave empty to use the English description"
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements (English)</Label>
                <Textarea 
                  id="requirements" 
                  name="requirements" 
                  defaultValue={editingItem?.requirements || ''} 
                />
              </div>
              <div>
                <Label htmlFor="requirements_fr">Requirements (French)</Label>
                <Textarea 
                  id="requirements_fr" 
                  name="requirements_fr" 
                  defaultValue={editingItem?.requirements_fr || ''} 
                  placeholder="Leave empty to use the English requirements"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location_fr">Location (French)</Label>
                  <Input 
                    id="location_fr" 
                    name="location_fr" 
                    defaultValue={editingItem?.location_fr || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="time_commitment_fr">Time Commitment (French)</Label>
                  <Input 
                    id="time_commitment_fr" 
                    name="time_commitment_fr" 
                    defaultValue={editingItem?.time_commitment_fr || ''} 
                  />
                </div>
                <div>
                  <Label htmlFor="category_fr">Category (French)</Label>
                  <Input 
                    id="category_fr" 
                    name="category_fr" 
                    defaultValue={editingItem?.category_fr || ''} 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Add'} Position
              </Button>
            </form>
          )}

          {editingType === 'user' && (
            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input 
                  id="full_name" 
                  name="full_name" 
                  defaultValue={editingItem?.full_name || ''} 
                  required 
                />
              </div>
              {!editingItem && (
                <>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required 
                      minLength={6}
                    />
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select name="role" defaultValue={editingItem?.role || 'editor'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Create'} User
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog open={resetPasswordUser !== null} onOpenChange={() => setResetPasswordUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Set a new password for {resetPasswordUser?.email}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="new-password">New Password *</Label>
              <Input
                id="new-password"
                type="text"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Minimum 6 characters. Share this password securely with the user.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setResetPasswordUser(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Reset Password</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Dashboard;