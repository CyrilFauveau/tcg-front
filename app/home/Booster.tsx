'use client';
import Image from 'next/image';
import BoosterTimer from "@/components/shared/BoosterTimer";
import Link from 'next/link';

const OpenBooster = () => {
    return (
        <div
            className="bg-white relative p-3 mt-30 shadow-md"
            style={{
                boxShadow: '0 0 16px 0 rgba(0,0,0,0.15)',
                borderRadius: '30px 10px 30px 10px'
            }}
        >
            <figure className="flex justify-center p-2">
                <Link href="/booster">
                    <Image
                        src="/images/pokemon-booster.jpg"
                        alt="booster image"
                        width="100"
                        height="0"
                    />
                </Link>
            </figure>
                
            <div className="relative flex items-center justify-center text-sm p-3">
                <div className="absolute top-3 bg-white rounded-full shadow-md border-5 border-white">
                    <div className="flex items-center rounded-full shadow-[inset_0_0_5px_rgba(0,0,0,0.2)] p-2 pr-8 pl-8">
                        <BoosterTimer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OpenBooster;