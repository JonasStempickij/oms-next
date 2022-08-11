import moment from 'moment';
import Link from 'next/link';
import ModalWindow from './ModalWindow';
import OpTag from './OpTag';

export const JobCard = ({ job, deleteJob }) => {
  const { client, jobParts, _id, updatedAt, downloadURL, weldOp, bendOp } = job;

  const formatedUpdated = moment(updatedAt).format('YY/MM/DD HH:mm');

  return (
    <div
      key={_id}
      className="w-full border-2 mb-5 bg-white border-zinc-500 rounded-xl divide-y break-inside-avoid"
    >
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-md font-medium">{client}</h3>
          <p className="text-xs">Updated: {formatedUpdated}</p>
        </div>
        <div className="flex gap-4">
          {weldOp && <OpTag name="WELD" />}
          {bendOp && <OpTag name="BEND" />}
        </div>
      </div>

      {jobParts.map((jobPart, index) => {
        const {
          partName,
          material,
          surface,
          pvc,
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
            <div className="flex mb-2 justify-between items-center font-medium">
              <p>{partName}</p>
              <div
                className={`text-sm font-semibold px-4 py-1.5 ${bgColor} rounded-lg whitespace-nowrap`}
              >
                {finishedQty} / {orderedQty}
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-sm px-4 py-1.5 font-medium bg-zinc-200 rounded-lg">
                {material}
              </span>
              {surface && (
                <span className="text-sm px-4 py-1.5 font-medium bg-gray-200 rounded-lg">
                  {surface}
                </span>
              )}
              {pvc && (
                <span className="text-sm px-4 py-1.5 font-medium bg-gray-200 rounded-lg">
                  +PVC
                </span>
              )}
              <span className="text-sm px-4 py-1.5 font-medium bg-gray-200 rounded-lg">
                {thickness}mm
              </span>
            </div>
          </div>
        );
      })}
      <div className="p-4 flex flex-row justify-between">
        <ModalWindow deleteJob={deleteJob} id={_id} />
        <div className="flex gap-2">
          <a
            href={downloadURL}
            className="rounded-full hover:bg-sky-100 text-sky-700 font-medium border border-sky-700 px-6 py-2 "
          >
            Files
          </a>
          <Link href={`jobs/${_id}`}>
            <button className="rounded-full font-medium border  px-6 py-2 bg-sky-600 hover:bg-sky-500  text-white ">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
