export async function urlToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // 允许跨域加载图片

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png'); // 默认转换为 PNG 格式
            resolve(dataURL);
        };

        img.onerror = (error) => {
            reject(error);
        };

        img.src = url;
    });
}