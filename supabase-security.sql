-- Harden Supabase: enforce admin authorization and public insert-only access.

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Only explicitly approved admin UUIDs may exist.
CREATE POLICY "No public admin mutation"
ON public.admin_users
FOR ALL
TO public
USING (false)
WITH CHECK (false);

CREATE POLICY "Admins can read their own admin mapping"
ON public.admin_users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Public visitors may only submit a new enquiry.
CREATE POLICY "Public can submit enquiries"
ON public.enquiries
FOR INSERT
TO anon
WITH CHECK (
  status = 'New'
  AND name IS NOT NULL
  AND phone IS NOT NULL
  AND class_level IS NOT NULL
  AND board IS NOT NULL
);

-- Only explicitly approved admins can read, update, or delete enquiries.
CREATE POLICY "Admins can view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can delete enquiries"
ON public.enquiries
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
  )
);

-- Example database constraints for sensitive enquiry data.
ALTER TABLE public.enquiries
  ADD CONSTRAINT enquiries_name_length CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT enquiries_phone_format CHECK (phone ~ '^[6-9][0-9]{9}$'),
  ADD CONSTRAINT enquiries_email_length CHECK (email IS NULL OR char_length(email) <= 254),
  ADD CONSTRAINT enquiries_class_length CHECK (char_length(class_level) BETWEEN 1 AND 80),
  ADD CONSTRAINT enquiries_board_length CHECK (char_length(board) BETWEEN 1 AND 80),
  ADD CONSTRAINT enquiries_message_length CHECK (char_length(message) <= 2500),
  ADD CONSTRAINT enquiries_status_check CHECK (status IN ('New', 'Contacted', 'Closed'));

-- Optional: prevent public attempts to override the status column.
CREATE OR REPLACE FUNCTION public.force_enquiry_status_new()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.status := 'New';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_force_enquiry_status_new ON public.enquiries;
CREATE TRIGGER trg_force_enquiry_status_new
BEFORE INSERT ON public.enquiries
FOR EACH ROW
EXECUTE FUNCTION public.force_enquiry_status_new();

-- Recommended: keep admin creation out of the application and insert only from trusted admin-side tooling.
