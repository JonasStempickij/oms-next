import moment from 'moment';
import Link from 'next/link';
import { deleteFile } from '../lib/firebase';

export const JobCard = ({ job, deleteJob }) => {
  const { client, jobParts, _id, createdAt, updatedAt, downloadURL } = job;

  const formatedCreated = moment(createdAt).format('YY/MM/DD HH:mm');
  const formatedUpdated = moment(updatedAt).format('YY/MM/DD HH:mm');

  return (
    <div
      key={_id}
      className=" w-full border-2 mb-5 bg-white border-zinc-500 rounded-xl divide-y break-inside-avoid"
    >
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg">{client}</h3>
        <div className="flex flex-col justify-between p-4 text-xs">
          <div>Created: {formatedCreated}</div>
          <div>Updated: {formatedUpdated}</div>
          <div>ID: {_id}</div>
        </div>
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
          <div key={index} className="flex flex-col p-4">
            <div>
              <div className="flex  justify-between items-center font-medium">
                <p>{partName}</p>
                <div
                  className={`text-sm  font-semibold px-4 py-1.5 ${bgColor} rounded`}
                >
                  {finishedQty}/{orderedQty}
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-sm px-4 py-1.5 font-semibold bg-zinc-200 rounded">
                  {material}
                </span>
                {surface && (
                  <span className="text-sm px-4 py-1.5 font-semibold bg-gray-200 rounded">
                    {surface}
                  </span>
                )}
                <span className="text-sm px-4 py-1.5 font-semibold bg-gray-200 rounded">
                  {thickness}mm
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="p-4 flex flex-row justify-between">
        <button
          onClick={() => deleteJob(_id)}
          className="rounded-full bg-red-400 hover:bg-red-500 px-4 py-2 text-white font-medium "
        >
          Remove
        </button>
        <div className="flex gap-2">
          <a
            href={downloadURL}
            className="rounded-full hover:bg-indigo-100 text-indigo-700 font-medium border border-indigo-700 px-4 py-2 "
          >
            Files
          </a>
          <Link href={`jobs/${_id}`}>
            <button className="btn">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
