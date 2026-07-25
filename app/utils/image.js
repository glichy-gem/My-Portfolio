/**
 * Use the browser's image loading to load an image and
 * grab the `src` it chooses from a `srcSet`
 */
export async function loadImageFromSrcSet({ src, srcSet, sizes }) {
  return new Promise((resolve, reject) => {
    try {
      if (!src && !srcSet) {
        throw new Error('No image src or srcSet provided');
      }

      let tempImage = new Image();

      if (src) {
        tempImage.src = src;
      }

      if (srcSet) {
        tempImage.srcset = srcSet;
      }

      if (sizes) {
        tempImage.sizes = sizes;
      }

      const cleanup = () => {
        tempImage.removeEventListener('load', onLoad);
        tempImage.removeEventListener('error', onError);
        tempImage = null;
      };

      const onLoad = () => {
        const source = tempImage.currentSrc;
        cleanup();
        resolve(source);
      };

      const onError = () => {
        cleanup();
        reject(new Error(`Failed to load image: ${srcSet || src}`));
      };

      tempImage.addEventListener('load', onLoad);
      tempImage.addEventListener('error', onError);
    } catch (error) {
      reject(new Error(`Error loading ${srcSet}: ${error}`));
    }
  });
}

/**
 * Generates a transparent png of a given width and height
 */
export async function generateImage(width = 1, height = 1) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, width, height);

    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Video thumbnail failed to load'));
        return;
      }
      const image = URL.createObjectURL(blob);
      canvas.remove();
      resolve(image);
    });
  });
}

/**
 * Use native html image `srcSet` resolution for non-html images
 */
export async function resolveSrcFromSrcSet({ srcSet, sizes }) {
  const sources = await Promise.all(
    srcSet.split(', ').map(async srcString => {
      const [src, width] = srcString.split(' ');
      const size = Number(width.replace('w', ''));
      const image = await generateImage(size);
      return { src, image, width };
    })
  );

  try {
    const fakeSrcSet = sources.map(({ image, width }) => `${image} ${width}`).join(', ');
    const fakeSrc = await loadImageFromSrcSet({ srcSet: fakeSrcSet, sizes });

    const output = sources.find(src => src.image === fakeSrc);
    return output.src;
  } finally {
    // The generated blob urls are only needed to probe which source the
    // browser picks — release them so they don't leak for the page lifetime
    for (const { image } of sources) {
      URL.revokeObjectURL(image);
    }
  }
}
