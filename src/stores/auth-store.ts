import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { AuthState, ILoginApiResponse } from 'stores/types';
import { LocalStorage } from 'quasar';
import { IRegisterFormState } from 'src/types';

const LS_AUTH_KEY = 'authentication';

export const useAuthStore = defineStore('auth_store', () => {
  const lsAuthState = LocalStorage.getItem<AuthState>(LS_AUTH_KEY);
  const state = reactive<AuthState>(
    lsAuthState || {
      access_token: '',
      token_type: '',
      isLoggedIn: false,
    }
  );
  const registerState = reactive<IRegisterFormState>({
    first_name: '',
    last_name: '',
    password: '',
    phone_country_code: '+98',
    phone_number: '',
  });
  const otpToken = ref('');
  return {
    state,
    registerState,
    otpToken,
    actions: {
      setAuthState(authResponse: ILoginApiResponse) {
        const newState = {
          ...authResponse,
          isLoggedIn: true,
        };
        LocalStorage.set(LS_AUTH_KEY, newState);
        Object.assign<AuthState, AuthState>(state, newState);
      },
      clearAuthState() {
        const newState: AuthState = {
          access_token: '',
          isLoggedIn: false,
          token_type: '',
        };
        Object.assign<AuthState, AuthState>(state, newState);
        LocalStorage.set(LS_AUTH_KEY, newState);
      },
      setOtpToken(token: string) {
        otpToken.value = token;
      },
    },
  };
});
