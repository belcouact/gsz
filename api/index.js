// API endpoint for Cloudflare D1 database access
export async function onRequest(context) {
  try {
    // Access the D1 database using the environment binding
    const db = context.env.DB;

    // Query the supplier_prod_data table with all relevant columns
    const result = await db.prepare(`
      SELECT SUPPLIER_NAME, YEAR_MONTH, PARAM, DATA 
      FROM supplier_prod_data 
      ORDER BY YEAR_MONTH DESC, SUPPLIER_NAME
      LIMIT 100
    `).all();

    // Return the results with CORS headers
    return new Response(JSON.stringify(result.results), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
} 