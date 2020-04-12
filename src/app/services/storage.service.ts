import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export async function setStorage(key: string, value: any): Promise<void> {
  await Storage.set({
    key: key,
    value: JSON.stringify(value),
  });
}

export async function getStorage(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  if (!item.value || item.value !== 'undefined') {
    return Promise.resolve(JSON.parse(item.value));
  } else {
    Promise.resolve({});
  }
}

export async function removeStorage(key: string): Promise<void> {
  await Storage.remove({
    key: key,
  });
}
