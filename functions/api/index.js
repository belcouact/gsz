// API endpoint for Cloudflare D1 database access
export async function onRequest(context) {
  // Handle CORS preflight requests
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    // Check if DB binding exists
    if (!context.env.DB) {
      throw new Error('Database binding "DB" not found. Please check your Cloudflare Pages D1 database bindings.');
    }

    // Access the D1 database using the environment binding
    const db = context.env.DB;

    // Query the supplier_prod_data table with all relevant columns
    const result = await db.prepare(`
      SELECT SUPPLIER_NAME, YEAR_MONTH, PARAM, DATA 
      FROM supplier_prod_data 
      ORDER BY YEAR_MONTH DESC, SUPPLIER_NAME
      LIMIT 100
    `).all();

    // Check if results exist
    if (!result || !result.results) {
      return new Response(JSON.stringify([]), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Return the results with CORS headers
    return new Response(JSON.stringify(result.results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "If you're seeing a database binding error, please ensure the D1 database is properly bound in your Cloudflare Pages settings."
      }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
} 