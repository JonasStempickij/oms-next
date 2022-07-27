import Link from 'next/link';

export const JobCard = ({ job, deleteJob }) => {
    const { client, jobParts, _id } = job;

    return (
        <div
            key={_id}
            className='w-96 border mb-5 border-gray-200 rounded-xl divide-y break-inside-avoid'
        >
            <div className='p-4'>
                <h3 className='text-lg'>{client}</h3>
                <small>{_id}</small>
            </div>
            {jobParts.map((jobPart, index) => {
                const {
                    partName,
                    material,
                    surface,
                    thickness,
                    orderedQty,
                    finishedQty,
                } = jobPart;

                let bgColor = '';

                if (finishedQty == orderedQty) {
                    bgColor = 'bg-green-200';
                } else if (orderedQty - finishedQty == orderedQty) {
                    bgColor = 'bg-red-200';
                } else bgColor = 'bg-yellow-200';

                return (
                    <div key={index} className='flex flex-col p-4'>
                        <div>
                            <div className='flex justify-between items-center'>
                                <p>{partName}</p>
                                <div
                                    className={`text-sm font-semibold px-4 py-1.5 ${bgColor} rounded`}
                                >
                                    {finishedQty}/{orderedQty}
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <span className='text-sm px-4 py-1.5 bg-gray-300 rounded'>
                                    {material}
                                </span>
                                {surface && (
                                    <span className='text-sm px-4 py-1.5 bg-gray-300 rounded'>
                                        {surface}
                                    </span>
                                )}
                                <span className='text-sm px-4 py-1.5 bg-gray-300 rounded'>
                                    {thickness}mm
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className='p-4'>
                <Link href={`jobs/${_id}`}>
                    <button className='btn'>Edit</button>
                </Link>
                <button
                    onClick={() => deleteJob(_id)}
                    className='rounded-full bg-red-400 px-4 py-2 text-white font-semibold '
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
