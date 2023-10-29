import { FaArrowLeft } from "react-icons/fa";

const RouteInfo = ({ route, setShowRoute }) => {

    const duration = route.legs[0].duration.text;
    const distance = route.legs[0].distance.text;

    return (
        <div className="min-h-screen bg-gray-100 shadow-md overflow-y-scroll max-h-screen p-4 w-full">
            <button onClick={() => setShowRoute(null)}>
                <FaArrowLeft />
            </button>
            <><p>Duration: {duration}</p><p>Distance: {distance}</p></>
            <h2 className="font-bold my-2">Directions</h2>
            <ul>
                {
                    route.legs.map((leg, idx) => {
                        return leg.steps.map((step, idx) => {
                            return (
                                <div key={idx} className="flex items-start border-b border-gray-200 p-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        {idx + 1}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-md" dangerouslySetInnerHTML={{ __html: step.instructions }}></p>
                                        <p>{step.distance.text && step.distance.text}{" "}({step.duration.text && step.duration.text})</p>
                                    </div>
                                </div>
                            )
                        })
                    })
                }
            </ul>
        </div>
    );
}

export default RouteInfo;