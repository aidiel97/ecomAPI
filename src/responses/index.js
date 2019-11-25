'user strict';

exports.success = (value, res) => {
  const data = {
    status: 'success',
    data: value,
    error: null,
  };
  res.status(200).json(data);
  res.end();
};

exports.error = (value, res) => {
  const data = {
    status: 'error',
    data: value,
    error: null,
  };
  res.status(403).json(data);
  res.end();
};
