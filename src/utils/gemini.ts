import axios from 'axios';

const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export const generateStandupSummary = async (activityText: string) => {
  try {
    const prompt = `You are a team assistant. Based on this team's activity, generate a standup update per person.
Include what they did, what they're working on, and any blockers.

You must respond with ONLY a valid JSON object in the following format, with no additional text or explanation:
{
  "date": "2024-03-19",
  "summaries": {
    "member name": {
      "completed": ["array of completed items"],
      "working": ["array of in-progress items"],
      "blockers": ["array of blockers or empty array"]
    }
  }
}

Team Activity:
${activityText}`;

    const response = await axios.post(
      `${GEMINI_API_ENDPOINT}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 0.1,
          maxOutputTokens: 2048,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the raw response for debugging
    console.log('Raw API Response:', response.data);

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response format from Gemini API');
    }

    const generatedText = response.data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);

    // Try to clean the response if it contains markdown code blocks
    let textToparse = generatedText;
    if (generatedText.includes('```json')) {
      textToparse = generatedText.split('```json')[1].split('```')[0].trim();
    } else if (generatedText.includes('```')) {
      textToparse = generatedText.split('```')[1].split('```')[0].trim();
    }
    
    try {
      const parsedData = JSON.parse(textToparse);
      
      // Validate the parsed data structure
      if (!parsedData.date || !parsedData.summaries || typeof parsedData.summaries !== 'object') {
        throw new Error('Response missing required fields');
      }

      return parsedData;
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', {
        original: generatedText,
        cleaned: textToparse,
        error: parseError
      });
      throw new Error('Invalid JSON response from Gemini API');
    }
  } catch (error) {
    console.error('Error generating summary:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(`API Error: ${error.response?.data?.error?.message || error.message}`);
    }
    throw error;
  }
};