import {getKpis} from "@/lib/actions";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const kpis = await getKpis();
    console.log({kpis});
    return NextResponse.json(kpis);
  } catch (error) {
    console.error({error});
    return NextResponse.json(
      { error: "Failed to fetch KPIs" },
      { status: 500 }
    );
  }
}
