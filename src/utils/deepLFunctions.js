import axios from 'axios';


const DEEPL_API_KEY = import.meta.env.VITE_DEEPl_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';


// Translate text to English
export async function translateToEnglish(text) {
    try {
        const response = await axios.post(DEEPL_API_URL, null, {
            params: {
                auth_key: DEEPL_API_KEY,
                text: text,
                target_lang: 'EN',
            },
        });
        const detectedLanguage = response.data.translations[0].detected_source_language;
        console.log("Detected Language:", detectedLanguage);

        return {
            translatedText: response.data.translations[0].text,
            detectedLanguage: detectedLanguage,
        };
    } catch (error) {
        console.error('Translation to English failed:', error);
        throw error;
    }
}

// Translate text to a specific language
export async function translateToLanguage(text) {
    try {
        const response = await axios.post(DEEPL_API_URL, null, {
            params: {
                auth_key: DEEPL_API_KEY,
                text: text,
                target_lang: 'DE',
            },
        });
        console.log("respose from the deepL:", response.data)
        return response.data.translations[0].text;
    } catch (error) {
        console.error(`Translation to ${targetLanguage} failed:`, error);
        throw error;
    }
}
