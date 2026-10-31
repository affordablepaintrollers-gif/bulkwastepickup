/*
  # Create leads table and storage bucket for We Buy Containers

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, contact name)
      - `company` (text, company name)
      - `email` (text, contact email)
      - `phone` (text, contact phone)
      - `state` (text, US state)
      - `city` (text, city optional)
      - `container_types` (text array, types of containers)
      - `quantity` (text, estimated quantity)
      - `condition` (text, container condition)
      - `description` (text, additional details)
      - `photo_urls` (text array, uploaded photo URLs)
      - `status` (text, lead status - new/contacted/closed)
      - `created_at` (timestamptz)

  2. Storage
    - Create `lead-photos` bucket for photo uploads (public)

  3. Security
    - Enable RLS on leads table
    - Allow public inserts (anyone can submit a lead)
    - Restrict reads to authenticated users only
    - Storage policies for public read and anonymous upload
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  container_types text[] NOT NULL DEFAULT '{}',
  quantity text NOT NULL DEFAULT '',
  condition text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  photo_urls text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for lead photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lead-photos',
  'lead-photos',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can upload lead photos"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'lead-photos');

CREATE POLICY "Lead photos are publicly readable"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'lead-photos');
