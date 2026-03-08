import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(jwt);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { username, email, minecraftUsername, experience, reason } = await req.json();

    // Validate inputs
    if (!username || username.length > 100) {
      return new Response(JSON.stringify({ error: 'Invalid username' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!email || email.length > 255) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!minecraftUsername || minecraftUsername.length > 50) {
      return new Response(JSON.stringify({ error: 'Invalid Minecraft username' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const safeExperience = (experience ?? '').slice(0, 500);
    const safeReason = (reason ?? '').slice(0, 1000);

    // Send to Discord webhook
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
    if (webhookUrl) {
      const safeUsername = username.replace(/@(everyone|here)/g, '@ $1');
      const message = {
        content: `📋 **New Server Application!**\n\n**Discord:** ${safeUsername}\n**Email:** ${email}\n**MC IGN:** ${minecraftUsername}\n**Experience:** ${safeExperience || 'N/A'}\n**Reason:** ${safeReason || 'N/A'}`,
      };
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
    }

    // Send email via Lovable AI
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    // Use the Supabase built-in email (inbucket) or send via fetch to a simple SMTP relay
    // For now, send via Discord webhook as primary + construct a mailto link response
    // The application data is already sent to Discord for the admin to see

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully! The server team will review it.' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Application submission error:', error);
    return new Response(
      JSON.stringify({ error: 'Submission failed. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
