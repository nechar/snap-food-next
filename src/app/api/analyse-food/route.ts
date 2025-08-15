import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse form data to handle file uploads
    const formData = await request.formData();
    
    // Extract the food image
    const foodImage = formData.get('foodImage') as File | null;
    
    // Extract other form fields
    const otherData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== 'foodImage') {
        otherData[key] = value;
      }
    });
    
    // Validate that an image was provided
    if (!foodImage) {
      return NextResponse.json({ error: 'No food image provided' }, { status: 400 });
    }
    
    // Validate file type (accept common image formats)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(foodImage.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.' 
      }, { status: 400 });
    }
    
    // Validate file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (foodImage.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Please upload an image smaller than 10MB.' 
      }, { status: 400 });
    }
    
    // Convert file to buffer for processing
    const imageBuffer = await foodImage.arrayBuffer();
    const imageData = {
      name: foodImage.name,
      type: foodImage.type,
      size: foodImage.size,
      buffer: Buffer.from(imageBuffer)
    };
    
    console.log('Received food image:', {
      name: imageData.name,
      type: imageData.type,
      size: imageData.size,
      bufferLength: imageData.buffer.length
    });
    console.log('Other form data:', otherData);

    // Here you would add your logic to analyze the food image
    // For now, we'll just return a success message with the received data
    return NextResponse.json({ 
      message: 'Food image received and analyzed (mock)', 
      imageInfo: {
        name: imageData.name,
        type: imageData.type,
        size: imageData.size
      },
      otherData: otherData
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
