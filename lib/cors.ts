import { NextRequest, NextResponse } from "next/server";

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "",
];

// Development environment check
const isDevelopment = process.env.NODE_ENV === "development";

export function corsMiddleware(req: NextRequest) {
  // Get the origin from the request headers
  console.log("CORS Middleware Invoked");
  console.log("Request Headers:", req.headers);
  const origin = req.headers.get("origin") || "";

  // In development, allow localhost
  if (isDevelopment) {
    return NextResponse.json(
      { error: "CORS check passed (development mode)" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }

  // Check if the origin is allowed
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: "Not allowed by CORS" },
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Return successful preflight response
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

export function applyCors(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  console.log("CORS logic invoked");
  
  // Handle OPTIONS request (preflight)
  if (req.method === "OPTIONS") {
    return corsMiddleware(req);
  }

  const origin = req.headers.get("origin") || "";
  console.log("Request Origin:", origin);

  // In development, allow all origins
  if (isDevelopment) {
    return handler(req).then((response) => {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      response.headers.set("Access-Control-Allow-Credentials", "true");
      return response;
    });
  }

  // Check if the origin is allowed
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Not allowed by CORS" }, { status: 403 });
  }

  // Process the request with the handler
  return handler(req).then((response) => {
    // Add CORS headers to the response
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
  });
}
