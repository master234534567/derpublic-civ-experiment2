-- Remove the privilege escalation trigger and function
DROP TRIGGER IF EXISTS on_profile_ign_change ON public.profiles;
DROP FUNCTION IF EXISTS public.auto_assign_admin_role();