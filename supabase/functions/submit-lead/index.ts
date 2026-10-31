import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOTIFICATION_EMAIL = "contact@bulkwastepickup.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body = await req.json();
    const {
      name,
      company,
      email,
      phone,
      state,
      city,
      container_types,
      quantity,
      condition,
      description,
      photo_urls,
    } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        name,
        company: company || "",
        email,
        phone: phone || "",
        state: state || "",
        city: city || "",
        container_types: container_types || [],
        quantity: quantity || "",
        condition: condition || "",
        description: description || "",
        photo_urls: photo_urls || [],
        status: "new",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const containerTypeLabels: Record<string, string> = {
        ibc_totes: "IBC Totes",
        drums_55gal: "55 Gallon Drums",
        gaylord_boxes: "Gaylord Boxes",
        buckets_5gal: "5 Gallon Buckets",
      };

      const containerList = (container_types || [])
        .map((t: string) => containerTypeLabels[t] || t)
        .join(", ");

      const photoSection =
        photo_urls && photo_urls.length > 0
          ? `<p><strong>Photos (${photo_urls.length}):</strong><br>${photo_urls.map((url: string, i: number) => `<a href="${url}">Photo ${i + 1}</a>`).join(" | ")}</p>`
          : "<p><strong>Photos:</strong> None submitted</p>";

      const emailBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; }
  .header { background: #0f2942; color: white; padding: 24px; border-radius: 8px 8px 0 0; }
  .header h1 { margin: 0; font-size: 22px; }
  .body { background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; }
  .field { margin-bottom: 16px; }
  .field strong { color: #0f2942; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
  .field span { font-size: 16px; color: #1a202c; }
  .tag { display: inline-block; background: #f97316; color: white; padding: 3px 10px; border-radius: 999px; font-size: 12px; margin: 2px; }
  .footer { background: #0f2942; color: #94a3b8; padding: 16px 24px; font-size: 12px; border-radius: 0 0 8px 8px; }
  .cta { display: inline-block; background: #f97316; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px; }
</style></head>
<body>
  <div class="header">
    <h1>New Lead — Bulk Waste Pickup</h1>
    <p style="margin:4px 0 0;opacity:0.8;">Submitted via bulkwastepickup.com</p>
  </div>
  <div class="body">
    <div class="field"><strong>Contact Name</strong><span>${name}</span></div>
    <div class="field"><strong>Company</strong><span>${company || "Not provided"}</span></div>
    <div class="field"><strong>Email</strong><span><a href="mailto:${email}">${email}</a></span></div>
    <div class="field"><strong>Phone</strong><span><a href="tel:${phone}">${phone || "Not provided"}</a></span></div>
    <div class="field"><strong>Location</strong><span>${city ? city + ", " : ""}${state || "Not provided"}</span></div>
    <div class="field"><strong>Container Types</strong><span>${containerList || "Not specified"}</span></div>
    <div class="field"><strong>Estimated Quantity</strong><span>${quantity || "Not provided"}</span></div>
    <div class="field"><strong>Condition</strong><span>${condition || "Not provided"}</span></div>
    <div class="field"><strong>Additional Details</strong><span>${description || "None"}</span></div>
    ${photoSection}
    <div class="field"><strong>Lead ID</strong><span style="font-size:12px;color:#64748b;">${lead?.id}</span></div>
    <a class="cta" href="mailto:${email}?subject=Re: Container Pickup Quote from Bulk Waste Pickup">Reply to ${name}</a>
  </div>
  <div class="footer">Bulk Waste Pickup &mdash; bulkwastepickup.com</div>
</body>
</html>`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "leads@bulkwastepickup.com",
          to: [NOTIFICATION_EMAIL],
          reply_to: email,
          subject: `New Lead: ${name} from ${company || "Unknown Company"} — ${containerList || "Container Inquiry"}`,
          html: emailBody,
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true, lead_id: lead?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
