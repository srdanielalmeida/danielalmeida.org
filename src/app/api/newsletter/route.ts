import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url === 'your_project_url' || key === 'your_service_role_key') {
    return null;
  }

  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado. Atualize as variáveis de ambiente.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { email, name } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email é obrigatório.' }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
      });

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json({ error: 'Este email já está inscrito.' }, { status: 409 });
      }
      console.error('Newsletter insert error:', dbError);
      return NextResponse.json({ error: 'Erro ao processar inscrição.' }, { status: 500 });
    }

    // Google Sheets integration (if configured)
    if (
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID &&
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL !== 'your_service_account_email'
    ) {
      try {
        const { google } = await import('googleapis');
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Newsletter!A1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[email, name || '', new Date().toISOString()]],
          },
        });
      } catch (sheetsError) {
        // Log but don't fail - subscriber is already saved in Supabase
        console.error('Google Sheets sync error:', sheetsError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
