import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const jobObjectId = mongoose.Types.ObjectId(id);

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const jobs = await Job.findOne({
          _id: jobObjectId,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, jobs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { client, jobParts, fileName, downloadURL, weldOp, bendOp } =
          req.body;
        const job = await Job.updateOne(
          { _id: id },
          { client, jobParts, fileName, downloadURL, weldOp, bendOp }
        );
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        console.log(error);
        res.status(400).json({ sucess: false });
      }
      break;
    case 'DELETE':
      try {
        await Job.findOneAndDelete({ _id: id });
        res.status(200).json({ success: true, id });
      } catch (error) {
        console.log(error);
        res.status(400).json({ sucess: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
