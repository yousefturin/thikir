import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';


/**
 * @param {string} Translation - The translation text.
 * @param {string} MainText - The main text (e.g., dua or hadith).
 * @param {string} RefTranslation - The reference translation text.
 * @param {string} Ref - The reference text.
 * @param {string} flag - A flag indicating Type of Jsx to be converted.
 */

export const handleShare = async (viewRef ) => {
    try {
        // Capture the content of the component as an image
        const uri = await captureRef(viewRef, {
            format: 'png', // or 'jpeg'
            quality: 1.0,
        });
        console.log(uri)
        // Share the captured image
        await Sharing.shareAsync(uri, {
            mimeType: 'image/png',
            dialogTitle: 'Share this image',
            UTI: 'public.png',
        });
    } catch (error) {
        console.error('Error sharing:', error);
    }
};
