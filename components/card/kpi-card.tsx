import {Card,CardHeader} from "@/components/ui/card";
import {Clock,Star} from 'lucide-react';

export default function KPICard({
  id,
  title,
  description,
  favorite=false
}: {
  id: string;
  title: string;
  description: string;
  favorite?: boolean;
}) {

  return (
    <Card className='cursor-pointer hover:bg-muted relative'>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-muted-foreground" />
          </div>

          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <Star
            className={`absolute top-2 right-2 w-4 h-4 ${favorite? 'fill-yellow-400 text-yellow-400':'text-gray-400'
              }`}
          />
        </div>
      </CardHeader>
    </Card>
  )
}