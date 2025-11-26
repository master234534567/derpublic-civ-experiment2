import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { discordUsername, submissionType, title, description, mediaLink } = await req.json();
    
    console.log("Received media submission:", { discordUsername, submissionType, title });

    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
    
    if (!webhookUrl) {
      throw new Error('Discord webhook URL not configured');
    }

    // Format the message for Discord
    const message = {
      content: `🎬 **New Media Submission Received!**\n\n**Discord Username:** ${discordUsername}\n**Submission Type:** ${submissionType}\n**Title:** ${title}\n**Description:** ${description || 'N/A'}\n**Media Link:** ${mediaLink}`,
    };

    console.log("Posting to Discord webhook");

    // Send to Discord
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord API error:", errorText);
      throw new Error(`Discord API error: ${discordResponse.status}`);
    }

    console.log("Successfully posted to Discord");

    return new Response(
      JSON.stringify({ success: true, message: 'Media submission sent to Discord' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in submit-media-submission function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
