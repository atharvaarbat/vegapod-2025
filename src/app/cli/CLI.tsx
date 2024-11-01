import React from 'react';
import useTerminal from '@/hooks/useTerminal';
import { formatISO } from "date-fns";
import { Button } from '@/components/ui/button';

const CLI: React.FC = () => {
    const { lines, clear } = useTerminal();

    return (
        <div className='relative'>
            <div className='flex justify-between items-center bg-muted/40 px-4 py-1'>
                <p className=''>Vegapod Ground Station Terminal</p>
                <Button variant="secondary" onClick={() => clear()} className=''>Clear</Button>
            </div>
            <div className="p-4 font-mono text-sm">
                {lines.map((line, index) => (
                    <div key={index}><span className='text-muted-foreground'>[{formatISO(line.tt, { representation: 'time' })}] </span>  {line.text}</div>
                ))}
            </div>
        </div>

    );
};

export default CLI;
