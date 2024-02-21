import { useQuery } from '@tanstack/vue-query';
import { useApi } from 'src/composables/use-api';
import { UserInformationType } from 'src/types';

const useAuthService = () => {
  const platfoApi = useApi();
  const me = async () => {
    const response = await platfoApi.api.get<UserInformationType>('/user/me');
    return response.data;
  };
  return {
    queries: {
      me: () =>
        useQuery({
          queryFn: async () => await me(),
          queryKey: ['user-info'],
          refetchOnWindowFocus: false,
          refetchInterval: false,
        }),
    },
  };
};

export default useAuthService;
