import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export const handleShare = async (viewRef) => {
    try {
        // Capture the content of the component as an image
        const uri = await captureRef(viewRef, {
            format: 'png', // or 'jpeg'
            quality: 1.0,
        });

        // Share the captured image
        await Sharing.shareAsync(uri, {
            mimeType: 'image/png', // or 'image/jpeg'
            dialogTitle: 'Share this image',
            UTI: 'public.png', // On iOS, specify the Universal Type Identifier (UTI)
        });
    } catch (error) {
        console.error('Error sharing:', error);
    }
};
