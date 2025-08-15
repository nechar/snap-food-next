import { NextResponse } from 'next/server';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function POST(request: Request) {
  const formData = await request.formData();
  const foodImage = formData.get('foodImage') as File | null;

  if (!foodImage) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  try {
    const imageBuffer = await foodImage.arrayBuffer();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const prompt = `
Analyze the food shown in the image.

If there are multiple food items, identify and name each item separately.

For each identified food item:
- Estimate the quantity (in grams for solids, ml for liquids).
- List all macronutrients available per gram (or per ml), including:
  - Calories
  - Protein
  - Carbohydrates
  - Fat
  - more if available

Return the output in JSON format as an array of objects. Each object should contain:
- "food-name": the name of the food item
- "quantity": estimated amount (in grams or ml)
- "macronutrients": an array of objects, each with:
  - "name": name of the macronutrient (e.g., "calories", "protein")
  - "amountPerUnit": numeric value per gram, ml etc.
  - "unit": unit of measurement (e.g., "kcal/g", "g/g")
If the unit is "g/g", replace it with "gm" to simplify the output.
`;

    const imagePart = {
      inlineData: {
        data: Buffer.from(imageBuffer).toString('base64'),
        mimeType: foodImage.type,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Clean the response to ensure it's valid JSON
    const cleanedText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return NextResponse.json({ error: 'Invalid response format from AI model.' }, { status: 500 });
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Error analyzing the image.' }, { status: 500 });
  }
}