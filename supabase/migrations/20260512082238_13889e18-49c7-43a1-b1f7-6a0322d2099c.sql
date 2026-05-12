
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Profiles
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role public.app_role NOT NULL DEFAULT 'editor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Projects
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    location TEXT,
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning','active','paused','completed')),
    budget NUMERIC(12,2),
    beneficiaries INTEGER,
    duration_months INTEGER,
    start_date DATE,
    end_date DATE,
    category TEXT,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
    image_urls TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

-- Team members
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Volunteer positions
CREATE TABLE public.volunteer_positions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location TEXT,
    time_commitment TEXT,
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_positions ENABLE ROW LEVEL SECURITY;

-- Role helpers
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = _user_id AND role IN ('admin','editor'))
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Projects policies
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin and editors can manage projects" ON public.projects
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- Team members policies
CREATE POLICY "Anyone can view active team members" ON public.team_members
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin and editors can view all team members" ON public.team_members
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin and editors can manage team members" ON public.team_members
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- Volunteer positions policies
CREATE POLICY "Anyone can view active volunteer positions" ON public.volunteer_positions
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin and editors can view all volunteer positions" ON public.volunteer_positions
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin and editors can manage volunteer positions" ON public.volunteer_positions
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- New user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email), 'editor');
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated-at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_volunteer_positions_updated_at BEFORE UPDATE ON public.volunteer_positions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Admin functions
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT)
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE target_user_id UUID; current_user_role public.app_role;
BEGIN
  SELECT role INTO current_user_role FROM public.profiles WHERE user_id = auth.uid();
  IF current_user_role = 'admin' OR NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
    SELECT user_id INTO target_user_id FROM public.profiles WHERE email = user_email;
    IF target_user_id IS NULL THEN RETURN 'User not found with email: ' || user_email; END IF;
    UPDATE public.profiles SET role = 'admin' WHERE user_id = target_user_id;
    RETURN 'Successfully promoted ' || user_email || ' to admin';
  ELSE
    RETURN 'Only existing admins can promote users to admin';
  END IF;
END; $$;

CREATE OR REPLACE FUNCTION public.create_first_admin(user_email TEXT)
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE target_user_id UUID;
BEGIN
  IF EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
    RETURN 'An admin already exists. Use promote_to_admin() function instead.';
  END IF;
  SELECT user_id INTO target_user_id FROM public.profiles WHERE email = user_email;
  IF target_user_id IS NULL THEN RETURN 'User not found. Please sign up first with email: ' || user_email; END IF;
  UPDATE public.profiles SET role = 'admin' WHERE user_id = target_user_id;
  RETURN 'Successfully created first admin: ' || user_email;
END; $$;

CREATE OR REPLACE FUNCTION public.admin_delete_user(user_id_to_delete UUID)
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_user_role public.app_role;
BEGIN
  SELECT role INTO current_user_role FROM public.profiles WHERE user_id = auth.uid();
  IF current_user_role != 'admin' THEN RAISE EXCEPTION 'Only admins can delete users'; END IF;
  IF user_id_to_delete = auth.uid() THEN RAISE EXCEPTION 'You cannot delete your own account'; END IF;
  DELETE FROM auth.users WHERE id = user_id_to_delete;
  RETURN 'User deleted successfully';
END; $$;

CREATE OR REPLACE FUNCTION public.admin_reset_user_password(target_user_id UUID, new_password TEXT)
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_user_role public.app_role; target_email TEXT;
BEGIN
  SELECT role INTO current_user_role FROM public.profiles WHERE user_id = auth.uid();
  IF current_user_role != 'admin' THEN RAISE EXCEPTION 'Only admins can reset passwords'; END IF;
  SELECT email INTO target_email FROM public.profiles WHERE user_id = target_user_id;
  IF target_email IS NULL THEN RAISE EXCEPTION 'User not found'; END IF;
  UPDATE auth.users SET encrypted_password = crypt(new_password, gen_salt('bf')), updated_at = now() WHERE id = target_user_id;
  RETURN 'Password reset successfully for ' || target_email;
END; $$;

-- Storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES
  ('project-images','project-images', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm']),
  ('team-images','team-images', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view project images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Admins and editors can upload project images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins and editors can update project images" ON storage.objects FOR UPDATE USING (bucket_id = 'project-images' AND public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins and editors can delete project images" ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Anyone can view team images" ON storage.objects FOR SELECT USING (bucket_id = 'team-images');
CREATE POLICY "Admins and editors can upload team images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'team-images' AND public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins and editors can update team images" ON storage.objects FOR UPDATE USING (bucket_id = 'team-images' AND public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins and editors can delete team images" ON storage.objects FOR DELETE USING (bucket_id = 'team-images' AND public.is_admin_or_editor(auth.uid()));

-- Seed data
INSERT INTO public.team_members (name, position, description, display_order, is_active) VALUES
('Dr. Amina Zolange','Founder & CEO','Passionate advocate for global education and community development with over 15 years of experience.',1,true),
('Marcus Johnson','Program Director','Oversees all field operations and ensures project quality across multiple countries.',2,true),
('Sofia Martinez','Finance Manager','Manages foundation finances and ensures transparent allocation of donor funds.',3,true),
('Dr. Kwame Asante','Regional Coordinator - Africa','Coordinates projects across West and East Africa, building local partnerships.',4,true);

INSERT INTO public.volunteer_positions (title, description, requirements, location, time_commitment, category, is_active) VALUES
('Education Program Assistant','Help develop and implement educational programs in rural communities. Work directly with local teachers and students.','Background in education, fluent in English, willingness to travel','Ghana, Nigeria','3-6 months','Education',true),
('Healthcare Volunteer','Support community health initiatives and basic medical care programs.','Medical background preferred, first aid certification required','Philippines, Kenya','2-4 months','Healthcare',true),
('Project Coordinator','Manage logistics and coordinate between local teams and headquarters.','Project management experience, multilingual skills preferred','Remote/Various','Flexible','Management',true),
('Communications Specialist','Help document projects and create content for social media and reports.','Photography/videography skills, social media experience','Remote','Part-time','Communications',true);

INSERT INTO public.projects (title, description, slug, location, status, budget, beneficiaries, duration_months, category, completion_percentage) VALUES
('Education for All - Ghana','Comprehensive education program providing school supplies, teacher training, and infrastructure improvements in rural Ghana.','education-for-all-ghana','Ghana, West Africa','active',50000,2500,18,'education',75),
('Community Healthcare Initiative','Mobile health clinics and community health worker training program serving remote villages.','community-healthcare-initiative','Nigeria, West Africa','active',120000,15000,24,'healthcare',60),
('Clean Water Access','Installation of water wells and sanitation systems in rural communities.','clean-water-access','Philippines, Southeast Asia','completed',80000,8000,12,'infrastructure',100),
('Emergency Relief Fund','Rapid response fund for natural disasters and humanitarian crises.','emergency-relief-fund','Various','active',200000,5000,12,'emergency-relief',30);
