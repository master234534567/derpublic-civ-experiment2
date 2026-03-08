
-- Add image_url column to chat_messages for media support
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS image_url text;

-- Create events table for upcoming events
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date timestamp with time zone NOT NULL,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Everyone can read events
CREATE POLICY "Events readable by all" ON public.events FOR SELECT USING (true);

-- Only admins can manage events
CREATE POLICY "Admins can insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for chat media
INSERT INTO storage.buckets (id, name, public) VALUES ('chat-media', 'chat-media', true);

-- Storage RLS: authenticated users can upload
CREATE POLICY "Authenticated users can upload chat media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'chat-media');

-- Anyone can view chat media
CREATE POLICY "Anyone can view chat media" ON storage.objects FOR SELECT USING (bucket_id = 'chat-media');

-- Users can delete their own uploads
CREATE POLICY "Users can delete own chat media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'chat-media' AND (storage.foldername(name))[1] = auth.uid()::text);
