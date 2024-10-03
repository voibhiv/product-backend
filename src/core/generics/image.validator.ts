import { InvalidImageFormatType } from '../exceptions/product/invalid-image-format-type.exception';

export const imageFileFilter = (req, file, callback) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid = allowedTypes.test(file.mimetype);

  if (isValid) {
    callback(null, true);
  } else {
    return callback(new InvalidImageFormatType(), false);
  }
};
