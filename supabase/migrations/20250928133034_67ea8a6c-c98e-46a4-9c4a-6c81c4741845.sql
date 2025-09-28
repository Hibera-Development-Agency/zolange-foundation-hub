-- Insert the first admin user (they will need to sign up with this email first)
-- The trigger will create the profile, then we update their role to admin

-- We can't directly insert into auth.users, so instead we'll create a function
-- that admins can call to promote a user to admin role

CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id UUID;
    current_user_role app_role;
BEGIN
    -- Check if the current user is already an admin
    SELECT role INTO current_user_role 
    FROM public.profiles 
    WHERE user_id = auth.uid();
    
    -- Allow promotion if no admin exists yet OR if current user is admin
    IF current_user_role = 'admin' OR NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
        -- Find the user by email
        SELECT user_id INTO target_user_id
        FROM public.profiles
        WHERE email = user_email;
        
        IF target_user_id IS NULL THEN
            RETURN 'User not found with email: ' || user_email;
        END IF;
        
        -- Update their role to admin
        UPDATE public.profiles
        SET role = 'admin'
        WHERE user_id = target_user_id;
        
        RETURN 'Successfully promoted ' || user_email || ' to admin';
    ELSE
        RETURN 'Only existing admins can promote users to admin';
    END IF;
END;
$$;

-- Create a public function to make the first admin (can only be called once)
CREATE OR REPLACE FUNCTION public.create_first_admin(user_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Only allow if no admin exists
    IF EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
        RETURN 'An admin already exists. Use promote_to_admin() function instead.';
    END IF;
    
    -- Find the user by email
    SELECT user_id INTO target_user_id
    FROM public.profiles
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RETURN 'User not found. Please sign up first with email: ' || user_email;
    END IF;
    
    -- Update their role to admin
    UPDATE public.profiles
    SET role = 'admin'
    WHERE user_id = target_user_id;
    
    RETURN 'Successfully created first admin: ' || user_email;
END;
$$;