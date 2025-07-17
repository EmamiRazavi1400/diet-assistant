import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 500 });
    }

    // مدل GPT-2 ساده (می‌تونی مدل‌های دیگه هم امتحان کنی)
    const modelUrl = "https://api-inference.huggingface.co/models/gpt2";

    const prompt = `
      You are a professional nutritionist.
      Based on the following user information, create a detailed, customized diet plan:

      ${JSON.stringify(formData, null, 2)}
    `;

    const response = await axios.post(
      modelUrl,
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    const text = response.data[0]?.generated_text || "No response";

    return NextResponse.json({ diet: text });
  } catch (err: any) {
    console.error("Hugging Face API error:", err.message);
    return NextResponse.json({ error: "Hugging Face API error" }, { status: 500 });
  }
}
