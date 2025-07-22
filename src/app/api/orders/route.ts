import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = req.url.split("?")[1];
  const referer = req.headers.get("referer");
  const origin = new URL(referer ?? "").origin;
  const aplicacaoid = url.searchParams.get("aplicacaoid") ?? "";
  const username = url.searchParams.get("username") ?? "";

  const res = await fetch(
    `${baseUrl}/api/v2/financeiro/faturas` + (params ? `?${params}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        aplicacaoid: aplicacaoid,
        username: username,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
