import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request) {
  const url = new URL(req.url);
  const body = await req.json();
  const params = req.url.split("?")[1];
  const origin = req.headers.get("origin") ?? "";
  const aplicacaoid = url.searchParams.get("aplicacaoid") ?? "";
  const username = url.searchParams.get("username") ?? "";

  const res = await fetch(
    `${baseUrl}/api/v2/financeiro/retorno` + (params ? `?${params}` : ""),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        aplicacaoid: aplicacaoid,
        username: username,
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
