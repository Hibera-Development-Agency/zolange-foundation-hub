-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create profiles table for user information
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role app_role NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Create projects table
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    location TEXT,
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'paused', 'completed')),
    budget NUMERIC(12,2),
    beneficiaries INTEGER,
    duration_months INTEGER,
    start_date DATE,
    end_date DATE,
    category TEXT,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    image_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create team members table
CREATE TABLE public.team_members (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    email TEXT,
    linkedin_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteer positions table
CREATE TABLE public.volunteer_positions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location TEXT,
    time_commitment TEXT,
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_positions ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Create function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE user_id = _user_id
        AND role IN ('admin', 'editor')
    )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for projects
CREATE POLICY "Anyone can view projects" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Admin and editors can manage projects" ON public.projects
    FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for team members
CREATE POLICY "Anyone can view active team members" ON public.team_members
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admin and editors can view all team members" ON public.team_members
    FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editors can manage team members" ON public.team_members
    FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for volunteer positions
CREATE POLICY "Anyone can view active volunteer positions" ON public.volunteer_positions
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admin and editors can view all volunteer positions" ON public.volunteer_positions
    FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin and editors can manage volunteer positions" ON public.volunteer_positions
    FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
        'editor'
    );
    RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteer_positions_updated_at
    BEFORE UPDATE ON public.volunteer_positions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for team members
INSERT INTO public.team_members (name, position, description, display_order, is_active) VALUES
('Dr. Amina Zolange', 'Founder & CEO', 'Passionate advocate for global education and community development with over 15 years of experience.', 1, true),
('Marcus Johnson', 'Program Director', 'Oversees all field operations and ensures project quality across multiple countries.', 2, true),
('Sofia Martinez', 'Finance Manager', 'Manages foundation finances and ensures transparent allocation of donor funds.', 3, true),
('Dr. Kwame Asante', 'Regional Coordinator - Africa', 'Coordinates projects across West and East Africa, building local partnerships.', 4, true);

-- Insert sample data for volunteer positions
INSERT INTO public.volunteer_positions (title, description, requirements, location, time_commitment, category, is_active) VALUES
('Education Program Assistant', 'Help develop and implement educational programs in rural communities. Work directly with local teachers and students.', 'Background in education, fluent in English, willingness to travel', 'Ghana, Nigeria', '3-6 months', 'Education', true),
('Healthcare Volunteer', 'Support community health initiatives and basic medical care programs.', 'Medical background preferred, first aid certification required', 'Philippines, Kenya', '2-4 months', 'Healthcare', true),
('Project Coordinator', 'Manage logistics and coordinate between local teams and headquarters.', 'Project management experience, multilingual skills preferred', 'Remote/Various', 'Flexible', 'Management', true),
('Communications Specialist', 'Help document projects and create content for social media and reports.', 'Photography/videography skills, social media experience', 'Remote', 'Part-time', 'Communications', true);

-- Insert sample projects
INSERT INTO public.projects (title, description, slug, location, status, budget, beneficiaries, duration_months, category, completion_percentage) VALUES
('Education for All - Ghana', 'Comprehensive education program providing school supplies, teacher training, and infrastructure improvements in rural Ghana.', 'education-for-all-ghana', 'Ghana, West Africa', 'active', 50000, 2500, 18, 'education', 75),
('Community Healthcare Initiative', 'Mobile health clinics and community health worker training program serving remote villages.', 'community-healthcare-initiative', 'Nigeria, West Africa', 'active', 120000, 15000, 24, 'healthcare', 60),
('Clean Water Access', 'Installation of water wells and sanitation systems in rural communities.', 'clean-water-access', 'Philippines, Southeast Asia', 'completed', 80000, 8000, 12, 'infrastructure', 100),
('Emergency Relief Fund', 'Rapid response fund for natural disasters and humanitarian crises.', 'emergency-relief-fund', 'Various', 'active', 200000, 5000, 12, 'emergency-relief', 30);