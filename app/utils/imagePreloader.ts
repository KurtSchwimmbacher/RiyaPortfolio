/**
 * Preloads images and returns a promise that resolves when all images are loaded
 * @param imageUrls Array of image URLs to preload
 * @param onProgress Callback function called with progress (0-100)
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (
  imageUrls: string[],
  onProgress?: (progress: number) => void
): Promise<void> => {
  return new Promise((resolve) => {
    if (imageUrls.length === 0) {
      onProgress?.(100);
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const updateProgress = () => {
      const progress = Math.round((loadedCount / totalImages) * 100);
      onProgress?.(progress);
    };

    const handleImageLoad = () => {
      loadedCount++;
      updateProgress();
      
      if (loadedCount === totalImages) {
        resolve();
      }
    };

    const handleImageError = () => {
      console.warn('Failed to preload image');
      loadedCount++;
      updateProgress();
      
      if (loadedCount === totalImages) {
        resolve(); // Still resolve even if some images failed
      }
    };

    // Start preloading all images
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = url;
    });
  });
};

/**
 * Preloads film images with progress tracking
 * @param filmData Array of film objects with stillImage properties
 * @param onProgress Callback function called with progress (0-100)
 * @returns Promise that resolves when all film images are loaded
 */
export const preloadFilmImages = (
  filmData: Array<{ stillImage?: string }>,
  onProgress?: (progress: number) => void
): Promise<void> => {
  const imageUrls = filmData
    .map(film => film.stillImage)
    .filter((url): url is string => Boolean(url));
  
  return preloadImages(imageUrls, onProgress);
};
