import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { chartData } = await req.json();

    if (!chartData || chartData.length === 0) {
      return NextResponse.json({ error: "No chart data provided" }, { status: 400 });
    }

    const prompt = `Analyze the following KPI data and provide insights:\n${JSON.stringify(chartData)}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "AI request failed");
    }

    const aiText = data.choices[0]?.message?.content || "No insights generated";

    return NextResponse.json({ insights: aiText });
  } catch (err: any) {
    console.error("Error generating insights:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
