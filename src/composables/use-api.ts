import axios from 'axios';
// import { reactive } from 'vue';
// import {
//   ApiQueryProps,
//   ApiQueryResponse,
//   ApiState,
// } from 'src/composables/types';
import { useAuthStore } from 'stores/auth-store';

export const useApi = () => {
  const authStore = useAuthStore();

  const api = axios.create({
    baseURL: 'https://api.platfo.net/api/v1',
  });

  api.interceptors.request.use(
    (cfg) => {
      try {
        const token = authStore.state.access_token;
        if (token) cfg.headers['Authorization'] = `Bearer ${token}`;
        return cfg;
      } catch (err) {
        return cfg;
      }
    },
    (err) => Promise.reject(err)
  );

  return {
    api,
  };

  // const query = async <T>(
  //   props: ApiQueryProps
  // ): Promise<ApiQueryResponse<T>> => {
  //   const queryState = reactive<ApiQueryResponse<T>>({
  //     data: undefined,
  //     isError: false,
  //     isLoading: true,
  //   });
  //
  //   const response = await api.get<T>(props.endpoint, {
  //     params: props.params,
  //   });
  //   if (response.status >= HttpStatusCode.Ok) {
  //     Object.assign(queryState, {
  //       isError: false,
  //       isLoading: false,
  //       data: response.data,
  //     });
  //   }
  //   if (response.status >= 400 && response.status <= 500) {
  //     Object.assign(queryState, {
  //       isError: true,
  //       isLoading: false,
  //     });
  //   }
  //   if (response.status >= 500) {
  //     Object.assign(queryState, {
  //       isError: true,
  //       isLoading: false,
  //       data: undefined,
  //     });
  //   }
  //   return queryState;
  // };
};
