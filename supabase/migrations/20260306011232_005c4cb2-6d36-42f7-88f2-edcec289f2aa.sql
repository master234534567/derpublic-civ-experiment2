
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  minecraft_username TEXT,
  privacy_show_profile BOOLEAN NOT NULL DEFAULT true,
  privacy_show_rank BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (privacy_show_profile = true OR auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create player_ranks table
CREATE TABLE public.player_ranks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  minecraft_username TEXT NOT NULL UNIQUE,
  rank TEXT NOT NULL DEFAULT 'Member',
  points INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.player_ranks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ranks are publicly readable" ON public.player_ranks FOR SELECT USING (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ranks_updated_at BEFORE UPDATE ON public.player_ranks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample rank data
INSERT INTO public.player_ranks (minecraft_username, rank, points) VALUES
  ('Steve_Builder', 'Elder', 1500),
  ('Alex_Warrior', 'Knight', 800),
  ('CreeperKing99', 'Member', 200),
  ('DiamondMiner42', 'Noble', 1100),
  ('RedstoneWiz', 'Elder', 1450);
