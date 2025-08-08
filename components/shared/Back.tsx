import { CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Back = () => {

    const router = useRouter();

    return (
        <div
            onClick={() => router.back()}
            className="bg-white rounded-full p-3 w-fit m-auto mt-2 absolute top-1"
            style={{
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
        >
            <CornerDownLeft />
        </div>
    );
}

export default Back;