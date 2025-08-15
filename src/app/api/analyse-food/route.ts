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

If there are multiple food items, identify the most prominent one.

For the identified food item, provide the following details:
- Estimate the quantity in grams
- List the following macro nutrients per gram
  - Calories
  - Protein
  - Carbohydrates
  - Fat
- Identify what is the food item most likely to be eaten (Eg: breakfast, lunch, dinner, snack)

Respond with a JSON response
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
    console.log("🚀 ~ POST ~ text:", text)

    // Clean the response to ensure it's valid JSON
    // const cleanedText = text
    //   .replace(/```json/g, '')
    //   .replace(/```/g, '')
    //   .trim();

    // let parsedData;
    // try {
    //   parsedData = JSON.parse(cleanedText);
    // } catch (parseError) {
    //   console.error('JSON parsing error:', parseError);
    //   return NextResponse.json({ error: 'Invalid response format from AI model.' }, { status: 500 });
    // }

    return NextResponse.json('parsedData');
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Error analyzing the image.' }, { status: 500 });
  }
}