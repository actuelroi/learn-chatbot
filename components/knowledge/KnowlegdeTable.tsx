import { Filter, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Skeleton } from "../ui/skeleton"
import { Badge } from "../ui/badge"




interface KnowledgeTableProps {
    sources: KnowledgeSource[],
    onSourceClick: (source: KnowledgeSource) => void,
    isLoading: boolean
}

export const getTypeIcon = (type: SourceType) => {
    switch(type){
        case 'website':
            return <i className="ri-global-line text-lg mr-2"></i>
        case 'upload':
            return <i className="ri-file-pdf-line text-lg mr-2"></i>

            case 'text':
                return <i className="ri-file-text-line text-lg mr-2"></i>

            default:
                return <i className="ri-database-2-line text-lg mr-2"></i>
    }
}


export const getStatusBadge= (status: SourceStatus)=>{
    switch(status){
        case 'active': 
            return <Badge variant= 'default'>Active</Badge>
        
        case 'error':
            <Badge variant="destructive">
                Error 
            </Badge>
        default:
            <Badge>
                Loading
            </Badge>
    }  
}



const KnowledgeTable = ({sources, onSourceClick,isLoading}:KnowledgeTableProps) => {
  return (
    <Card
    className="border-white bg-[#0a0a0e]"
    >
    <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-white">
            Sources
              </CardTitle>

              <div className="flex items-center gap-2">
                 <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
                     <Input 
                     className="pl-9 h-9 w-50 md:w-75 bg-white/2 "
                        placeholder="Search sources..."
                      />
                 </div>
                 <Button variant={'ghost'}
                 size={'icon'}
                 className="h-9 px-2 bg-white/2">
                    <Filter className="w-4 h-4 text-white" />
                 </Button>
              </div>
        </div>
    </CardHeader>
    <CardContent className="p-0" >
       <Table>
        <TableHeader>
            <TableRow className="border-white hover:bg-transparent text-white">
             <TableHead className=" text-white text-xs uppercase font-medium">
                Name
             </TableHead>
             <TableHead className=" text-white text-xs uppercase font-medium">
                Type
             </TableHead>
             <TableHead className=" text-white text-xs uppercase font-medium">
                Status
             </TableHead>
             <TableHead className=" text-white text-xs uppercase font-medium">
                Last updated
             </TableHead>
             <TableHead className=" text-white text-xs uppercase font-medium">
                Actions
             </TableHead>
            </TableRow>
        </TableHeader>
            <TableBody>
                {
                    isLoading ? (
                        Array.from({length:5}).map((_,i)=> (
                            <TableRow key={i} className="border-white animate-pulse">
                                <TableCell>
                                    <Skeleton className="h-4 w-20 bg-white/50 rounded" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20 bg-white/50 rounded" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20 bg-white/50 rounded" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20 bg-white/50 rounded" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20 bg-white/50 rounded" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20 bg-white/50 rounded" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : 
                        sources.length > 0  ? (
                            sources.map((source, index)=> (
                                <TableRow 
                                key={index} 
                                onClick ={()=> onSourceClick(source)}
                                className="border-white hover:bg-white/5 cursor-pointer">
                                    <TableCell className="font-medium text-white group-hover:text-white">
                                        <div className="fex items-center">
                                            {getTypeIcon(source.type as SourceType)}
                                            <div className="flex flex-col">
                                               <span>
                                                {source.name}
                                               </span>
                                               {source.source_url && (
                                                <span className="text-xs font-normal text-white">
                                                    {source.source_url}
                                                </span>
                                               )}

                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-white">
                                        {source.type}
                                    </TableCell>
                                    <TableCell className="text-white">
                                        {getStatusBadge(source.status as SourceStatus)}
                                    </TableCell>
                                    <TableCell>
                                       {source.last_updated && 
                                       new Date(source.last_updated).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                        size="sm"
                                        >
                                            view
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    ) : (
                        <TableRow className="border-white">
                            <TableCell colSpan={5} className="text-center py-10 text-white">
                                No sources found. Please add a knowledge source.
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
       </Table>
    </CardContent>
    </Card>
  )
}

export default KnowledgeTable
