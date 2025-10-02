-- Create a function to delete users (admin only)
CREATE OR REPLACE FUNCTION public.admin_delete_user(user_id_to_delete UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role app_role;
BEGIN
  -- Check if current user is admin
  SELECT role INTO current_user_role
  FROM public.profiles
  WHERE user_id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can delete users';
  END IF;
  
  -- Prevent self-deletion
  IF user_id_to_delete = auth.uid() THEN
    RAISE EXCEPTION 'You cannot delete your own account';
  END IF;
  
  -- Delete from auth.users (will cascade to profiles)
  DELETE FROM auth.users WHERE id = user_id_to_delete;
  
  RETURN 'User deleted successfully';
END;
$$;

-- Create a function to reset user password (admin only)
CREATE OR REPLACE FUNCTION public.admin_reset_user_password(
  target_user_id UUID,
  new_password TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role app_role;
  target_email TEXT;
BEGIN
  -- Check if current user is admin
  SELECT role INTO current_user_role
  FROM public.profiles
  WHERE user_id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can reset passwords';
  END IF;
  
  -- Get user email
  SELECT email INTO target_email
  FROM public.profiles
  WHERE user_id = target_user_id;
  
  IF target_email IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Update password in auth.users
  UPDATE auth.users 
  SET 
    encrypted_password = crypt(new_password, gen_salt('bf')),
    updated_at = now()
  WHERE id = target_user_id;
  
  RETURN 'Password reset successfully for ' || target_email;
END;
$$;