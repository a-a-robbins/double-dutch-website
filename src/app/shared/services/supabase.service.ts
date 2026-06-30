import { Injectable } from '@angular/core';
import type { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

const STORAGE_URL = `${environment.supabaseUrl}/storage/v1/object/public/gymnastics-images`;

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  async getClient(): Promise<SupabaseClient> {
    if (!this.supabase) {
      const { createClient } = await import('@supabase/supabase-js');
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }
    return this.supabase;
  }

  getImageUrl(path: string): string {
    return `${STORAGE_URL}/${path}`;
  }
}
