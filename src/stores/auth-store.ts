import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { AuthState, ILoginApiResponse } from 'stores/types';
import { LocalStorage } from 'quasar';
import { IChangePasswordFormState, IRegisterFormState } from 'src/types';

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

  const changePasswordState = reactive<IChangePasswordFormState>({
    code: null,
    password: '',
    phone_country_code: '+98',
    phone_number: '',
    token: '',
  });

  const otpToken = ref('');
  return {
    state,
    registerState,
    changePasswordState,
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
      setChangePasswordStateToken(token: string) {
        changePasswordState.token = token;
      },
      clearChangePasswordState() {
        changePasswordState.password = '';
        changePasswordState.phone_number = '';
        changePasswordState.code = null;
        changePasswordState.token = '';
      },
    },
  };
});
