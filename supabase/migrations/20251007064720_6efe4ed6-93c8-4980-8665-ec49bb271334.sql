-- Create storage buckets for project and team images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-images', 'project-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']),
  ('team-images', 'team-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for project images
CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Admins and editors can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images' 
  AND is_admin_or_editor(auth.uid())
);

-- Storage policies for team images
CREATE POLICY "Anyone can view team images"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-images');

CREATE POLICY "Admins and editors can upload team images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'team-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can update team images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'team-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can delete team images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'team-images' 
  AND is_admin_or_editor(auth.uid())
);