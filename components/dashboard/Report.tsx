import { BarChart, ChartBar,  FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import PieChartWithcustomLabel from "@/components/cars/BarChart"
import { ReactNode } from "react"

interface ReportProps {
    title: string,
    description: string,
    content?: ReactNode
}


const Reports = ({title, description, content}: ReportProps) => {
    return (
        <div className="flex">
            <Card>
                <CardHeader>
                    <CardTitle>User Analytics</CardTitle>
                    <CardDescription>Track your site user's acticity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <BarChart/> User's Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PieChartWithcustomLabel/>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-2">
                                 <div>
                                    {content}
                                 </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>

        
    )
}

export default Reports