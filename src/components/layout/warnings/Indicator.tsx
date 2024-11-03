import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Indicator = ({ name, status, icon }: {
    name: string;
    status: string;
    icon: React.ReactNode;
}): React.ReactElement => {
    const bgColor = status === 'warning' ? 'bg-yellow-500' : (status === 'error' ? 'bg-red-500' : 'bg-muted');
    return (
        <Tooltip >
            <TooltipTrigger asChild>
                <div
                    className={`${bgColor} p-3 rounded-lg`}
                >
                    {icon}
                </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                {name}
            </TooltipContent>
        </Tooltip>

    )
}

export default Indicator