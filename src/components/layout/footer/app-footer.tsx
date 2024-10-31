import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const AppFooter = () => {
    return (
        <div className='flex  items-center gap-2 border-t p-4'>
            <p className='text-sm text-muted-foreground'>Pod Position:</p>
            <div>
                12m
            </div>
            <div className='flex flex-1 flex-col'>
                <span className='w-fit transition-all' style={{ paddingLeft: `30%`, transform: 'translateX(-75px)' }}><PodVector /></span>

                <Progress value={30} />
            </div>
            <div>
                48m
            </div>
            <div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size='icon' variant={'secondary'}>
                            <ReloadIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Refresh GUI
                    </TooltipContent>
                </Tooltip>

            </div>
        </div>
    )
}

export default AppFooter

const PodVector = () => {
    return (<svg width="75" height="23" viewBox="0 0 75 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_631_251)">
            <path d="M31.3469 1.40799C45.4522 -2.14939 64.3199 1.5726 68.3793 6.58017L71 15H9.94553L4 6.58016C17.4902 5.0178 13.7154 5.85471 31.3469 1.40799Z" className='fill-[#191716] dark:fill-white' />
        </g>
        <defs>
            <filter id="filter0_d_631_251" x="0" y="0" width="75" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_631_251" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_631_251" result="shape" />
            </filter>
        </defs>
    </svg>
    )
}