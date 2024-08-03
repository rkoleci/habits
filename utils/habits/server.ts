'use server';

import { createClient } from '@/utils/supabase/server';
import { getURL, getErrorRedirect, getStatusRedirect } from 'utils/helpers';

function getSqlTimestampWithTimezone() {
    const now = new Date();
  
    // Get the timezone offset in minutes and format it as ±HH:MM
    const offset = now.getTimezoneOffset();
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const minutes = String(absOffset % 60).padStart(2, '0');
    const timezone = `${sign}${hours}:${minutes}`;
  
    // Use toISOString to get the date in UTC and replace the 'Z' with the timezone offset
    const isoString = now.toISOString().replace('Z', timezone);
    
    return isoString;
  }

export async function storeHabit(formData: FormData) {
    const name = String(formData.get('name')).trim();
    const reward = String(formData.get('reward')).trim();
    const days = String(formData.get('days')).trim(); 

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error, data: habit, status } = await supabase.from('habits').insert<any>({
        name:  name,
        reward: reward,
        days: days,
        start_date: getSqlTimestampWithTimezone(),
        user_id: user?.id,
    });
  
    if (error) {
      return getErrorRedirect(
        '/',
        'Your habit could not be saved!',
        error.message
      );
    } else if (status === 201) {
      return getStatusRedirect(
        '/saas?refresh=true',
        'Success!',
        'Your habit has been saved!.'
      );
    } else {
      return getErrorRedirect(
        '/',
        'Hmm... Something went wrong.',
        'Your habit could not be saved!'
      );
    }
  }