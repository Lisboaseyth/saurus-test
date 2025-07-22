import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://api-pedido-erp-gateway-prod.saurus.net.br";

export async function GET(req: NextRequest) {
  const params = req.url.split("?")[1];
  const referer = req.headers.get("referer");
  const origin = new URL(referer ?? "").origin;

  const res = await fetch(
    `${baseUrl}/api/v2/aplicacoes` + (params ? `?${params}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
