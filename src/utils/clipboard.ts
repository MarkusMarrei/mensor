import { Clipboard } from '@capacitor/clipboard';

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await Clipboard.write({ string: text });
    return true;
  } catch (e) {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  }
  return false;
}

export async function readFromClipboard(): Promise<string> {
  try {
    const res = await Clipboard.read();
    if (res && res.value) return res.value;
  } catch (e) {
    try {
      if (navigator?.clipboard?.readText) {
        return await navigator.clipboard.readText();
      }
    } catch {
      // ignore
    }
  }
  return '';
}
