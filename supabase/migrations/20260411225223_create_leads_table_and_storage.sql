/*
  # Create leads table and storage bucket

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text) - contact name
      - `company` (text) - company name
      - `email` (text) - contact email
      - `phone` (text) - phone number
      - `state` (text) - US state
      - `city` (text) - city
      - `container_types` (text[]) - array of container type IDs
      - `quantity` (text) - estimated quantity description
      - `condition` (text) - container condition
      - `description` (text) - additional details
      - `photo_urls` (text[]) - uploaded photo URLs
      - `status` (text) - lead status, default 'new'
      - `created_at` (timestamptz)

  2. Storage
    - Creates `lead-photos` bucket for photo uploads

  3. Security
    - Enable RLS on `leads` table
    - Public insert policy (anyone can submit a lead)
    - Authenticated read policy (only auth users can read)
    - Storage bucket policies for anonymous uploads and public reads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  container_types text[] NOT NULL DEFAULT '{}',
  quantity text NOT NULL DEFAULT '',
  condition text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  photo_urls text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('lead-photos', 'lead-photos', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
    AND policyname = 'Anyone can upload lead photos'
  ) THEN
    CREATE POLICY "Anyone can upload lead photos"
      ON storage.objects
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (bucket_id = 'lead-photos');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
    AND policyname = 'Lead photos are publicly readable'
  ) THEN
    CREATE POLICY "Lead photos are publicly readable"
      ON storage.objects
      FOR SELECT
      TO public
      USING (bucket_id = 'lead-photos');
  END IF;
END $$;
