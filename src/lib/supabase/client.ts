import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url === 'your_project_url' || key === 'your_anon_key') {
    // Return a minimal mock for when Supabase is not configured
    const emptyResult = { data: null, error: null, count: null };
    const mockQuery: any = {
      select: () => mockQuery,
      insert: () => Promise.resolve(emptyResult),
      update: () => mockQuery,
      delete: () => mockQuery,
      eq: () => mockQuery,
      neq: () => mockQuery,
      gt: () => mockQuery,
      lt: () => mockQuery,
      ilike: () => mockQuery,
      order: () => mockQuery,
      limit: () => mockQuery,
      single: () => Promise.resolve(emptyResult),
      then: (resolve: any) => Promise.resolve(emptyResult).then(resolve),
    };

    return {
      from: () => mockQuery,
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase não configurado. Configure as variáveis de ambiente.' } }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: { message: 'Storage não configurado' } }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;
  }

  return createBrowserClient(url, key);
}
