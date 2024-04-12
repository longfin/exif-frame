import { Capacitor } from '@capacitor/core';
import { Media } from '@capacitor-community/media';
import { Buffer } from 'buffer';
import saveAs from 'file-saver';
import { t } from 'i18next';

const downloadOneFile = async (file: { name: string; buffer: ArrayBuffer; type: 'image/jpeg' | 'image/webp' }): Promise<void> => {
  try {
    if (Capacitor.isNativePlatform()) {
      if (!(await Media.getAlbums()).albums.map((album) => album.name).includes('EXIF Frame')) {
        await Media.createAlbum({ name: 'EXIF Frame' });
      }

      await Media.savePhoto({
        fileName: file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`),
        path: `data:${file.type};base64,${Buffer.from(file.buffer).toString('base64')}`,
        albumIdentifier:
          Capacitor.getPlatform() === 'android'
            ? (await Media.getAlbums()).albums.find((album) => album.name === 'EXIF Frame')?.identifier
            : undefined,
      });
    } else {
      saveAs(
        new Blob([file.buffer], { type: file.type }),
        file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`)
      );
    }
  } catch (error) {
    alert(error);
  }

  alert(t('root.successfully-downloaded-in-gallery'));
};

export default downloadOneFile;
