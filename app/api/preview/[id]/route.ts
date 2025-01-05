import {getKpiById} from '@/lib/actions';
import {NextRequest,NextResponse} from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kpi = await getKpiById(params.id);
    if (!kpi) return new NextResponse(null, { status: 404 });

    return new NextResponse(null, {
			status: 307,
			headers: {Location: '/placeholder-preview.png'},
		});
  } catch (error) {
    console.error('Failed to generate preview:', error);
    return new NextResponse(null, { status: 500 });
  }
}
