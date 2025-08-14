import { NextResponse } from "next/server";

type ChartDataPoint = {
  date: string;
  value: number;
  category?: string;
};

type OpenAIChatResponse = {
  choices: {
    message?: {
      role: string;
      content: string;
    };
  }[];
  error?: { message?: string };
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { chartData: ChartDataPoint[] };
    const { chartData } = body;

    if (!chartData || chartData.length === 0) {
      return NextResponse.json({ error: "No chart data provided" }, { status: 400 });
    }

    const prompt = `Analyze the following KPI data and provide insights:\n${JSON.stringify(
      chartData
    )}`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = (await response.json()) as OpenAIChatResponse;

    if (!response.ok) {
      throw new Error(data.error?.message || "AI request failed");
    }

    const aiText =
      data.choices &&
      data.choices.length > 0 &&
      data.choices[0].message?.content
        ? data.choices[0].message.content
        : "No insights generated";

    return NextResponse.json({ insights: aiText });
  } catch (err: unknown) {
    console.error("Error generating insights:", err);
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
