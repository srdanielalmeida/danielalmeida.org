-- =============================================================
-- Schema SQL para Supabase — Blog danielalmeida.org
-- Execute este script no SQL Editor do Supabase Dashboard
-- =============================================================

-- 1. Enum types
DO $$ BEGIN
  CREATE TYPE article_category AS ENUM (
    'artes-liberais',
    'ensaios-critica',
    'filosofia',
    'notas-escrivaninha'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE article_status AS ENUM ('draft', 'published');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category article_category NOT NULL DEFAULT 'filosofia',
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  reading_time_minutes INTEGER DEFAULT 1,
  published_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status article_status DEFAULT 'draft',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
-- Index for published articles listing
CREATE INDEX IF NOT EXISTS idx_articles_status_date ON articles(status, published_date DESC);

-- 3. Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  verified BOOLEAN DEFAULT false
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- 4. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON articles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. Row Level Security (RLS)

-- Enable RLS on tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Articles: Public read for published articles
CREATE POLICY "Published articles are publicly readable"
  ON articles FOR SELECT
  USING (status = 'published');

-- Articles: Authenticated users can read all articles
CREATE POLICY "Authenticated users can read all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (true);

-- Articles: Authenticated users can insert
CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Articles: Authenticated users can update
CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true);

-- Articles: Authenticated users can delete
CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- Newsletter: Service role can insert (via API route)
CREATE POLICY "Service role can manage newsletter"
  ON newsletter_subscribers FOR ALL
  TO service_role
  USING (true);

-- Newsletter: Authenticated users can read
CREATE POLICY "Authenticated users can read newsletter"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

-- 6. Storage bucket for covers
-- Note: Run this manually in Supabase Dashboard or via the API:
-- Go to Storage > Create new bucket "covers" > Set as public
-- 
-- Or execute via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Public read
CREATE POLICY "Public can read covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'covers');

-- Storage policy: Authenticated can upload
CREATE POLICY "Authenticated can upload covers"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'covers');

-- Storage policy: Service role can upload (for API routes)
CREATE POLICY "Service role can manage covers"
  ON storage.objects FOR ALL
  TO service_role
  USING (bucket_id = 'covers');
