import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { ref } from "vue";

export type ThemeSchema = {
    color: string,
}

export const TELEGRAM_SHOP_STORE_KEY = 'TELEGRAM_SHOP';
export const useTelegramShopStore = defineStore(TELEGRAM_SHOP_STORE_KEY, () => {
    const _theme = ref<ThemeSchema>(LocalStorage.getItem<ThemeSchema>('theme') as ThemeSchema || { color: '' });
    return {
        theme: _theme,
        setTheme: (theme: ThemeSchema) => {
            LocalStorage.set('theme', theme);
            _theme.value = theme;
        }
    }
})