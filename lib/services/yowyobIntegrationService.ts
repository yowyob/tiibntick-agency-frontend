import { apiClient } from '@/lib/api/client';
import { getUserEmail, getUserRole, getBranchId } from '@/lib/session';

export type YowyobApp = 'HRM' | 'BILLING' | 'ACCOUNTING';

export const yowyobIntegrationService = {
  async launch(app: YowyobApp): Promise<{ redirectUrl: string; branchScoped: boolean }> {
    const email = getUserEmail();
    const role = getUserRole();
    const branchId = getBranchId();
    return apiClient.get<{ redirectUrl: string; app: string; branchScoped: boolean }>(
      `/integrations/yowyob/launch?app=${encodeURIComponent(app)}`,
      undefined,
      {
        headers: {
          ...(email ? { 'X-User-Email': email } : {}),
          ...(role ? { 'X-User-Role': role } : {}),
          ...(branchId ? { 'X-Branch-Id': branchId } : {}),
        },
      },
    );
  },

  async open(app: YowyobApp): Promise<void> {
    const { redirectUrl } = await yowyobIntegrationService.launch(app);
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  },
};
