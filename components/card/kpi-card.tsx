import {Card,CardHeader} from "@/components/ui/card";
import {Clock} from 'lucide-react';

export default function KPICard({ 
  title, 
  description 
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className='cursor-pointer hover:bg-muted'>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-muted-foreground" />
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}