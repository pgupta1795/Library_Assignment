import { getKpis, searchKpis } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search');
    const kpis = query ? await searchKpis(query) : await getKpis();
    return NextResponse.json(kpis);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { error: 'Failed to fetch KPIs' },
      { status: 500 }
    );
  }
}
