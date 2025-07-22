import { NextResponse } from "next/server";

const baseUrl = "https://api-pedido-erp-gateway-prod.saurus.net.br";

export async function POST(req: Request) {
  const body = await req.json();
  const origin = req.headers.get("origin") ?? "";

  const res = await fetch(`${baseUrl}/api/v2/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
