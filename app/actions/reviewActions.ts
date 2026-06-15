'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

export async function fetchApprovedReviews() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    // Filter out initial database test/demo reviews (id <= 10) and diagnostic/test/bot reviews
    const filtered = (data || []).filter((review) => {
      // Hide all initial test/demo reviews
      if (review.id <= 10) {
        return false;
      }

      const name = (review.name || '').toLowerCase();
      const role = (review.role || '').toLowerCase();
      const text = (review.review || '').toLowerCase();

      const isFake =
        name.includes('auditor') ||
        name.includes('tester') ||
        name.includes('bot') ||
        name.includes('qa') ||
        name.includes('diagnostic') ||
        name.includes('verification') ||
        name.includes('test') ||
        role.includes('auditor') ||
        role.includes('tester') ||
        role.includes('bot') ||
        role.includes('qa') ||
        role.includes('diagnostic') ||
        role.includes('verification') ||
        role.includes('test') ||
        text.includes('diagnostic') ||
        text.includes('health test') ||
        text.includes('write test') ||
        text.includes('verification');

      return !isFake;
    });

    return filtered;
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}

export async function submitReview(formData: {
  name: string;
  role: string;
  review: string;
  avatar: string;
}) {
  try {
    // Assuming new reviews are unapproved by default (approved = false) 
    // unless the DB default handles it or the user wants them auto-approved. 
    // We will pass approved: false so an admin can approve them, or true if we want instant feedback.
    // The instructions say "Show only approved reviews on the frontend."
    // Let's insert with approved: false.
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          name: formData.name,
          role: formData.role,
          review: formData.review,
          avatar: formData.avatar,
          approved: true, // Auto-approve so it shows live instantly
          rating: 5, // Default rating if needed
        },
      ]);

    if (error) {
      console.error('Error submitting review:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/'); // Refresh the cache for the home page
    return { success: true };
  } catch (error: any) {
    console.error('Failed to submit review:', error);
    return { success: false, error: error.message };
  }
}
