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
Analyze the food shown in the provided image.

If multiple food items are present, identify the most prominent one based on visual dominance (e.g., largest portion, central placement, or clearest visibility). If no food is present or the image is unclear, state this explicitly and end the analysis.

For the identified food item, provide the following details in a JSON object:
- "food_name": A specific name for the food item (e.g., "Grilled Chicken Breast" instead of just "Chicken").
- "quantity_grams": An estimated quantity in grams based on visual cues (e.g., portion size, number of pieces). If estimation is not possible, provide a reasonable default and note the assumption.
- "macro_nutrients_per_gram": A breakdown of the following macronutrients per gram of the food item, using standard nutritional data:
  - "calories": In kcal per gram.
  - "protein": In grams per gram of food.
  - "carbohydrates": In grams per gram of food.
  - "fat": In grams per gram of food.
  If exact values are unavailable, use approximate values for the most likely preparation method and note any assumptions.
- "meal_type": The most likely meal context for the food item (e.g., "Breakfast," "Lunch," "Dinner," "Snack"). Choose only one based on typical consumption patterns for the identified food.

Ensure all nutritional values are realistic and based on standard food composition data. If the food item is ambiguous, select the most likely option and explain the reasoning briefly in a "notes" field.

Example Response:
{
  "food_name": "Steamed Pork Dumplings",
  "quantity_grams": 150,
  "macro_nutrients_per_gram": {
    "calories": 1.5,
    "protein": 0.05,
    "carbohydrates": 0.15,
    "fat": 0.08
  },
  "meal_type": "Dinner",
  "notes": "Assumed steamed dumplings based on visual texture and common preparation."
}
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

    try {
      const parsedData = JSON.parse(cleanedText);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return NextResponse.json({ error: 'Invalid response format from AI model.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Error analyzing the image.' }, { status: 500 });
  }
}