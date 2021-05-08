const fs = require("fs-extra");
const path = require("path");

const Image = require("../models/image");
const Customer = require("../models/customer");

function canUpload(customer, file) {
  const { capacityInByte, maxCapacityInByte } = customer;
  const { size } = file;
  if (capacityInByte + size > maxCapacityInByte) return false;
  return true;
}

exports.createImage = async (customer, file) => {
  const { mimetype, filename, size, path: filePath } = file;
  if (!canUpload(customer, file)) {
    const error = new Error("Cannot upload");
    error.name = "CANNOT_UPLOAD";
    throw error;
  }
  const ext = mimetype.split("/")[1];
  const fileName = `${filename}.${ext}`;
  const newPath = filePath.replace(filename, fileName);
  await fs.rename(filePath, newPath);
  const url = `${process.env.FILE_HOST}/${fileName}`;
  const image = await Image.create({
    fileName,
    customer: customer._id,
    url,
    size,
  });
  await Customer.findByIdAndUpdate(customer._id, {
    $inc: { capacityInByte: size },
  });
  return image;
};
